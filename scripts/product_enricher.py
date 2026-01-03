import requests
import json
import os
from urllib.parse import quote_plus
from typing import List, Dict, Optional
import time

class ProductEnricher:
    def __init__(self):
        self.base_fda_url = "https://api.fda.gov/drug/label.json"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        self.output_dir = "product_data"
        os.makedirs(self.output_dir, exist_ok=True)

    def search_fda_api(self, product_name: str) -> Optional[Dict]:
        """Search FDA API for product information"""
        try:
            search_term = quote_plus(f'"{product_name}"')
            params = {
                'search': f'openfda.substance_name:{search_term}',
                'limit': 1
            }
            response = requests.get(self.base_fda_url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            return data.get('results', [None])[0] if data.get('results') else None
        except Exception as e:
            print(f"Error searching FDA API for {product_name}: {str(e)}")
            return None

    def get_product_info(self, product_name: str) -> Dict:
        """Get product information including images"""
        print(f"Processing: {product_name}")
        
        # Basic product info
        product_id = product_name.lower().replace(' ', '-')
        
        # Get FDA data
        fda_data = self.search_fda_api(product_name)
        
        # Create product data structure
        product_data = {
            'id': product_id,
            'name': product_name,
            'description': f"{product_name} - Pharmaceutical grade product",
            'fullDescription': f"Detailed information about {product_name}. " + 
                             (f"FDA Info: {fda_data.get('purpose', [''])[0]}" if fda_data else ""),
            'category': "Pharmaceuticals/Hormone Therapy",
            'images': self.get_product_images(product_name),
            'specifications': {
                'features': [
                    f"Pharmaceutical grade {product_name}",
                    "For professional use only",
                    "Requires medical supervision"
                ],
                'storage': 'Store at controlled room temperature (20-25°C)'
            },
            'seo': {
                'title': f"{product_name} | Pharmaceutical Product",
                'metaDescription': f"Information about {product_name} - Pharmaceutical grade product",
                'keywords': [product_name.lower(), 'pharmaceutical', 'hormone therapy']
            }
        }
        
        return product_data

    def get_product_images(self, product_name: str) -> List[Dict]:
        """Get product images from reliable sources"""
        # Note: In a real implementation, you would:
        # 1. Use a licensed image API
        # 2. Or download from manufacturer websites with permission
        # 3. Or use a service like Google Custom Search API with proper licensing
        
        # For educational purposes only - these are placeholder image URLs
        return [
            {
                'url': f"https://via.placeholder.com/500x500?text={product_name.replace(' ', '+')}+1",
                'alt': f"{product_name} product image 1",
                'source': 'placeholder'
            },
            {
                'url': f"https://via.placeholder.com/500x500?text={product_name.replace(' ', '+')}+2",
                'alt': f"{product_name} product image 2",
                'source': 'placeholder'
            }
        ]

    def process_products(self, product_names: List[str]):
        """Process a list of product names"""
        all_products = []
        
        for name in product_names:
            product_data = self.get_product_info(name.strip())
            if product_data:
                all_products.append(product_data)
                # Save individual product file
                with open(f"{self.output_dir}/{product_data['id']}.json", 'w') as f:
                    json.dump(product_data, f, indent=2)
                print(f"Saved data for: {name}")
            
            # Be nice to the API
            time.sleep(1)
        
        # Save combined data
        with open(f"{self.output_dir}/all_products.json", 'w') as f:
            json.dump(all_products, f, indent=2)
        
        return all_products

if __name__ == "__main__":
    # Example usage
    product_list = [
        "Testosterone Enanthate",
        "Testosterone Propionate",
        "Testosterone Cypionate",
        "Testosterone Phenylpropionate",
        "Testosterone Decanoate"
    ]
    
    enricher = ProductEnricher()
    results = enricher.process_products(product_list)
    print(f"\nProcessed {len(results)} products. Data saved to '{enricher.output_dir}/' directory.")
