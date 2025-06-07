import { useState, useMemo, useCallback } from 'react';
import { applyFilters, sortContainers, searchContainers } from '../utils/dataProcessing';
import containerData from '../data/containers.json';

/**
 * Custom hook for managing skip hire application state
 * @returns {Object} Skip hire state and actions
 */
export const useSkipHire = () => {
  // Core state
  const [containers] = useState(containerData);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter state
  const [filters, setFilters] = useState({
    maxPrice: null,
    roadPlacement: null,
    heavyWaste: null,
    sizeRange: [4, 40],
    sizeCategory: null
  });
  
  // Sort state
  const [sortBy, setSortBy] = useState('size');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState('grid'); // 'grid' | 'list'
  
  // Form state
  const [postcode, setPostcode] = useState('LE10 1SH');
  const [projectType, setProjectType] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    deliveryDate: '',
    specialRequirements: ''
  });

  // Memoized filtered and sorted containers
  const filteredContainers = useMemo(() => {
    let result = containers;
    
    // Apply search
    if (searchQuery.trim()) {
      result = searchContainers(result, searchQuery);
    }
    
    // Apply filters
    result = result.filter(container => applyFilters(container, filters));
    
    // Apply sorting
    result = sortContainers(result, sortBy, sortOrder);
    
    return result;
  }, [containers, searchQuery, filters, sortBy, sortOrder]);

  // Container selection actions
  const selectContainer = useCallback((container) => {
    setSelectedContainer(container);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedContainer(null);
  }, []);


  // Filter actions
  const updateFilter = useCallback((filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      maxPrice: null,
      roadPlacement: null,
      heavyWaste: null,
      sizeRange: [4, 40],
      sizeCategory: null
    });
    setSearchQuery('');
  }, []);

  const applyQuickFilter = useCallback((filterType) => {
    switch (filterType) {
      case 'road-placement':
        updateFilter('roadPlacement', true);
        break;
      case 'heavy-waste':
        updateFilter('heavyWaste', true);
        break;
      case 'small-containers':
        updateFilter('sizeRange', [4, 8]);
        break;
      case 'large-containers':
        updateFilter('sizeRange', [16, 40]);
        break;
      case 'budget-friendly':
        updateFilter('maxPrice', 400);
        break;
      default:
        break;
    }
  }, [updateFilter]);

  // Sort actions
  const updateSort = useCallback((newSortBy, newOrder = 'asc') => {
    setSortBy(newSortBy);
    setSortOrder(newOrder);
  }, []);

  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  }, []);

  // Search actions
  const updateSearchQuery = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  // Customer info actions
  const updateCustomerInfo = useCallback((field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const resetCustomerInfo = useCallback(() => {
    setCustomerInfo({
      name: '',
      email: '',
      phone: '',
      address: '',
      deliveryDate: '',
      specialRequirements: ''
    });
  }, []);

  // UI actions
  const setView = useCallback((view) => {
    setActiveView(view);
  }, []);

  const getFilterSummary = useCallback(() => {
    const activeFilters = [];
    
    if (filters.maxPrice) {
      activeFilters.push(`Under £${filters.maxPrice}`);
    }
    
    if (filters.roadPlacement === true) {
      activeFilters.push('Road placement');
    }
    
    if (filters.heavyWaste === true) {
      activeFilters.push('Heavy waste');
    }
    
    if (filters.sizeRange[0] !== 4 || filters.sizeRange[1] !== 40) {
      activeFilters.push(`${filters.sizeRange[0]}-${filters.sizeRange[1]} yards`);
    }
    
    if (filters.sizeCategory) {
      activeFilters.push(filters.sizeCategory);
    }
    
    if (searchQuery.trim()) {
      activeFilters.push(`Search: "${searchQuery}"`);
    }
    
    return activeFilters;
  }, [filters, searchQuery]);

  // Statistics
  const stats = useMemo(() => ({
    totalContainers: containers.length,
    filteredCount: filteredContainers.length,
    hasSelection: !!selectedContainer,
    hasFilters: getFilterSummary().length > 0
  }), [containers.length, filteredContainers.length, selectedContainer, getFilterSummary]);

  return {
    // Data
    containers: filteredContainers,
    allContainers: containers,
    selectedContainer,
    
    // Search & Filters
    searchQuery,
    filters,
    sortBy,
    sortOrder,
    
    // UI State
    loading,
    activeView,
    
    // Form State
    postcode,
    projectType,
    customerInfo,
    
    // Statistics
    stats,
    
    // Container Actions
    selectContainer,
    clearSelection,
    
    
    // Filter Actions
    updateFilter,
    clearFilters,
    applyQuickFilter,
    getFilterSummary,
    
    // Sort Actions
    updateSort,
    toggleSortOrder,
    
    // Search Actions
    updateSearchQuery,
    
    // Customer Actions
    updateCustomerInfo,
    resetCustomerInfo,
    
    // UI Actions
    setView,
    setPostcode,
    setProjectType,
    setLoading
  };
};

export default useSkipHire;