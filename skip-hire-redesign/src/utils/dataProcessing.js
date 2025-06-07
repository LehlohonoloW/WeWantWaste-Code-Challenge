/**
 * Data processing utilities for skip hire containers
 */

/**
 * Apply filters to container data
 * @param {Object} container - Container object
 * @param {Object} filters - Filter criteria
 * @returns {boolean} Whether container matches filters
 */
export const applyFilters = (container, filters) => {
  const { maxPrice, roadPlacement, heavyWaste, sizeRange, sizeCategory } = filters;
  
  // Price filter
  if (maxPrice && container.price_before_vat > maxPrice) {
    return false;
  }
  
  // Road placement filter
  if (roadPlacement !== null && container.allowed_on_road !== roadPlacement) {
    return false;
  }
  
  // Heavy waste filter
  if (heavyWaste !== null && container.allows_heavy_waste !== heavyWaste) {
    return false;
  }
  
  // Size range filter
  if (sizeRange && (container.size < sizeRange[0] || container.size > sizeRange[1])) {
    return false;
  }
  
  // Size category filter
  if (sizeCategory && !doesContainerMatchSizeCategory(container, sizeCategory)) {
    return false;
  }
  
  return true;
};

/**
 * Check if container matches size category
 * @param {Object} container - Container object
 * @param {string} category - Size category
 * @returns {boolean} Whether container matches category
 */
const doesContainerMatchSizeCategory = (container, category) => {
  const categories = {
    'small': [4, 6, 8],
    'medium': [10, 12, 14],
    'large': [16, 20],
    'extra-large': [40]
  };
  
  return categories[category]?.includes(container.size) || false;
};

/**
 * Sort containers by specified criteria
 * @param {Array} containers - Array of containers
 * @param {string} sortBy - Sort criteria
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted containers
 */
export const sortContainers = (containers, sortBy = 'size', order = 'asc') => {
  const sortedContainers = [...containers].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'size':
        aValue = a.size;
        bValue = b.size;
        break;
      case 'price':
        aValue = a.price_before_vat;
        bValue = b.price_before_vat;
        break;
      case 'total-price':
        aValue = a.price_before_vat + (a.price_before_vat * a.vat / 100);
        bValue = b.price_before_vat + (b.price_before_vat * b.vat / 100);
        break;
      case 'price-per-yard':
        aValue = (a.price_before_vat + (a.price_before_vat * a.vat / 100)) / a.size;
        bValue = (b.price_before_vat + (b.price_before_vat * b.vat / 100)) / b.size;
        break;
      case 'road-placement':
        aValue = a.allowed_on_road ? 1 : 0;
        bValue = b.allowed_on_road ? 1 : 0;
        break;
      case 'heavy-waste':
        aValue = a.allows_heavy_waste ? 1 : 0;
        bValue = b.allows_heavy_waste ? 1 : 0;
        break;
      default:
        aValue = a[sortBy];
        bValue = b[sortBy];
    }
    
    if (order === 'desc') {
      return bValue - aValue;
    }
    return aValue - bValue;
  });
  
  return sortedContainers;
};

/**
 * Group containers by size category
 * @param {Array} containers - Array of containers
 * @returns {Object} Grouped containers
 */
export const groupContainersByCategory = (containers) => {
  return containers.reduce((groups, container) => {
    const category = getSizeCategory(container.size);
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(container);
    return groups;
  }, {});
};

/**
 * Get size category for container
 * @param {number} size - Container size
 * @returns {string} Size category
 */
const getSizeCategory = (size) => {
  if (size <= 8) return 'Small (4-8 yards)';
  if (size <= 14) return 'Medium (10-14 yards)';
  if (size <= 20) return 'Large (16-20 yards)';
  return 'Extra Large (40+ yards)';
};

/**
 * Search containers by text query
 * @param {Array} containers - Array of containers
 * @param {string} query - Search query
 * @returns {Array} Filtered containers
 */
export const searchContainers = (containers, query) => {
  if (!query || query.trim() === '') {
    return containers;
  }
  
  const searchTerm = query.toLowerCase().trim();
  
  return containers.filter(container => {
    // Search by size
    if (container.size.toString().includes(searchTerm)) {
      return true;
    }
    
    // Search by features
    if (searchTerm.includes('road') && container.allowed_on_road) {
      return true;
    }
    
    if (searchTerm.includes('heavy') && container.allows_heavy_waste) {
      return true;
    }
    
    // Search by price range
    if (searchTerm.includes('£')) {
      const priceMatch = searchTerm.match(/£(\d+)/);
      if (priceMatch) {
        const searchPrice = parseInt(priceMatch[1]);
        const containerPrice = container.price_before_vat;
        return Math.abs(containerPrice - searchPrice) <= 50;
      }
    }
    
    return false;
  });
};

/**
 * Get container recommendations based on project type
 * @param {Array} containers - Array of containers
 * @param {string} projectType - Type of project
 * @returns {Array} Recommended containers
 */
export const getContainerRecommendations = (containers, projectType) => {
  const projectSizeMap = {
    'bathroom-renovation': [4, 6, 8],
    'kitchen-renovation': [6, 8, 10],
    'garden-clearance': [4, 6, 8],
    'house-clearance': [12, 14, 16],
    'office-clearance': [8, 10, 12],
    'construction-small': [10, 12, 14],
    'construction-large': [16, 20, 40],
    'commercial': [20, 40],
    'roofing': [12, 14, 16],
    'flooring': [8, 10, 12]
  };
  
  const recommendedSizes = projectSizeMap[projectType] || [6, 8, 10];
  
  return containers
    .filter(container => recommendedSizes.includes(container.size))
    .sort((a, b) => a.size - b.size);
};

/**
 * Calculate statistics for container dataset
 * @param {Array} containers - Array of containers
 * @returns {Object} Dataset statistics
 */
export const calculateContainerStats = (containers) => {
  if (containers.length === 0) {
    return {
      totalContainers: 0,
      sizeRange: { min: 0, max: 0 },
      priceRange: { min: 0, max: 0 },
      averagePrice: 0,
      roadPlacementCount: 0,
      heavyWasteCount: 0
    };
  }
  
  const sizes = containers.map(c => c.size);
  const prices = containers.map(c => c.price_before_vat);
  
  return {
    totalContainers: containers.length,
    sizeRange: {
      min: Math.min(...sizes),
      max: Math.max(...sizes)
    },
    priceRange: {
      min: Math.min(...prices),
      max: Math.max(...prices)
    },
    averagePrice: prices.reduce((sum, price) => sum + price, 0) / prices.length,
    roadPlacementCount: containers.filter(c => c.allowed_on_road).length,
    heavyWasteCount: containers.filter(c => c.allows_heavy_waste).length,
    roadPlacementPercentage: (containers.filter(c => c.allowed_on_road).length / containers.length) * 100,
    heavyWastePercentage: (containers.filter(c => c.allows_heavy_waste).length / containers.length) * 100
  };
};

/**
 * Validate container data structure
 * @param {Object} container - Container object to validate
 * @returns {Object} Validation result
 */
export const validateContainerData = (container) => {
  const requiredFields = [
    'id', 'size', 'hire_period_days', 'price_before_vat', 
    'vat', 'postcode', 'allowed_on_road', 'allows_heavy_waste'
  ];
  
  const errors = [];
  const warnings = [];
  
  // Check required fields
  requiredFields.forEach(field => {
    if (container[field] === undefined || container[field] === null) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  // Validate data types and ranges
  if (typeof container.size !== 'number' || container.size <= 0) {
    errors.push('Size must be a positive number');
  }
  
  if (typeof container.price_before_vat !== 'number' || container.price_before_vat <= 0) {
    errors.push('Price before VAT must be a positive number');
  }
  
  if (typeof container.vat !== 'number' || container.vat < 0 || container.vat > 100) {
    errors.push('VAT must be a number between 0 and 100');
  }
  
  if (typeof container.hire_period_days !== 'number' || container.hire_period_days <= 0) {
    errors.push('Hire period must be a positive number');
  }
  
  // Check for unusual values that might indicate errors
  if (container.size > 50) {
    warnings.push('Unusually large container size');
  }
  
  if (container.price_before_vat > 2000) {
    warnings.push('Unusually high price');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    hasWarnings: warnings.length > 0
  };
};

/**
 * Format container data for display
 * @param {Object} container - Raw container data
 * @returns {Object} Formatted container data
 */
export const formatContainerForDisplay = (container) => {
  return {
    ...container,
    displaySize: `${container.size} Yard${container.size !== 1 ? 's' : ''}`,
    displayHirePeriod: `${container.hire_period_days} day${container.hire_period_days !== 1 ? 's' : ''}`,
    features: {
      roadPlacement: container.allowed_on_road,
      heavyWaste: container.allows_heavy_waste,
      hasAdditionalCosts: !!(container.transport_cost || container.per_tonne_cost)
    }
  };
};