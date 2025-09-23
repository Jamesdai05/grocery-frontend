const products=[
    {
        "name": "Guava",
        "price": 4,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/13146503_XL1_20230223.jpg?w=320&q=60",
        "spec": "2 per pack",
        "category": "Fruits",
        "description": "Fresh seedless",
        "numReviews": 12,
        "rating":4,
        "stock": 1000
    },
    {
        "name": "China Fuji Apple",
        "price": 3.95,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/13198956_XL1_20221122.jpg?w=320&q=60",
        "spec": "5 per pack",
        "category": "Fruits",
        "numReviews": 300,
        "rating": 4,
        "description": "China Premium Fuji Apple"
    },
    {
        "name": "Double FP Thai Hom Mali Premium Quality Frangant Rice",
        "price": 11.5,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/13097846_XL1_20230503.jpg?w=320&q=60",
        "spec": "from Thailand, 5kg",
        "category": "Rice, Noodles & Cooking Ingredients",
        "numReviews": 300,
        "rating": 4,
        "description": "Double FP Thai Hom Mali Premium Quality Fragrant Rice"
    },
    {
        "name": "Hokto Mushroom-White Shimeiji",
        "price": 1.35,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/11212658_XL1_20221123.jpg?w=320&q=60",
        "spec": "100g",
        "category": "Vegetables",
        "numReviews": 300,
        "rating": 3.5,
        "description": "White Shimeiji From Malaysia"
    },
    {
        "name": "Kleenex Toilet Tissue Rolls",
        "price": 14.25,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/13093697_XL1_20230822.jpg?w=320&q=60",
        "spec": "20 X 200 per pack",
        "category": "Paper & Tissue",
        "numReviews": 300,
        "rating": 3,
        "description": "Kleenex Toilet Tissue Rolls - Ultra Soft (3 ply)"
    },
    {
        "name": "Natural Olive Oil-Pure 2L(Halal)",
        "price": 14.25,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/12496736_XL1_20230704.jpg?w=320&q=60",
        "spec": "2L,Halal",
        "category": "Rice, Noodles & Cooking Ingredients",
        "numReviews": 300,
        "rating": 3,
        "description": "Naturel Pure Olive Oil, made from quality Spanish olives"
    },
    {
        "name": "Parsa prepacked Carrots",
        "price": 0.95,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/13000321_XL1_20221122.jpg?w=320&q=60",
        "spec": "500g",
        "category": "Vegetables",
        "numReviews": 300,
        "rating": 3,
        "description": "Parsa prepacked Carrots"
    },
    {
        "name": "Parsa fresh Eggs",
        "price": 8,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/11194824_XL1.jpg?w=320&q=60",
        "spec": "30 per pack,1.5kg",
        "category": "Dairy, Chilled & Eggs",
        "numReviews": 300,
        "rating": 3,
        "description": "Parsa eggs"
    },
    {
        "name": "Orgo Fresh Broccoli",
        "price": 3.89,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/90153099_XL1_20221124.jpg?w=320&q=60",
        "spec": "280g",
        "category": "Vegetables",
        "numReviews": 300,
        "rating": 4.2,
        "description": "Fresh and natural Broccoli"
    },
    {
        "name": "Fresh Blueberries",
        "price": 3.9,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/10632060_XL1_20201014.jpg?w=320&q=60",
        "spec": "125g,Zimbabwe",
        "category": "Fruits",
        "numReviews": 300,
        "rating": 3.8,
        "description": " Fragrant & Juicy"
    },
    {
        "name": "Dynamo Power Gel Laundry Detergent Refill-Downy ",
        "price": 8.9,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/13191847_XL1_20230914.jpg?w=320&q=60",
        "spec": "2.4kg",
        "category": "Household",
        "numReviews": 300,
        "rating": 3.7,
        "description": "Laundry Detergent Refill - Downy"
    },
    {
        "name": "Dairylea Cheddar Cheese - Block ",
        "price": 6.75,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/10729241_XL1_20230914.jpg?w=320&q=60",
        "spec": "250g",
        "category": "Dairy, Chilled & Eggs",
        "numReviews": 300,
        "rating": 4.3,
        "description": " Made from natural milk"
    },
    {
        "name": "Mama Lemon Dishwashing liquid ",
        "price": 4.09,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/12391096_XL1.jpg?w=320&q=60",
        "spec": "3 x 600ml",
        "category": "Household",
        "numReviews": 300,
        "rating": 4.8,
        "description": " Mama Lemon Dishwashing Liquid Refill - Natural Lemon"
    },
    {
        "name": "MagiClean Toilet Bleach Power Cleaner",
        "price": 9.35,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/11951709_XL1_20230914.jpg?w=320&q=60",
        "spec": "3 x 500ml",
        "category": "Household",
        "numReviews": 300,
        "description": "MagiClean Toilet Bleach Cleaner"
    },
    {
        "name": "Pursoft Facial Tissue",
        "price": 5.31,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/11951709_XL1_20230914.jpg?w=320&q=60",
        "spec": "3 x 120 per pack",
        "category": "Paper & Tissue",
        "numReviews": 300,
        "rating": 4.6,
        "description": "PurSoft Facial Tissue soft pack(3ply)"
    },
    {
        "name": "Fairprice 3 in 1 instant coffee",
        "price": 5.35,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/12217602_XL1_20221231.jpg?w=320&q=60",
        "spec": "40 x 20g",
        "category": "Drinks",
        "numReviews": 300,
        "rating": 4.5,
        "description": "FairPrice 3 in 1 Instant Coffee Mix - Creamer & Sugar"
    },
    {
        "name": "Nescafe 3 in 1 Instant Coffee",
        "price": 6.15,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/13215146_XL1_20230728.jpg?w=320&q=60",
        "spec": "33 x 19g",
        "category": "Drinks",
        "numReviews": 300,
        "rating": 3.5,
        "description": "Nescafe 3 in 1 Instant Coffee - Original"
    },
    {
        "name": "Tiger Larger Beer Can",
        "price": 23.95,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/13057646_XL1_20230113.jpg?w=320&q=60",
        "spec": "10x 320ml",
        "category": "Beer,Wine & Sprits",
        "numReviews": 300,
        "rating": 4.2,
        "description": "Tiger Larger Beer-Can"
    },
    {
        "name": "Sapporo Premium Can Beer",
        "price": 21.75,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/13022342_XL1_20230210.jpg?w=320&q=60",
        "spec": "6 X 330ml",
        "category": "Beer,Wine & Sprits",
        "numReviews": 300,
        "rating": 4.9,
        "description": "Sapporo Premium Can Beer"
    },
    {
        "name": "Conchatoro Gran Reserva Cabernet Sauvignon",
        "price": 43.41,
        "image": "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/13225540_XL1_20230502.jpg?w=320&q=60",
        "spec": "750ml",
        "category": "Beer,Wine & Sprits",
        "numReviews": 300,
        "rating": 4.2,
        "description": "Conchatoro Gran Reserva Cabernet Sauvignon"
    }
]

export default products;