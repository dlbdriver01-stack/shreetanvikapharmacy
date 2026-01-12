// Product detail page functionality
let currentProduct = null;
let currentImageIndex = 0;

// Embedded product data to avoid CORS issues
const embeddedProductData = [
  {
    "id": "testosterone-cypionate",
    "name": "Testosterone Cypionate",
    "category": "testosterone",
    "esterType": "long-ester",
    "halfLife": "Variable",
    "images": [
      "https://eugiaus.com/wp-content/uploads/Testosterone-Cypionate-200mg-1mL-web.jpg",
      "https://www.mcguff.com/content/images/thumbs/0018140_testosterone-cypionate-injection-200-mgml-multiple-dose-vial-10-ml-each.jpeg",
      "https://m.media-amazon.com/images/I/41gVpMM7GDL.jpg",
      "https://eugiaus.com/wp-content/uploads/Testosterone-Cypionate-Injection-group-web.jpg"
    ],
    "mainImage": "https://eugiaus.com/wp-content/uploads/Testosterone-Cypionate-200mg-1mL-web.jpg",
    "description": "Pharmaceutical Grade Testosterone Cypionate. High purity formulation suitable for professional use.",
    "price": [
      40,
      80,
      130,
      380,
      680
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "testosterone-phenylpropionate",
    "name": "Testosterone Phenylpropionate",
    "category": "testosterone",
    "esterType": "short-ester",
    "halfLife": "Variable",
    "images": [
      "https://www.pharmacyplanet.com/media/catalog/product/cache/d3fca980f4a76b932c990647f107d37f/s/u/sustanon_250_mg.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/6/64/Sustanon.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Sustanon.JPG/1200px-Sustanon.JPG"
    ],
    "mainImage": "https://www.pharmacyplanet.com/media/catalog/product/cache/d3fca980f4a76b932c990647f107d37f/s/u/sustanon_250_mg.jpg",
    "description": "Pharmaceutical Grade Testosterone Phenylpropionate. High purity formulation suitable for professional use.",
    "price": [
      40,
      80,
      130,
      370,
      650
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "testosterone-propionate",
    "name": "Testosterone Propionate",
    "category": "testosterone",
    "esterType": "short-ester",
    "halfLife": "Variable",
    "images": [
      "https://www.alpha-pharma.com/images/testorapid_new_big.jpg",
      "https://clearwateraesthetics.com/wp-content/uploads/2023/08/Image14.png",
      "https://montagelabs.com/product-images/Testosterone-Propionate-Inject-1717993349.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2024/3/397044232/RA/EB/FF/198019903/test-propionate-100mg-injection.png"
    ],
    "mainImage": "https://www.alpha-pharma.com/images/testorapid_new_big.jpg",
    "description": "Pharmaceutical Grade Testosterone Propionate. High purity formulation suitable for professional use.",
    "price": [
      30,
      70,
      120,
      350,
      600
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "testosterone-decanoate",
    "name": "Testosterone Decanoate",
    "category": "testosterone",
    "esterType": "long-ester",
    "halfLife": "Variable",
    "images": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Sustanon.JPG/1200px-Sustanon.JPG"
    ],
    "mainImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Sustanon.JPG/1200px-Sustanon.JPG",
    "description": "Pharmaceutical Grade Testosterone Decanoate. High purity formulation suitable for professional use.",
    "price": [
      40,
      80,
      130,
      370,
      650
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "trenbolone-acetate",
    "name": "Trenbolone Acetate",
    "category": "trenbolone",
    "esterType": "short-ester",
    "halfLife": "Variable",
    "images": [
      "https://cpimg.tistatic.com/8906357/b/1/tren-bolone-acetate-injection-ironhorse-pharma.jpg",
      "https://www.shutterstock.com/image-illustration/testosterone-trenbolone-nandrolone-steroid-vials-260nw-2479465833.jpg",
      "https://cpimg.tistatic.com/10300990/b/4/Trenabol-Trenbolone-Acetate-Injection-10-Ampoules-Of-1-M-Treatment-Muscle-Building.jpg",
      "https://cpimg.tistatic.com/02911601/b/4/Trenbolone-Acetate-Tren-75-75mg-ml-10ml-vial-.jpg"
    ],
    "mainImage": "https://cpimg.tistatic.com/8906357/b/1/tren-bolone-acetate-injection-ironhorse-pharma.jpg",
    "description": "Pharmaceutical Grade Trenbolone Acetate. High purity formulation suitable for professional use.",
    "price": [
      110,
      300,
      550,
      2050,
      4000
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "sustanon-250-testosterone-blend",
    "name": "Sustanon 250 Testosterone Blend",
    "category": "testosterone",
    "esterType": "blend",
    "halfLife": "Variable",
    "images": [
      "https://www.pharmacyplanet.com/media/catalog/product/cache/d3fca980f4a76b932c990647f107d37f/s/u/sustanon_250_mg.jpg",
      "https://laanabolic.com/images/productPic/productB-inject-Sustanon250ml10ml.jpg",
      "https://medecify.com/storage/2025/05/IMG-152-768x1024.jpeg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Sustanon.JPG/1200px-Sustanon.JPG"
    ],
    "mainImage": "https://www.pharmacyplanet.com/media/catalog/product/cache/d3fca980f4a76b932c990647f107d37f/s/u/sustanon_250_mg.jpg",
    "description": "Pharmaceutical Grade Sustanon 250 Testosterone Blend. High purity formulation suitable for professional use.",
    "price": [
      40,
      80,
      140,
      450,
      750
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "nandrolone-decanoate",
    "name": "Nandrolone Decanoate",
    "category": "nandrolone",
    "esterType": "long-ester",
    "halfLife": "Variable",
    "images": [
      "https://www.empowerpharmacy.com/wp-content/uploads/2025/07/2025-empower-pharmacy-nandrolone-decanoate-injection-200mgml-5ml-NS-294x490-1.jpg",
      "https://www.empowerpharmacy.com/wp-content/uploads/2024/02/empower-pharmacy-nandrolone-decanoate-injection-200mgml-5ml-294x490-1.jpg",
      "https://recovered.sfo3.cdn.digitaloceanspaces.com/media/16588/conversions/Nandrolone-Decanoate-guide-detail.jpg?v=1747295181",
      "https://www.shutterstock.com/shutterstock/photos/1088902040/display_1500/stock-photo--d-render-of-nandrolone-decanoate-vial-over-white-background-anabolic-steroids-concept-1088902040.jpg"
    ],
    "mainImage": "https://www.empowerpharmacy.com/wp-content/uploads/2025/07/2025-empower-pharmacy-nandrolone-decanoate-injection-200mgml-5ml-NS-294x490-1.jpg",
    "description": "Pharmaceutical Grade Nandrolone Decanoate. High purity formulation suitable for professional use.",
    "price": [
      50,
      130,
      230,
      950,
      1750
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "testosterone-enanthate",
    "name": "Testosterone Enanthate",
    "category": "testosterone",
    "esterType": "long-ester",
    "halfLife": "Variable",
    "images": [
      "https://www.merlin-medical.co.uk/medias/1200Wx1200H-J178-Primary?context=bWFzdGVyfGltYWdlc3w0MzAzM3xpbWFnZS9qcGVnfGFHSmtMMmhrTVM4eE1ERTVORE0zTmpjeU1EUXhOQzh4TWpBd1YzZ3hNakF3U0Y5S01UYzRYMUJ5YVcxaGNua3xmNWFkN2JiN2JkZTRmOWQ4MmQ5ZTVhZTIxYmFlOGY0NDI0NTU2ZTRkMGMxMDUyZTRhNjRlODYxZjIwMzc0MDgy"
    ],
    "mainImage": "https://www.merlin-medical.co.uk/medias/1200Wx1200H-J178-Primary?context=bWFzdGVyfGltYWdlc3w0MzAzM3xpbWFnZS9qcGVnfGFHSmtMMmhrTVM4eE1ERTVORE0zTmpjeU1EUXhOQzh4TWpBd1YzZ3hNakF3U0Y5S01UYzRYMUJ5YVcxaGNua3xmNWFkN2JiN2JkZTRmOWQ4MmQ5ZTVhZTIxYmFlOGY0NDI0NTU2ZTRkMGMxMDUyZTRhNjRlODYxZjIwMzc0MDgy",
    "description": "Pharmaceutical Grade Testosterone Enanthate. High purity formulation suitable for professional use.",
    "price": [
      40,
      80,
      130,
      370,
      650
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "testosterone-propionate-100mg-ml",
    "name": "Testosterone Propionate 100mg/ml",
    "category": "testosterone",
    "esterType": "short-ester",
    "halfLife": "Variable",
    "images": [
      "https://www.alpha-pharma.com/images/testorapid_new_big.jpg",
      "https://clearwateraesthetics.com/wp-content/uploads/2023/08/Image14.png",
      "https://montagelabs.com/product-images/Testosterone-Propionate-Inject-1717993349.jpg",
      "https://www.empowerpharmacy.com/wp-content/uploads/2025/07/2025-empower-pharmacy-testosterone-cypionate-testosterone-propionate-injection-160-40mgml-5ml-294x490-1.jpg"
    ],
    "mainImage": "https://www.alpha-pharma.com/images/testorapid_new_big.jpg",
    "description": "Pharmaceutical Grade Testosterone Propionate 100mg/ml. High purity formulation suitable for professional use.",
    "price": [
      30,
      70,
      120,
      350,
      600
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "drostanolone-masteron",
    "name": "Drostanolone Masteron",
    "category": "drostanolone",
    "esterType": "other",
    "halfLife": "Variable",
    "images": [
      "https://cpimg.tistatic.com/06644610/b/4/Drostanolonene-Propionate-Injection.jpg",
      "https://cpimg.tistatic.com/5988690/b/1/100mg-masteron-drostanolone-propionate-injection.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2025/6/515920128/CR/MR/DH/205816124/masteron-drostanolone-propionate-100mg-10-am-500x500.jpeg",
      "https://cpimg.tistatic.com/9353216/b/4/100-mg-masteron-drostanolone-propionate-injection.jpg"
    ],
    "mainImage": "https://cpimg.tistatic.com/06644610/b/4/Drostanolonene-Propionate-Injection.jpg",
    "description": "Pharmaceutical Grade Drostanolone Masteron. High purity formulation suitable for professional use.",
    "price": [
      40,
      100,
      170,
      650,
      1250
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "boldenone-equipoise-veterinary",
    "name": "Boldenone Equipoise Veterinary",
    "category": "boldenone",
    "esterType": "other",
    "halfLife": "Variable",
    "images": [
      "https://cpimg.tistatic.com/05988689/b/4/250MG-Boldenone-Undecylenate-Injection.jpg",
      "https://cpimg.tistatic.com/10699709/b/4/200mg-Equipoise-Undecylenate-Injection..jpg",
      "https://gamecock-apparel-and-supplies.com/wp-content/uploads/2025/04/Equipose-byPfizer-50-ml.jpg",
      "https://cpimg.tistatic.com/10699713/b/4/400mg-Equipoise-Undecylenate-Injection..jpg"
    ],
    "mainImage": "https://cpimg.tistatic.com/05988689/b/4/250MG-Boldenone-Undecylenate-Injection.jpg",
    "description": "Pharmaceutical Grade Boldenone Equipoise Veterinary. High purity formulation suitable for professional use.",
    "price": [
      40,
      100,
      160,
      600,
      1050
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "stanozolol-winstrol-or",
    "name": "Stanozolol Winstrol Or",
    "category": "oral",
    "esterType": "other",
    "halfLife": "Variable",
    "images": [
      "https://cpimg.tistatic.com/7118546/b/5/stanozolol-injection.jpg",
      "https://www.biosynth.com/storage/BottleImages/FS/15/BIOSYNTH_FS156771.png",
      "https://www.cfspharmacy.pharmacy/media/catalog/product/cache/10f519365b01716ddb90abc57de5a837/s/t/stanozolol-capsules.jpg"
    ],
    "mainImage": "https://cpimg.tistatic.com/7118546/b/5/stanozolol-injection.jpg",
    "description": "Pharmaceutical Grade Stanozolol Winstrol Or. High purity formulation suitable for professional use.",
    "price": [
      40,
      110,
      230,
      800,
      1500
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "mk-2866-ostarine-sarm-research-chemical",
    "name": "Mk-2866 Ostarine Sarm Research Chemical",
    "category": "other",
    "esterType": "other",
    "halfLife": "Variable",
    "images": [
      "https://receptorchem.co.uk/javascripts4/2015/11/OSTA-B.jpg",
      "https://umbrellalabs.is/wp-content/uploads/mk-2866-ostarine-25mg-sarm-research-gels-pouch.jpg",
      "https://ars.els-cdn.com/content/image/1-s2.0-S2352007818303275-gr2.jpg",
      "https://sfcc.predatornutrition.com/on/demandware.static/-/Sites-PredatorPWA-Library/default/dw3be22ef8/ART_mk2866_side.jpg"
    ],
    "mainImage": "https://receptorchem.co.uk/javascripts4/2015/11/OSTA-B.jpg",
    "description": "Pharmaceutical Grade Mk-2866 Ostarine Sarm Research Chemical. High purity formulation suitable for professional use.",
    "price": [
      70,
      170,
      300,
      1200,
      2150
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "oxandrolone-anavar",
    "name": "Oxandrolone Anavar",
    "category": "oral",
    "esterType": "other",
    "halfLife": "Variable",
    "images": [
      "https://img1.exportersindia.com/product_images/bc-full/2024/2/3684490/pro-anavar-1708416814_7301993_2026773.jpg",
      "https://www.novarecoverycenter.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-10-2025-at-07_33_16-PM.png",
      "https://pbs.twimg.com/media/ETRR0xGWsAEmznC.jpg"
    ],
    "mainImage": "https://img1.exportersindia.com/product_images/bc-full/2024/2/3684490/pro-anavar-1708416814_7301993_2026773.jpg",
    "description": "Pharmaceutical Grade Oxandrolone Anavar. High purity formulation suitable for professional use.",
    "price": [
      100,
      250,
      500,
      1900,
      3600
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "boldenone-undecylenate-equipoise",
    "name": "Boldenone Undecylenate Equipoise",
    "category": "boldenone",
    "esterType": "long-ester",
    "halfLife": "Variable",
    "images": [
      "https://cpimg.tistatic.com/05988689/b/4/250MG-Boldenone-Undecylenate-Injection.jpg",
      "https://gamecock-apparel-and-supplies.com/wp-content/uploads/2025/04/Equipose-byPfizer-50-ml.jpg",
      "https://cpimg.tistatic.com/10699709/b/4/200mg-Equipoise-Undecylenate-Injection..jpg",
      "https://cpimg.tistatic.com/10699713/b/4/400mg-Equipoise-Undecylenate-Injection..jpg"
    ],
    "mainImage": "https://cpimg.tistatic.com/05988689/b/4/250MG-Boldenone-Undecylenate-Injection.jpg",
    "description": "Pharmaceutical Grade Boldenone Undecylenate Equipoise. High purity formulation suitable for professional use.",
    "price": [
      40,
      100,
      160,
      600,
      1050
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "sustanon-250",
    "name": "Sustanon 250",
    "category": "other",
    "esterType": "blend",
    "halfLife": "Variable",
    "images": [
      "https://www.pharmacyplanet.com/media/catalog/product/cache/d3fca980f4a76b932c990647f107d37f/s/u/sustanon_250_mg.jpg",
      "https://www.vinmec.com/static/uploads/20220630_090848_664103_Sustanon_250_max_1800x1800_jpg_a9dbc10e2e.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Sustanon.JPG/1200px-Sustanon.JPG"
    ],
    "mainImage": "https://www.pharmacyplanet.com/media/catalog/product/cache/d3fca980f4a76b932c990647f107d37f/s/u/sustanon_250_mg.jpg",
    "description": "Pharmaceutical Grade Sustanon 250. High purity formulation suitable for professional use.",
    "price": [
      40,
      80,
      140,
      450,
      750
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "testosterone-enanthate-250mg-ml",
    "name": "Testosterone Enanthate 250mg/ml",
    "category": "testosterone",
    "esterType": "long-ester",
    "halfLife": "Variable",
    "images": [
      "https://www.henryschein.com/Products/1437316_US_Front_01_600x600.jpg",
      "https://www.empowerpharmacy.com/wp-content/uploads/2025/07/2025-empower-pharmacy-testosterone-enanthate-injection-200mgml-5ml-294x490-1.jpg",
      "https://www.empowerpharmacy.com/wp-content/uploads/2025/07/empower-pharmacy-commercial-testosterone-enanthate-injection-200mgml-294x490-1.jpg"
    ],
    "mainImage": "https://www.henryschein.com/Products/1437316_US_Front_01_600x600.jpg",
    "description": "Pharmaceutical Grade Testosterone Enanthate 250mg/ml. High purity formulation suitable for professional use.",
    "price": [
      40,
      80,
      130,
      370,
      650
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "dapoxetine-priligy",
    "name": "Dapoxetine Priligy",
    "category": "other",
    "esterType": "other",
    "halfLife": "Variable",
    "images": [
      "https://www.doctorfox.co.uk/imgs-products/sd/16x9/priligy.jpg",
      "https://www.privatedoc.com/img/0037_priligy.jpg",
      "https://www.somersetmedicalcenter.com/wp-content/uploads/2025/04/dapoxetine-priligy.jpg",
      "https://api.evaro.com/wp-content/uploads/2024/08/Priligy-INSIDE.png"
    ],
    "mainImage": "https://www.doctorfox.co.uk/imgs-products/sd/16x9/priligy.jpg",
    "description": "Pharmaceutical Grade Dapoxetine Priligy. High purity formulation suitable for professional use.",
    "price": [
      40,
      130,
      250,
      850,
      1650
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "tamoxifen-nolvadex",
    "name": "Tamoxifen Nolvadex",
    "category": "other",
    "esterType": "other",
    "halfLife": "Variable",
    "images": [
      "https://www.empowerpharmacy.com/wp-content/uploads/2025/07/empower-pharmacy-commercial-tamoxifen-citrate-tablets-10mg-new-294x490-1.jpg",
      "https://lotusinternational.com/wp-content/uploads/2020/11/nolvadex.jpg"
    ],
    "mainImage": "https://www.empowerpharmacy.com/wp-content/uploads/2025/07/empower-pharmacy-commercial-tamoxifen-citrate-tablets-10mg-new-294x490-1.jpg",
    "description": "Pharmaceutical Grade Tamoxifen Nolvadex. High purity formulation suitable for professional use.",
    "price": [
      40,
      90,
      140,
      600,
      1050
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "winstrol-stanozolol",
    "name": "Winstrol Stanozolol",
    "category": "oral",
    "esterType": "other",
    "halfLife": "Variable",
    "images": [
      "https://cpimg.tistatic.com/09353593/b/4/Winstrol-Stanozolol-Tablets-10-Mg.jpg",
      "https://www.cfspharmacy.pharmacy/media/catalog/product/cache/10f519365b01716ddb90abc57de5a837/s/t/stanozolol-capsules.jpg",
      "https://cpimg.tistatic.com/11625637/b/4/Stanozolol-Tablets-10-Mg..webp"
    ],
    "mainImage": "https://cpimg.tistatic.com/09353593/b/4/Winstrol-Stanozolol-Tablets-10-Mg.jpg",
    "description": "Pharmaceutical Grade Winstrol Stanozolol. High purity formulation suitable for professional use.",
    "price": [
      40,
      110,
      230,
      800,
      1500
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "dianabol-methandrostenolone",
    "name": "Dianabol Methandrostenolone",
    "category": "oral",
    "esterType": "other",
    "halfLife": "Variable",
    "images": [
      "https://5.imimg.com/data5/GLADMIN/Default/2022/9/OT/HG/XU/28031/methandienone-tablets-500x500.jpg",
      "https://c8.alamy.com/zooms/9/5f3f89b8cb364cdd92e5c89d07a76446/drx15j.jpg",
      "https://tiimg.tistatic.com/fp/1/008/534/dbol-10mg-563.jpg",
      "https://cpimg.tistatic.com/08662062/b/4/Dianabol-Methandienone-Tablet.jpg"
    ],
    "mainImage": "https://5.imimg.com/data5/GLADMIN/Default/2022/9/OT/HG/XU/28031/methandienone-tablets-500x500.jpg",
    "description": "Pharmaceutical Grade Dianabol Methandrostenolone. High purity formulation suitable for professional use.",
    "price": [
      40,
      110,
      230,
      800,
      1500
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "tadalafil-cialis",
    "name": "Tadalafil Cialis",
    "category": "other",
    "esterType": "other",
    "halfLife": "Variable",
    "images": [
      "https://www.peakpharmacy.co.uk/uploads/images/products/large/peakpharmacy-cialis-tablets-branded-tadalafil-1691485875Cialis-Tablets-Branded-Tadalafil-.jpg",
      "http://egyptiandrugstore.com/image/cache/data/manar5/cialis-500x500.png",
      "https://www.empowerpharmacy.com/wp-content/uploads/2025/07/empower-pharmacy-commercial-cialis-tadalafil-tablets-5mg-294x490-1.jpg"
    ],
    "mainImage": "https://www.peakpharmacy.co.uk/uploads/images/products/large/peakpharmacy-cialis-tablets-branded-tadalafil-1691485875Cialis-Tablets-Branded-Tadalafil-.jpg",
    "description": "Pharmaceutical Grade Tadalafil Cialis. High purity formulation suitable for professional use.",
    "price": [
      40,
      90,
      140,
      450,
      750
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  },
  {
    "id": "sildenafil-viagra",
    "name": "Sildenafil Viagra",
    "category": "other",
    "esterType": "other",
    "halfLife": "Variable",
    "images": [
      "https://cdn.theatlantic.com/thumbor/8lOAc4iKlA5mREfzI73Bke7U33w=/137x0:1985x1386/1200x900/media/img/mt/2018/03/AP_120302046624/original.jpg",
      "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:200,cw:800,ch:800,q:80,w:800/q8f6n3t6VLWcth6MQEyiKJ.jpg",
      "https://xyonhealth.com/cdn/shop/files/sildenafil.jpg?v=1744414254&width=953"
    ],
    "mainImage": "https://cdn.theatlantic.com/thumbor/8lOAc4iKlA5mREfzI73Bke7U33w=/137x0:1985x1386/1200x900/media/img/mt/2018/03/AP_120302046624/original.jpg",
    "description": "Pharmaceutical Grade Sildenafil Viagra. High purity formulation suitable for professional use.",
    "price": [
      40,
      50,
      100,
      250,
      400
    ],
    "inStock": true,
    "features": [
      "GMP Certified",
      "Batch Tested",
      "High Purity"
    ]
  }
];

// Initialize the product detail page
document.addEventListener('DOMContentLoaded', function () {
  loadProductDetails();
  setupEventListeners();
});

// Load product details based on URL parameter
function loadProductDetails() {
  try {
    const urlParams = new URLSearchParams(globalThis.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
      // SEO FIX: If no product ID, redirect to catalog instead of soft 404
      window.location.replace("index.html#compounds");
      return;
    }

    // Use embedded data
    const products = embeddedProductData;
    currentProduct = products.find(p => p.id === productId);

    if (!currentProduct) {
      showError('Product not found');
      return;
    }

    renderProductDetails(currentProduct);
    loadRelatedProducts(products, currentProduct);

    // Inject Retargeting Cookie
    if (window.Retargeting) {
      window.Retargeting.trackProductView(currentProduct);
    }

  } catch (error) {
    console.error('Error loading product details:', error);
    showError('Failed to load product details');
  }
}

// Render product details on the page
function renderProductDetails(product) {
  // Update SEO metadata dynamically
  updateSEOMetadata(product);

  // Update basic product info
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productCategory').textContent = product.category || 'Pharmaceutical Compound';
  document.getElementById('breadcrumbProduct').textContent = product.name;
  document.getElementById('productDescription').textContent = product.description;

  // Update main image
  const mainImage = document.getElementById('mainImage');
  if (mainImage) {
    mainImage.src = product.mainImage;
    mainImage.alt = `${product.name} - ${product.description}`;
  }

  // Render thumbnails
  renderThumbnails(product.images);

  // Update pricing
  updatePricing(product.price);

  // Update specifications
  updateSpecifications(product);
}

// Update SEO metadata dynamically based on product
function updateSEOMetadata(product) {
  const productName = product.name;
  const productDescription = product.description;
  const productPrice = product.price ? product.price[0] : 0;

  // Update page title
  document.title = `Buy ${productName} Online - Shree Tanvika Entreprise | ${productPrice} USD`;
  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = `Buy ${productName} Online - Shree Tanvika Entreprise | ${productPrice} USD`;

  // Update meta description
  const description = `Premium pharmaceutical grade ${productName.toLowerCase()} for sale at Shree Tanvika Entreprise. ${productDescription}. Competitive pricing at ${productPrice} USD with fast worldwide shipping.`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', description);

  // Update canonical URL
  const canonicalUrl = `https://shreetanvikaenterprise.com/product.html?id=${product.id}`;
  const linkCanonical = document.querySelector('link[rel="canonical"]');
  if (linkCanonical) linkCanonical.setAttribute('href', canonicalUrl);
}

// Update structured data for the product
function updateStructuredData(product) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Shree Tanvika Entreprise"
    },
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": product.price ? product.price[0].toString() : "0",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Shree Tanvika Entreprise"
      }
    },
    "image": product.mainImage
  };

  const schemaScript = document.getElementById('productSchema');
  if (schemaScript) schemaScript.textContent = JSON.stringify(structuredData, null, 2);
}

// Render thumbnail images
function renderThumbnails(images) {
  const thumbnailGrid = document.getElementById('thumbnailGrid');
  if (!thumbnailGrid) return;

  thumbnailGrid.innerHTML = '';

  images.forEach((image, index) => {
    const thumbnail = document.createElement('div');
    thumbnail.className = `thumbnail border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer ${index === 0 ? 'active' : ''}`;
    thumbnail.onclick = () => selectImage(index);

    thumbnail.innerHTML = `
            <img src="${image}" alt="Thumbnail" class="w-full h-20 object-cover">
        `;

    thumbnailGrid.appendChild(thumbnail);
  });
}

// Select and display main image
function selectImage(index) {
  if (!currentProduct || index >= currentProduct.images.length) return;

  currentImageIndex = index;
  const mainImage = document.getElementById('mainImage');
  if (mainImage) {
    mainImage.src = currentProduct.images[index];
  }

  // Update thumbnail active state
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach((thumb, i) => {
    if (i === index) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

// Update pricing information
function updatePricing(prices) {
  if (!prices) return;

  const setPrice = (id, price) => {
    const el = document.getElementById(id);
    if (el) el.textContent = `$${price}`;
  };

  setPrice('mainPrice', prices[0]);
  // Map array to potential other IDs if they exist
  setPrice('price5', prices[1]);
  setPrice('price10', prices[2]);
  setPrice('price25', prices[3]);
  setPrice('price50', prices[4]);
}

// Update product specifications
function updateSpecifications(product) {
  const el = document.getElementById('activeIngredient');
  if (el) el.textContent = product.name;

  const strengthEl = document.getElementById('strength');
  if (strengthEl) strengthEl.textContent = '200 mg/mL'; // Default or from data

  const esterEl = document.getElementById('esterType');
  if (esterEl) esterEl.textContent = product.esterType.replace('-', ' ').toUpperCase();

  const hlEl = document.getElementById('halfLife');
  if (hlEl) hlEl.textContent = product.halfLife;
}

// Load related products
function loadRelatedProducts(allProducts, currentProduct) {
  const relatedProducts = allProducts.filter(p => p.id !== currentProduct.id).slice(0, 4);
  const relatedGrid = document.getElementById('relatedProducts');

  if (!relatedGrid) return;

  relatedGrid.innerHTML = '';
  relatedProducts.forEach(product => {
    const productCard = createRelatedProductCard(product);
    relatedGrid.appendChild(productCard);
  });
}

// Create related product card (Premium Style)
function createRelatedProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card bg-white rounded-2xl border border-gray-100 p-6 relative group overflow-hidden cursor-pointer';
  card.onclick = () => navigateToProduct(product.id);

  // Determine badge content
  let badgeText = 'In Stock';
  let badgeClass = 'bg-green-100 text-green-700';

  if (product.name.includes('Enanthate')) {
    badgeText = 'Bulk Only';
    badgeClass = 'bg-blue-100 text-blue-700';
  }

  const displayPrice = (product.price && product.price.length > 2) ? product.price[2] : (product.price ? product.price[0] : 0);

  card.innerHTML = `
        <div class="absolute top-4 left-4 ${badgeClass} text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            ${badgeText}
        </div>
        <div class="h-40 mb-4 flex items-center justify-center bg-gray-50 rounded-xl group-hover:bg-primary/5 transition-colors">
            <img src="${product.mainImage}" alt="${product.name}" class="h-28 object-contain mix-blend-multiply">
        </div>
        <div>
            <div class="text-xs text-gray-400 font-semibold mb-1">Pharmaceutical Grade</div>
            <h4 class="font-bold text-gray-900 text-sm mb-2 leading-tight group-hover:text-primary transition line-clamp-2">
                ${product.name}
            </h4>
            <div class="flex items-center justify-between mt-3">
                <div>
                    <span class="block text-xs text-gray-400">Box of 10</span>
                    <span class="text-base font-bold text-gray-900">$${displayPrice}.00</span>
                </div>
                <button class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition">
                    <i class="fas fa-plus text-xs"></i>
                </button>
            </div>
        </div>
    `;

  return card;
}

// Navigate to product detail page
function navigateToProduct(productId) {
  globalThis.location.href = `product.html?id=${productId}`;
}

// Setup event listeners
function setupEventListeners() {
  // Quantity controls
  const decreaseBtn = document.getElementById('decreaseQty');
  const increaseBtn = document.getElementById('increaseQty');
  const quantityInput = document.getElementById('quantity');

  if (decreaseBtn && increaseBtn && quantityInput) {
    decreaseBtn.addEventListener('click', () => {
      const currentValue = Number.parseInt(quantityInput.value, 10);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });

    increaseBtn.addEventListener('click', () => {
      const currentValue = Number.parseInt(quantityInput.value, 10);
      quantityInput.value = currentValue + 1;
    });
  }

  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.dataset.tab;
      switchTab(tabName);
    });
  });

  // WhatsApp chat button
  const whatsappBtn = document.querySelector('button[onclick="openWhatsAppChat()"]');
  if (!whatsappBtn) {
    // If not inline, find by other means or attach global if needed
  }
}

// Switch between tabs
function switchTab(tabName) {
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    if (button.dataset.tab === tabName) {
      button.classList.add('active', 'text-primary', 'bg-gray-50');
    } else {
      button.classList.remove('active', 'text-primary', 'bg-gray-50');
    }
  });

  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
    if (content.id === tabName) {
      content.classList.add('active');
      content.style.animation = 'none';
      content.offsetHeight;
      content.style.animation = 'fadeIn 0.3s ease-in-out';
    } else {
      content.classList.remove('active');
    }
  });
}

// Open WhatsApp chat function
function openWhatsAppChat(type = 'General') {
  // Track Lead Intent for Retargeting
  if (window.Retargeting) {
    window.Retargeting.trackLeadIntent(type);
  }
  let message = "";
  if (type === 'Bulk') {
    message = encodeURIComponent(`Hi! I'm interested in a bulk inquiry for your pharmaceutical products.`);
  } else {
    const productName = document.getElementById('productName') ? document.getElementById('productName').textContent : 'Product';
    const quantity = document.getElementById('quantity') ? document.getElementById('quantity').value : '1';
    message = encodeURIComponent(`Hi! I'm interested in ${productName}. I would like to talk with a sales advisor about purchasing ${quantity} unit(s).`);
  }
  const whatsappNumber = '917032955062';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
}

// Show error message
function showError(message) {
  const mainContent = document.querySelector('main');
  if (mainContent) {
    mainContent.innerHTML = `
            <div class="bg-white rounded-lg shadow-sm p-12 text-center">
                <i class="fas fa-exclamation-triangle text-red-500 text-6xl mb-4"></i>
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
                <p class="text-gray-600 mb-6">${message}</p>
                <a href="index.html" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block">
                    Back to Products
                </a>
            </div>
        `;
  }
}
