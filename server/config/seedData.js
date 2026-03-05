const products = [
  {
    name: 'Ray-Ban Aviator Classic',
    brand: 'Ray-Ban',
    category: 'sunglasses',
    description: 'The iconic Ray-Ban Aviator sunglasses have been a style staple since 1937. Featuring a sleek metal frame and classic teardrop lenses with UV protection, these timeless shades suit every face shape.',
    price: 9500,
    originalPrice: 11000,
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600'
    ],
    frameType: 'Full Rim',
    frameShape: 'Aviator',
    gender: 'unisex',
    colors: ['Gold', 'Silver', 'Black'],
    stock: 35,
    rating: 4.8,
    numReviews: 124,
    badge: 'Trending',
    isActive: true,
    lensOptions: {
      types: ['Single Vision', 'Non-Prescription'],
      materials: ['Plastic', 'Polycarbonate'],
      coatings: ['Anti-Glare', 'UV Protection', 'Scratch Resistant'],
      pricing: {
        singleVision: 800,
        bifocal: 0,
        progressive: 0,
        plastic: 500,
        polycarbonate: 800,
        highIndex: 0,
        antiGlare: 400,
        blueLightFilter: 0,
        uvProtection: 300,
        scratchResistant: 250
      }
    }
  },
  {
    name: 'Oakley Holbrook',
    brand: 'Oakley',
    category: 'sunglasses',
    description: 'The Oakley Holbrook sunglasses deliver iconic style with premium Plutonite lens material that filters out 100% of all UV rays. A timeless design inspired by American pop culture icons of the 50s, 60s, and 70s.',
    price: 14500,
    originalPrice: 17000,
    images: [
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600',
      'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=600'
    ],
    frameType: 'Full Rim',
    frameShape: 'Square',
    gender: 'men',
    colors: ['Matte Black', 'Brown', 'Tortoise'],
    stock: 22,
    rating: 4.7,
    numReviews: 89,
    badge: null,
    isActive: true,
    lensOptions: {
      types: ['Single Vision', 'Non-Prescription', 'Polarized'],
      materials: ['Polycarbonate', 'High Index'],
      coatings: ['Anti-Glare', 'UV Protection', 'Scratch Resistant'],
      pricing: {
        singleVision: 1000,
        bifocal: 0,
        progressive: 0,
        plastic: 0,
        polycarbonate: 1200,
        highIndex: 1800,
        antiGlare: 500,
        blueLightFilter: 0,
        uvProtection: 400,
        scratchResistant: 300
      }
    }
  },
  {
    name: 'Prada Minimal Baroque',
    brand: 'Prada',
    category: 'sunglasses',
    description: 'Prada Minimal Baroque sunglasses feature bold geometric frames with a retro flair. Crafted from premium acetate with metal detailing on the temples, these designer sunglasses are a statement piece.',
    price: 24000,
    originalPrice: 28000,
    images: [
      'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=600',
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600'
    ],
    frameType: 'Full Rim',
    frameShape: 'Rectangular',
    gender: 'women',
    colors: ['Black', 'Havana', 'White'],
    stock: 15,
    rating: 4.9,
    numReviews: 56,
    badge: 'New',
    isActive: true,
    lensOptions: {
      types: ['Single Vision', 'Non-Prescription'],
      materials: ['Plastic', 'Polycarbonate', 'High Index'],
      coatings: ['Anti-Glare', 'UV Protection', 'Scratch Resistant'],
      pricing: {
        singleVision: 1200,
        bifocal: 0,
        progressive: 0,
        plastic: 800,
        polycarbonate: 1200,
        highIndex: 2000,
        antiGlare: 600,
        blueLightFilter: 500,
        uvProtection: 400,
        scratchResistant: 350
      }
    }
  },
  {
    name: 'Gucci Square Frame',
    brand: 'Gucci',
    category: 'eyeglasses',
    description: 'Gucci square eyeglasses combine refined Italian craftsmanship with contemporary design. The lightweight acetate frame features the iconic GG logo on the temples and is available in rich color combinations.',
    price: 22000,
    originalPrice: 26000,
    images: [
      'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600',
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600'
    ],
    frameType: 'Full Rim',
    frameShape: 'Square',
    gender: 'unisex',
    colors: ['Black', 'Tortoise', 'Gold'],
    stock: 18,
    rating: 4.8,
    numReviews: 43,
    badge: null,
    isActive: true,
    lensOptions: {
      types: ['Single Vision', 'Bifocal', 'Progressive'],
      materials: ['Plastic', 'Polycarbonate', 'High Index'],
      coatings: ['Anti-Glare', 'Blue Light Filter', 'UV Protection', 'Scratch Resistant'],
      pricing: {
        singleVision: 1500,
        bifocal: 2000,
        progressive: 3500,
        plastic: 800,
        polycarbonate: 1200,
        highIndex: 2200,
        antiGlare: 700,
        blueLightFilter: 600,
        uvProtection: 400,
        scratchResistant: 350
      }
    }
  },
  {
    name: 'Tom Ford FT5634-B',
    brand: 'Tom Ford',
    category: 'eyeglasses',
    description: 'Tom Ford FT5634-B Blue Block eyeglasses are perfect for the modern professional. The sleek rectangular acetate frame features innovative blue light blocking technology, ideal for long screen time.',
    price: 19500,
    originalPrice: 22000,
    images: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600'
    ],
    frameType: 'Full Rim',
    frameShape: 'Rectangular',
    gender: 'men',
    colors: ['Black', 'Dark Brown', 'Blue'],
    stock: 20,
    rating: 4.7,
    numReviews: 67,
    badge: 'Trending',
    isActive: true,
    lensOptions: {
      types: ['Single Vision', 'Bifocal', 'Progressive'],
      materials: ['Polycarbonate', 'High Index'],
      coatings: ['Anti-Glare', 'Blue Light Filter', 'UV Protection', 'Scratch Resistant'],
      pricing: {
        singleVision: 1800,
        bifocal: 2500,
        progressive: 4000,
        plastic: 0,
        polycarbonate: 1500,
        highIndex: 2500,
        antiGlare: 800,
        blueLightFilter: 700,
        uvProtection: 450,
        scratchResistant: 400
      }
    }
  },
  {
    name: 'Titan Rimless Titanium',
    brand: 'Titan',
    category: 'eyeglasses',
    description: 'Titan Rimless Titanium eyeglasses offer a featherweight experience with ultra-durable titanium construction. The minimalist rimless design provides an unobstructed vision field while maintaining a professional look.',
    price: 5500,
    originalPrice: 7000,
    images: [
      'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600',
      'https://images.unsplash.com/photo-1629220702836-5f8fb7e08988?w=600'
    ],
    frameType: 'Rimless',
    frameShape: 'Rectangular',
    gender: 'unisex',
    colors: ['Silver', 'Gold', 'Gunmetal'],
    stock: 40,
    rating: 4.5,
    numReviews: 198,
    badge: 'Sale',
    isActive: true,
    lensOptions: {
      types: ['Single Vision', 'Bifocal', 'Progressive'],
      materials: ['Plastic', 'Polycarbonate', 'High Index'],
      coatings: ['Anti-Glare', 'UV Protection', 'Scratch Resistant'],
      pricing: {
        singleVision: 600,
        bifocal: 1200,
        progressive: 2500,
        plastic: 400,
        polycarbonate: 700,
        highIndex: 1200,
        antiGlare: 350,
        blueLightFilter: 400,
        uvProtection: 200,
        scratchResistant: 150
      }
    }
  },
  {
    name: 'Vogue Butterfly Frame',
    brand: 'Vogue',
    category: 'eyeglasses',
    description: 'Vogue Butterfly Frame eyeglasses capture feminine elegance with their distinctive winged silhouette. The lightweight acetate frame features gradient lens tints and delicate embellishments on the temples.',
    price: 6500,
    originalPrice: 8000,
    images: [
      'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600',
      'https://images.unsplash.com/photo-1573210792-67e32cce1df2?w=600'
    ],
    frameType: 'Full Rim',
    frameShape: 'Cat Eye',
    gender: 'women',
    colors: ['Purple', 'Pink', 'Black', 'Tortoise'],
    stock: 30,
    rating: 4.4,
    numReviews: 112,
    badge: 'New',
    isActive: true,
    lensOptions: {
      types: ['Single Vision', 'Bifocal'],
      materials: ['Plastic', 'Polycarbonate'],
      coatings: ['Anti-Glare', 'Blue Light Filter', 'UV Protection', 'Scratch Resistant'],
      pricing: {
        singleVision: 700,
        bifocal: 1400,
        progressive: 0,
        plastic: 450,
        polycarbonate: 750,
        highIndex: 0,
        antiGlare: 380,
        blueLightFilter: 420,
        uvProtection: 220,
        scratchResistant: 180
      }
    }
  },
  {
    name: 'Fossil Round Metal',
    brand: 'Fossil',
    category: 'eyeglasses',
    description: 'Fossil Round Metal eyeglasses channel vintage charm with their perfectly circular wire frames. The stainless steel construction ensures durability while the adjustable nose pads provide all-day comfort.',
    price: 4500,
    originalPrice: 5500,
    images: [
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600'
    ],
    frameType: 'Full Rim',
    frameShape: 'Round',
    gender: 'unisex',
    colors: ['Gold', 'Silver', 'Rose Gold', 'Black'],
    stock: 45,
    rating: 4.3,
    numReviews: 87,
    badge: 'Sale',
    isActive: true,
    lensOptions: {
      types: ['Single Vision', 'Bifocal', 'Progressive'],
      materials: ['Plastic', 'Polycarbonate', 'High Index'],
      coatings: ['Anti-Glare', 'Blue Light Filter', 'UV Protection', 'Scratch Resistant'],
      pricing: {
        singleVision: 650,
        bifocal: 1300,
        progressive: 2800,
        plastic: 400,
        polycarbonate: 700,
        highIndex: 1100,
        antiGlare: 360,
        blueLightFilter: 400,
        uvProtection: 210,
        scratchResistant: 170
      }
    }
  },
  {
    name: 'Calvin Klein Half-Rim',
    brand: 'Calvin Klein',
    category: 'eyeglasses',
    description: 'Calvin Klein Half-Rim eyeglasses embody minimalist sophistication. The semi-rimless stainless steel frame showcases clean lines and subtle branding, perfect for the modern professional aesthetic.',
    price: 8500,
    originalPrice: 10000,
    images: [
      'https://images.unsplash.com/photo-1629220702836-5f8fb7e08988?w=600',
      'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600'
    ],
    frameType: 'Half Rim',
    frameShape: 'Rectangular',
    gender: 'unisex',
    colors: ['Gunmetal', 'Silver', 'Black'],
    stock: 28,
    rating: 4.5,
    numReviews: 74,
    badge: null,
    isActive: true,
    lensOptions: {
      types: ['Single Vision', 'Bifocal', 'Progressive'],
      materials: ['Plastic', 'Polycarbonate', 'High Index'],
      coatings: ['Anti-Glare', 'Blue Light Filter', 'UV Protection', 'Scratch Resistant'],
      pricing: {
        singleVision: 900,
        bifocal: 1600,
        progressive: 3000,
        plastic: 550,
        polycarbonate: 900,
        highIndex: 1500,
        antiGlare: 450,
        blueLightFilter: 500,
        uvProtection: 280,
        scratchResistant: 230
      }
    }
  },
  {
    name: 'Persol PO0714',
    brand: 'Persol',
    category: 'sunglasses',
    description: 'The iconic Persol PO0714 Steve McQueen sunglasses are a legend in eyewear. Featuring the unique Meflecto system for exceptional flexibility, the iconic silver arrow and patented hinge make these unmistakably Persol.',
    price: 21000,
    originalPrice: 24000,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600'
    ],
    frameType: 'Full Rim',
    frameShape: 'Wayfarer',
    gender: 'men',
    colors: ['Havana', 'Black', 'Blue'],
    stock: 12,
    rating: 4.9,
    numReviews: 38,
    badge: null,
    isActive: true,
    lensOptions: {
      types: ['Single Vision', 'Non-Prescription', 'Polarized'],
      materials: ['Polycarbonate', 'High Index'],
      coatings: ['Anti-Glare', 'UV Protection', 'Scratch Resistant'],
      pricing: {
        singleVision: 1400,
        bifocal: 0,
        progressive: 0,
        plastic: 0,
        polycarbonate: 1600,
        highIndex: 2200,
        antiGlare: 700,
        blueLightFilter: 0,
        uvProtection: 500,
        scratchResistant: 400
      }
    }
  },
  {
    name: 'Carrera 8054/S',
    brand: 'Carrera',
    category: 'sunglasses',
    description: 'Carrera 8054/S sport sunglasses combine high-performance functionality with bold aesthetic design. The wraparound frame provides maximum coverage while the rubberized temples ensure a secure sporty fit.',
    price: 11500,
    originalPrice: 13500,
    images: [
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600',
      'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=600'
    ],
    frameType: 'Full Rim',
    frameShape: 'Rectangular',
    gender: 'men',
    colors: ['Matte Black', 'Red', 'Blue'],
    stock: 25,
    rating: 4.6,
    numReviews: 61,
    badge: 'Trending',
    isActive: true,
    lensOptions: {
      types: ['Single Vision', 'Non-Prescription', 'Polarized'],
      materials: ['Polycarbonate'],
      coatings: ['Anti-Glare', 'UV Protection', 'Scratch Resistant'],
      pricing: {
        singleVision: 1100,
        bifocal: 0,
        progressive: 0,
        plastic: 0,
        polycarbonate: 1300,
        highIndex: 0,
        antiGlare: 550,
        blueLightFilter: 0,
        uvProtection: 400,
        scratchResistant: 300
      }
    }
  },
  {
    name: 'Maui Jim Peahi',
    brand: 'Maui Jim',
    category: 'sunglasses',
    description: 'Maui Jim Peahi sunglasses feature PolarizedPlus2 lenses that eliminate 99.9% of glare and enhance color. Designed for water sports and outdoor adventures, these are the choice of Hawaiian surfers and fishermen.',
    price: 18500,
    originalPrice: 21000,
    images: [
      'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=600',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600'
    ],
    frameType: 'Full Rim',
    frameShape: 'Aviator',
    gender: 'unisex',
    colors: ['Gloss Black', 'Gunmetal', 'Dark Tortoise'],
    stock: 16,
    rating: 4.8,
    numReviews: 52,
    badge: null,
    isActive: true,
    lensOptions: {
      types: ['Polarized', 'Single Vision'],
      materials: ['Polycarbonate', 'High Index'],
      coatings: ['Anti-Glare', 'UV Protection', 'Scratch Resistant'],
      pricing: {
        singleVision: 1600,
        bifocal: 0,
        progressive: 0,
        plastic: 0,
        polycarbonate: 1800,
        highIndex: 2600,
        antiGlare: 750,
        blueLightFilter: 0,
        uvProtection: 550,
        scratchResistant: 450
      }
    }
  },
  {
    name: 'Burberry BE2364',
    brand: 'Burberry',
    category: 'eyeglasses',
    description: 'Burberry BE2364 eyeglasses feature the iconic Burberry plaid pattern inlaid on the temples. The sophisticated rectangular frame in lightweight acetate brings British luxury to everyday eyewear.',
    price: 16500,
    originalPrice: 19000,
    images: [
      'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600'
    ],
    frameType: 'Full Rim',
    frameShape: 'Rectangular',
    gender: 'women',
    colors: ['Havana', 'Black', 'Burgundy'],
    stock: 19,
    rating: 4.7,
    numReviews: 48,
    badge: 'New',
    isActive: true,
    lensOptions: {
      types: ['Single Vision', 'Bifocal', 'Progressive'],
      materials: ['Plastic', 'Polycarbonate', 'High Index'],
      coatings: ['Anti-Glare', 'Blue Light Filter', 'UV Protection', 'Scratch Resistant'],
      pricing: {
        singleVision: 1400,
        bifocal: 2200,
        progressive: 3800,
        plastic: 750,
        polycarbonate: 1100,
        highIndex: 2000,
        antiGlare: 650,
        blueLightFilter: 600,
        uvProtection: 380,
        scratchResistant: 320
      }
    }
  },
  {
    name: 'Dior DiorBlackSuit',
    brand: 'Dior',
    category: 'sunglasses',
    description: 'The Dior DiorBlackSuit sunglasses are a masterclass in luxury eyewear design. Featuring the distinctive Dior emblem across the bridge, the bold oversized frame and gradient tinted lenses make an unmistakable statement.',
    price: 28000,
    originalPrice: 32000,
    images: [
      'https://images.unsplash.com/photo-1573210792-67e32cce1df2?w=600',
      'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600'
    ],
    frameType: 'Full Rim',
    frameShape: 'Square',
    gender: 'women',
    colors: ['Black', 'Gold', 'White'],
    stock: 10,
    rating: 4.9,
    numReviews: 29,
    badge: 'New',
    isActive: true,
    lensOptions: {
      types: ['Single Vision', 'Non-Prescription'],
      materials: ['Polycarbonate', 'High Index'],
      coatings: ['Anti-Glare', 'UV Protection', 'Scratch Resistant'],
      pricing: {
        singleVision: 2000,
        bifocal: 0,
        progressive: 0,
        plastic: 0,
        polycarbonate: 2000,
        highIndex: 3000,
        antiGlare: 900,
        blueLightFilter: 0,
        uvProtection: 600,
        scratchResistant: 500
      }
    }
  },
  {
    name: 'Lenskart Air Classic',
    brand: 'Lenskart',
    category: 'eyeglasses',
    description: 'Lenskart Air Classic eyeglasses are engineered for ultimate lightness and comfort. Made with high-grade TR90 nylon, these featherweight glasses weigh less than 7 grams while providing superior durability and flexibility.',
    price: 2500,
    originalPrice: 3500,
    images: [
      'https://images.unsplash.com/photo-1629220702836-5f8fb7e08988?w=600',
      'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600'
    ],
    frameType: 'Full Rim',
    frameShape: 'Rectangular',
    gender: 'unisex',
    colors: ['Black', 'Brown', 'Navy Blue', 'Red'],
    stock: 50,
    rating: 4.2,
    numReviews: 342,
    badge: 'Sale',
    isActive: true,
    lensOptions: {
      types: ['Single Vision', 'Bifocal', 'Progressive'],
      materials: ['Plastic', 'Polycarbonate', 'High Index'],
      coatings: ['Anti-Glare', 'Blue Light Filter', 'UV Protection', 'Scratch Resistant'],
      pricing: {
        singleVision: 399,
        bifocal: 799,
        progressive: 1599,
        plastic: 299,
        polycarbonate: 499,
        highIndex: 899,
        antiGlare: 200,
        blueLightFilter: 250,
        uvProtection: 100,
        scratchResistant: 99
      }
    }
  }
];

module.exports = products;
