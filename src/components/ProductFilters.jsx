import { useDispatch, useSelector } from "react-redux";
import {
    setSearchTerm,
    setCategoryFilter,
    setSortBy,
    clearFilters,
    toggleViewMode,
    selectFilters,
    selectSortBy,
    selectViewMode,
} from "../Slices/productSlice";
import { selectHasActiveFilters } from "../store/productSelectors";

/**
 * ProductFilters Component
 *
 * Example component demonstrating how to use the product slice
 * for filtering, sorting, and view mode management
 */
const ProductFilters = () => {
    const dispatch = useDispatch();

    // Get state from Redux
    const filters = useSelector(selectFilters);
    const sortBy = useSelector(selectSortBy);
    const viewMode = useSelector(selectViewMode);
    const hasActiveFilters = useSelector(selectHasActiveFilters);

    return (
        <div className="product-filters p-4 bg-gray-100 rounded-lg mb-4">
            <div className="flex flex-wrap gap-4 items-center">
                {/* Search Input */}
                <div className="flex-1 min-w-[200px]">
                    <input
                        type="text"
                        value={filters.searchTerm}
                        onChange={(e) =>
                            dispatch(setSearchTerm(e.target.value))
                        }
                        placeholder="Search products..."
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Category Filter */}
                <div>
                    <select
                        value={filters.category}
                        onChange={(e) =>
                            dispatch(setCategoryFilter(e.target.value))
                        }
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Categories</option>
                        <option value="fruits">Fruits</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="dairy">Dairy</option>
                        <option value="bakery">Bakery</option>
                        <option value="meat">Meat</option>
                    </select>
                </div>

                {/* Sort Dropdown */}
                <div>
                    <select
                        value={sortBy}
                        onChange={(e) => dispatch(setSortBy(e.target.value))}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="name">Name (A-Z)</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="newest">Newest First</option>
                    </select>
                </div>

                {/* View Mode Toggle */}
                <button
                    onClick={() => dispatch(toggleViewMode())}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    title={`Switch to ${
                        viewMode === "grid" ? "list" : "grid"
                    } view`}
                >
                    {viewMode === "grid" ? "📋 List" : "📱 Grid"}
                </button>

                {/* Clear Filters Button */}
                {hasActiveFilters && (
                    <button
                        onClick={() => dispatch(clearFilters())}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-sm text-gray-600">
                        Active filters:
                    </span>

                    {filters.searchTerm && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            Search: "{filters.searchTerm}"
                        </span>
                    )}

                    {filters.category !== "all" && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            Category: {filters.category}
                        </span>
                    )}

                    {(filters.priceRange.min > 0 ||
                        filters.priceRange.max !== Infinity) && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            Price: ${filters.priceRange.min} - $
                            {filters.priceRange.max === Infinity
                                ? "∞"
                                : filters.priceRange.max}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductFilters;
