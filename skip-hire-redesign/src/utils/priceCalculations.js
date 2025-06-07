/**
 * Calculate container pricing with VAT and additional costs
 * @param {Object} container - Container object with pricing data
 * @returns {Object} Calculated pricing information
 */
export const calculateContainerPrice = (container) => {
  const basePrice = container.price_before_vat;
  const vatAmount = (basePrice * container.vat) / 100;
  const totalPrice = basePrice + vatAmount;
  
  return {
    basePrice,
    vatAmount,
    totalPrice,
    formattedBase: formatCurrency(basePrice),
    formattedVAT: formatCurrency(vatAmount),
    formattedTotal: formatCurrency(totalPrice),
    additionalCosts: {
      transport: container.transport_cost ? formatCurrency(container.transport_cost) : null,
      perTonne: container.per_tonne_cost ? formatCurrency(container.per_tonne_cost) : null
    },
    hasAdditionalCosts: !!(container.transport_cost || container.per_tonne_cost)
  };
};

/**
 * Format currency values for display
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Calculate savings compared to a reference container
 * @param {Object} container - Current container
 * @param {Object} referenceContainer - Container to compare against
 * @returns {Object} Savings information
 */
export const calculateSavings = (container, referenceContainer) => {
  const currentPrice = calculateContainerPrice(container).totalPrice;
  const referencePrice = calculateContainerPrice(referenceContainer).totalPrice;
  const savings = referencePrice - currentPrice;
  const savingsPercentage = ((savings / referencePrice) * 100).toFixed(1);
  
  return {
    amount: Math.abs(savings),
    percentage: Math.abs(parseFloat(savingsPercentage)),
    formattedAmount: formatCurrency(Math.abs(savings)),
    isSaving: savings > 0,
    isMoreExpensive: savings < 0
  };
};

/**
 * Get recommended container size based on project type
 * @param {string} projectType - Type of project
 * @returns {number[]} Array of recommended container sizes
 */
export const getRecommendedSizes = (projectType) => {
  const recommendations = {
    'home-renovation': [6, 8, 10],
    'garden-clearance': [4, 6, 8],
    'construction': [12, 14, 16, 20],
    'commercial': [16, 20, 40],
    'office-clearance': [8, 10, 12],
    'house-clearance': [12, 14, 16]
  };
  
  return recommendations[projectType] || [6, 8, 10];
};

/**
 * Calculate price per cubic yard for comparison
 * @param {Object} container - Container object
 * @returns {number} Price per cubic yard
 */
export const calculatePricePerCubicYard = (container) => {
  const { totalPrice } = calculateContainerPrice(container);
  return totalPrice / container.size;
};

/**
 * Find the most economical container for a given size range
 * @param {Object[]} containers - Array of containers
 * @param {number} minSize - Minimum size requirement
 * @param {number} maxSize - Maximum size requirement
 * @returns {Object|null} Most economical container or null
 */
export const findMostEconomical = (containers, minSize = 4, maxSize = 40) => {
  const suitableContainers = containers.filter(
    container => container.size >= minSize && container.size <= maxSize
  );
  
  if (suitableContainers.length === 0) return null;
  
  return suitableContainers.reduce((best, current) => {
    const bestPricePerYard = calculatePricePerCubicYard(best);
    const currentPricePerYard = calculatePricePerCubicYard(current);
    return currentPricePerYard < bestPricePerYard ? current : best;
  });
};

/**
 * Get size category for container
 * @param {number} size - Container size in cubic yards
 * @returns {string} Size category
 */
export const getSizeCategory = (size) => {
  if (size <= 6) return 'Small';
  if (size <= 12) return 'Medium';
  if (size <= 16) return 'Large';
  return 'Extra Large';
};

/**
 * Get capacity description for container size
 * @param {number} size - Container size in cubic yards
 * @returns {string} Capacity description
 */
export const getCapacityDescription = (size) => {
  const descriptions = {
    4: 'Perfect for small garden clearances',
    6: 'Ideal for bathroom renovations',
    8: 'Great for kitchen renovations',
    10: 'Suitable for single room clearouts',
    12: 'Perfect for home renovations',
    14: 'Ideal for house clearances',
    16: 'Great for large renovations',
    20: 'Suitable for construction projects',
    40: 'Perfect for commercial projects'
  };
  
  return descriptions[size] || `${size} cubic yard capacity`;
};

/**
 * Validate container selection based on requirements
 * @param {Object} container - Selected container
 * @param {Object} requirements - Project requirements
 * @returns {Object} Validation result
 */
export const validateContainerSelection = (container, requirements = {}) => {
  const issues = [];
  const warnings = [];
  
  // Check road placement requirement
  if (requirements.needsRoadPlacement && !container.allowed_on_road) {
    issues.push('This container cannot be placed on the road');
  }
  
  // Check heavy waste requirement
  if (requirements.hasHeavyWaste && !container.allows_heavy_waste) {
    issues.push('This container does not accept heavy waste');
  }
  
  // Check if container might be too small
  if (requirements.estimatedVolume && container.size < requirements.estimatedVolume) {
    warnings.push('This container might be too small for your estimated waste volume');
  }
  
  // Check if container might be too large (cost warning)
  if (requirements.estimatedVolume && container.size > (requirements.estimatedVolume * 1.5)) {
    warnings.push('This container might be larger than needed, consider a smaller size to save money');
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    warnings,
    hasWarnings: warnings.length > 0
  };
};