export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const getRatingStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  for (let i = 0; i < fullStars; i++) stars.push('full');
  if (hasHalf) stars.push('half');
  while (stars.length < 5) stars.push('empty');
  return stars;
};

export const truncateText = (text, maxLength = 60) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getDiscountPercent = (price, originalPrice) => {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

export const getCategoryLabel = (category) => {
  const labels = {
    eyeglasses: 'Eyeglasses',
    sunglasses: 'Sunglasses',
    'contact-lenses': 'Contact Lenses',
  };
  return labels[category] || category;
};

export const getOrderStatusColor = (status) => {
  const normalized = (status || '').toLowerCase();
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return colors[normalized] || 'bg-gray-100 text-gray-800';
};

export const LENS_PRICES = {
  lensType: { singleVision: 500, bifocal: 800, progressive: 1200 },
  material: { plastic: 0, polycarbonate: 300, highIndex: 600 },
  coatings: { antiGlare: 200, blueLightFilter: 300, uvProtection: 150, scratchResistant: 100 },
};

export const calculateLensPrice = (customization) => {
  if (!customization) return 0;
  let total = 0;
  if (customization.lensType) {
    const normalized = customization.lensType.replace(/\s+/g, '');
    const key = normalized.charAt(0).toLowerCase() + normalized.slice(1);
    total += LENS_PRICES.lensType[key] || 0;
  }
  if (customization.material) {
    const matMap = { Plastic: 'plastic', Polycarbonate: 'polycarbonate', 'High Index': 'highIndex' };
    total += LENS_PRICES.material[matMap[customization.material]] || 0;
  }
  if (customization.coatings && Array.isArray(customization.coatings)) {
    customization.coatings.forEach((c) => {
      const coatMap = {
        'Anti-Glare': 'antiGlare',
        'Blue Light Filter': 'blueLightFilter',
        'UV Protection': 'uvProtection',
        'Scratch Resistant': 'scratchResistant',
      };
      total += LENS_PRICES.coatings[coatMap[c]] || 0;
    });
  }
  return total;
};
