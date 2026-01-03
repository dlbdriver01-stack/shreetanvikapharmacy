import json
import re

def parse_pricing(file_path):
    prices_db = {}
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    for line in lines:
        if not line.strip().startswith('|'):
            continue
        parts = [p.strip() for p in line.split('|')]
        # Expected parts: ['', Name, Price1, Price2, Price3, Price4, Price5, '']
        if len(parts) < 7:
            continue
        
        name = parts[1]
        if 'Name' in name or '---' in name:
            continue
            
        # Clean prices
        prices = []
        for p in parts[2:7]:
            # Remove $, commas, and extra text like "/1g"
            p_clean = re.sub(r'[^\d.]', '', p.split('/')[0])
            try:
                if p_clean:
                    prices.append(int(float(p_clean)))
                else:
                    prices.append(0)
            except ValueError:
                prices.append(0)
        
        if name and any(prices):
            prices_db[name] = prices
            
    return prices_db

def parse_images(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Store all images for a given query/product
    images_db = []
    for item in data:
        images_db.append({
            'query': item.get('query', '').lower(),
            'url': item.get('image_info', {}).get('url', ''),
            'score': item.get('llm_score', {}).get('overall_score', 0),
            'caption': item.get('llm_score', {}).get('caption', '')
        })
    return images_db

def find_images_for_product(product_name, images_db):
    name_lower = product_name.lower()
    matches = []
    
    # Heuristics for matching
    # 1. Exact containment
    for img in images_db:
        # Simplify query: remove "pharmaceutical", "injection", "vial" for better matching
        clean_query = img['query'].replace('pharmaceutical', '').replace('injection', '').replace('vial', '').replace('product', '')
        
        # Check if product name parts are in query
        # e.g. "Testosterone Enanthate" should match query "Testosterone Enanthate injection"
        if name_lower in img['query']:
             matches.append(img)
    
    # Sort by score
    matches.sort(key=lambda x: x['score'], reverse=True)
    return matches

def determine_category(name):
    name_lower = name.lower()
    if 'trenbolone' in name_lower:
        return 'trenbolone' # Custom category if needed, or map to existing
    elif 'testosterone' in name_lower:
        return 'testosterone'
    elif 'nandrolone' in name_lower:
        return 'nandrolone'
    elif 'boldenone' in name_lower:
        return 'boldenone'
    elif 'drostanolone' in name_lower or 'masteron' in name_lower:
        return 'drostanolone'
    elif 'primobolan' in name_lower or 'methenolone' in name_lower:
        return 'primobolan'
    elif 'anavar' in name_lower or 'oxandrolone' in name_lower:
        return 'oral'
    elif 'dianabol' in name_lower or 'methandrostenolone' in name_lower:
        return 'oral'
    elif 'winstrol' in name_lower or 'stanozolol' in name_lower:
        return 'oral'
    elif 'anadrol' in name_lower or 'oxymetholone' in name_lower:
        return 'oral'
    return 'other'

def determine_ester(name):
    name_lower = name.lower()
    if 'blend' in name_lower or 'sustanon' in name_lower or 'mix' in name_lower or '400' in name_lower:
        return 'blend'
    if 'enanthate' in name_lower or 'cypionate' in name_lower or 'decanoate' in name_lower or 'undecylenate' in name_lower:
        return 'long-ester'
    if 'propionate' in name_lower or 'acetate' in name_lower or 'phenylpropionate' in name_lower:
        return 'short-ester'
    return 'other'

def main():
    pricing_path = r'c:\Dr.Dgb\data pipeline\Shree Tanvika Enterprise.txt'
    images_path = r'c:\Dr.Dgb\data pipeline\product-list-shree-enterprise.json'
    
    prices_db = parse_pricing(pricing_path)
    images_db = parse_images(images_path)
    
def clean_product_name(query):
    # Remove common 'noise' words to extract the core product name
    # We want to be careful not to remove parts of the name (like 'tablets' if it's part of the name, though usually it's a form)
    # But based on the file, the query usually starts with the name.
    
    # List of words to remove (case insensitive)
    noise_words = [
        "pharmaceutical", "injection", "injectable", "vial", "product", "photo", "image", 
        "realistic", "box", "ampoule", "tablet", "tablets", "pill", "pills", "capsule", "capsules", 
        "blister", "pack", "bottle", "generic", "blue", "yellow", "red", "green", "white", 
        "10mg", "20mg", "50mg", "100mg", "200mg", "250mg", "300mg", "400mg", "500mg",
        "10ml", "ml", "mg", "/", "-"
    ]
    
    words = query.lower().split()
    cleaned_words = [w for w in words if w not in noise_words]
    
    # Capitalize for display
    # Special handling for known casing could be added here
    capitalized = [w.capitalize() for w in cleaned_words]
    return " ".join(capitalized)

def normalize_price_key(name):
    # Simplify name for fuzzy matching in price dict
    return re.sub(r'[^a-zA-Z0-9]', '', name.lower())

def main():
    pricing_path = r'c:\Dr.Dgb\data pipeline\Shree Tanvika Enterprise.txt'
    images_path = r'c:\Dr.Dgb\data pipeline\product-list-shree-enterprise.json'
    
    prices_db = parse_pricing(pricing_path)
    # Create a normalized look-up map for pricing
    prices_lookup = {normalize_price_key(k): v for k, v in prices_db.items()}

    with open(images_path, 'r', encoding='utf-8') as f:
        json_data = json.load(f)
    
    # Group by cleaned product name
    grouped_products = {}
    
    for item in json_data:
        query = item.get('query', '')
        # Basic cleaning first
        clean_name = clean_product_name(query)
        
        # refinement: Many queries are slightly different but refer to same product
        # e.g. "Testosterone Cypionate..." vs "Testosterone Cypionate injection..."
        # We might need a slightly smarter grouping or just trust the clean name.
        # Given the JSON structure shown in previous turn, queries seem consistent for batches.
        
        if clean_name not in grouped_products:
            grouped_products[clean_name] = []
        
        grouped_products[clean_name].append({
            'url': item.get('image_info', {}).get('url', ''),
            'score': item.get('llm_score', {}).get('overall_score', 0),
            'caption': item.get('llm_score', {}).get('caption', '')
        })

    compounds = []
    
    for product_name, images_list in grouped_products.items():
        # Sort images by score
        images_list.sort(key=lambda x: x['score'], reverse=True)
        
        # Deduplicate URLs
        seen_urls = set()
        unique_gallery = []
        for img in images_list:
            if img['url'] not in seen_urls:
                unique_gallery.append(img['url'])
                seen_urls.add(img['url'])
        
        main_image = unique_gallery[0] if unique_gallery else "https://via.placeholder.com/400x400?text=No+Image"
        gallery = unique_gallery[:4]
        
        # Find Price
        # Try exact match first, then fuzzy
        price = [0, 0, 0, 0, 0] # Default
        
        # Attempt lookup
        norm_name = normalize_price_key(product_name)
        
        # Double check against keys
        match_found = False
        
        # 1. Exact normalized match
        if norm_name in prices_lookup:
            price = prices_lookup[norm_name]
            match_found = True
        
        # 2. Substring match (e.g. "Cialis" in "Tadalafil Cialis")
        if not match_found:
            for db_key_norm, db_prices in prices_lookup.items():
                if db_key_norm in norm_name or norm_name in db_key_norm:
                     price = db_prices
                     match_found = True
                     # Prefer the one that contains the other if possible, or break? 
                     # "Testosterone Propionate" (db) vs "Testosterone Propionate" (img) matches.
                     # "Tadalafil Cialis" (img) vs "Tadalafil Cialis" (db)
                     break
        
        # Manual overrides/patches if auto-match fails for specific products seen in logs
        if not match_found:
             # Try splitting composed names
             # e.g. "Winstrol Stanozolol" -> check "Winstrol" or "Stanozolol"
             tokens = product_name.split()
             for token in tokens:
                 token_norm = normalize_price_key(token)
                 if len(token_norm) > 3: # Avoid matching short junk
                     for db_key_norm, db_prices in prices_lookup.items():
                         if token_norm in db_key_norm:
                             price = db_prices
                             match_found = True
                             break
                 if match_found: break

        id_str = product_name.lower().replace(' ', '-').replace('(', '').replace(')', '').replace('/', '-')
        
        compound = {
            "id": id_str,
            "name": product_name,
            "category": determine_category(product_name),
            "esterType": determine_ester(product_name),
            "halfLife": "Variable", 
            "images": gallery,
            "mainImage": main_image,
            "description": f"Pharmaceutical Grade {product_name}. High purity formulation suitable for professional use.",
            "price": price,
            "inStock": True,
            "features": ["GMP Certified", "Batch Tested", "High Purity"]
        }
        compounds.append(compound)
        
    # Output JS
        
    # Output JS
    with open(r'c:\Dr.Dgb\data pipeline\new_products.json', 'w', encoding='utf-8') as f:
        json.dump(compounds, f, indent=2)
    print("Successfully wrote new_products.json")

if __name__ == "__main__":
    main()
