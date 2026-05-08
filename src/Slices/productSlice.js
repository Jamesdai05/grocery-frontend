import { createSlice } from "@reduxjs/toolkit";

/**
 * Product Slice - Manages UI state for products
 *
 * This slice handles:
 * - Product filters (category, price range, search)
 * - Selected product for detail view/editing
 * - Sort preferences
 * - View mode (grid/list)
 *
 * Note: Product data fetching is handled by React Query
 * This slice only manages UI state and user preferences
 */

const initialState = {
    // Filter state
    filters: {
        category: 'all', // 'all' or specific category name
        priceRange: {
            min: 0,
            max: Infinity
        },
        searchTerm: '',
    },

    // Selected product for detail view or editing
    selectedProduct: null,

    // Sort preferences
    sortBy: 'name', // 'name' | 'price-asc' | 'price-desc' | 'newest'

    // View mode
    viewMode: 'grid', // 'grid' | 'list'
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // Set all filters at once
        setFilters: (state, action) => {
            state.filters = {
                ...state.filters,
                ...action.payload
            };
        },

        // Clear all filters
        clearFilters: (state) => {
            state.filters = {
                category: 'all',
                priceRange: {
                    min: 0,
                    max: Infinity
                },
                searchTerm: '',
            };
        },

        // Set search term
        setSearchTerm: (state, action) => {
            state.filters.searchTerm = action.payload;
        },

        // Set category filter
        setCategoryFilter: (state, action) => {
            state.filters.category = action.payload;
        },

        // Set price range filter
        setPriceRange: (state, action) => {
            state.filters.priceRange = {
                min: action.payload.min || 0,
                max: action.payload.max || Infinity
            };
        },

        // Set selected product (for detail view or editing)
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },

        // Clear selected product
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },

        // Set sort order
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },

        // Set view mode
        setViewMode: (state, action) => {
            state.viewMode = action.payload;
        },

        // Toggle view mode between grid and list
        toggleViewMode: (state) => {
            state.viewMode = state.viewMode === 'grid' ? 'list' : 'grid';
        },

        // Reset all product UI state
        resetProductState: () => {
            return initialState;
        }
    }
});

// Export actions
export const {
    setFilters,
    clearFilters,
    setSearchTerm,
    setCategoryFilter,
    setPriceRange,
    setSelectedProduct,
    clearSelectedProduct,
    setSortBy,
    setViewMode,
    toggleViewMode,
    resetProductState
} = productSlice.actions;

// Selectors
export const selectFilters = (state) => state.product.filters;
export const selectSearchTerm = (state) => state.product.filters.searchTerm;
export const selectCategoryFilter = (state) => state.product.filters.category;
export const selectPriceRange = (state) => state.product.filters.priceRange;
export const selectSelectedProduct = (state) => state.product.selectedProduct;
export const selectSortBy = (state) => state.product.sortBy;
export const selectViewMode = (state) => state.product.viewMode;

// Export reducer
export default productSlice.reducer;

/**
 * USAGE EXAMPLES:
 *
 * 1. In a component - Setting filters:
 * ```javascript
 * import { useDispatch } from 'react-redux';
 * import { setSearchTerm, setCategoryFilter } from '../Slices/productSlice';
 *
 * const SearchBar = () => {
 *   const dispatch = useDispatch();
 *
 *   const handleSearch = (term) => {
 *     dispatch(setSearchTerm(term));
 *   };
 * };
 * ```
 *
 * 2. In a component - Reading state:
 * ```javascript
 * import { useSelector } from 'react-redux';
 * import { selectSearchTerm, selectFilters } from '../Slices/productSlice';
 *
 * const ProductList = () => {
 *   const searchTerm = useSelector(selectSearchTerm);
 *   const filters = useSelector(selectFilters);
 *
 *   // Use with React Query
 *   const { data: products } = useQuery({
 *     queryKey: ['products', filters],
 *     queryFn: () => fetchProducts(filters)
 *   });
 * };
 * ```
 *
 * 3. Filtering products client-side:
 * ```javascript
 * const filteredProducts = products.filter(product => {
 *   const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
 *   const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
 *   const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
 *   return matchesSearch && matchesCategory && matchesPrice;
 * });
 * ```
 */
