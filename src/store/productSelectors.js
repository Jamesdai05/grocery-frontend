/**
 * Product Selectors
 *
 * Centralized selectors for accessing product UI state
 * These can be imported and used across components for consistency
 */

// Basic selectors
export const selectProductState = (state) => state.product;

export const selectFilters = (state) => state.product.filters;

export const selectSearchTerm = (state) => state.product.filters.searchTerm;

export const selectCategoryFilter = (state) => state.product.filters.category;

export const selectPriceRange = (state) => state.product.filters.priceRange;

export const selectSelectedProduct = (state) => state.product.selectedProduct;

export const selectSortBy = (state) => state.product.sortBy;

export const selectViewMode = (state) => state.product.viewMode;

// Computed selectors
export const selectHasActiveFilters = (state) => {
    const { category, searchTerm, priceRange } = state.product.filters;
    return (
        category !== 'all' ||
        searchTerm !== '' ||
        priceRange.min > 0 ||
        priceRange.max !== Infinity
    );
};

export const selectIsGridView = (state) => state.product.viewMode === 'grid';

export const selectIsListView = (state) => state.product.viewMode === 'list';

/**
 * Helper function to filter products based on current filters
 * Use this in your components after fetching products with React Query
 *
 * @param {Array} products - Array of product objects
 * @param {Object} filters - Filter object from Redux state
 * @returns {Array} Filtered products
 */
export const filterProducts = (products, filters) => {
    if (!products || !Array.isArray(products)) return [];

    const { category, searchTerm, priceRange } = filters;

    return products.filter(product => {

        const productCategory=product.category?.toLowerCase().trim();
        const selectedCategory=category?.toLowerCase().trim();

        // Category filter
        const matchesCategory = selectedCategory === 'all' || productCategory === selectedCategory || productCategory.includes(selectedCategory);

        // Search filter
        const matchesSearch = searchTerm === '' ||
            product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase());

        // Price range filter
        const matchesPrice =
            product.price >= priceRange.min &&
            product.price <= priceRange.max;

        return matchesCategory && matchesSearch && matchesPrice;
    });
};

/**
 * Helper function to sort products based on sort preference
 *
 * @param {Array} products - Array of product objects
 * @param {String} sortBy - Sort preference ('name' | 'price-asc' | 'price-desc' | 'newest')
 * @returns {Array} Sorted products
 */
export const sortProducts = (products, sortBy) => {
    if (!products || !Array.isArray(products)) return [];

    const sorted = [...products];

    switch (sortBy) {
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));

        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);

        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);

        case 'newest':
            return sorted.sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            );

        default:
            return sorted;
    }
};

/**
 * Combined helper to filter and sort products
 *
 * @param {Array} products - Array of product objects
 * @param {Object} filters - Filter object from Redux state
 * @param {String} sortBy - Sort preference
 * @returns {Array} Filtered and sorted products
 */
export const filterAndSortProducts = (products, filters, sortBy) => {
    const filtered = filterProducts(products, filters);
    return sortProducts(filtered, sortBy);
};
