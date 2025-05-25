export const productsInitialState = {
    loading: false,
    products: [],
    filteredProducts: [],
    categories: [],
    error: null,
    sortOption: "",
};
export const FETCH_PRODUCTS_START = "FETCH_PRODUCTS_START";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const SORT_PRODUCTS = "SORT_PRODUCTS";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS"

const filterProducts = (
    products,
    {
        minPrice = 0,
        maxPrice = products.length
            ? Math.max(...products.map((p) => p.price))
            : Infinity,
        category = "all",
        minRating = 0,
    }
) => {
    return products.filter((product) => {
        const inPriceRange =
            product.price >= minPrice && product.price <= maxPrice;
        const inCategory = Array.isArray(category)
            ? category.includes(product.category)
            : category === "all" || product.category === category;
        const hasMinRating = product.rating.rate >= minRating;
        return inPriceRange && inCategory && hasMinRating;
    });
};

const searchProducts = (products, query) => {
    return products.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
};
const productsReducer = (state = productsInitialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_START:
            return { ...state, loading: true };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                categories: [
                    ...new Set(
                        action.payload.map((product) => product.category)
                    ),
                ],
                filteredProducts: action.payload,
            };
        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                loading: false,
                products: [],
                filteredProducts: [],
                error: action.payload,
            };
        case FILTER_PRODUCTS:
            return {
                ...state,
                filteredProducts: filterProducts(
                    state.products,
                    action.payload
                ),
            };

        case SORT_PRODUCTS:{
            let sorted = [...state.filteredProducts];

            if (action.payload === "expensive") {
                sorted.sort((a, b) => b.price - a.price);
            } else if (action.payload === "cheap") {
                sorted.sort((a, b) => a.price - b.price);
            } else if (action.payload === "rated") {
                sorted.sort((a, b) => b.rating.rate - a.rating.rate);
            }

            return {
                ...state,
                sortOption: action.payload,
                filteredProducts: action.payload
                    ? sorted
                    : [...state.filteredProducts],
            };
        }
        case SEARCH_PRODUCTS:{
            const searchQuery = action.payload.toLowerCase();
            const searchResults = searchProducts(state.products , searchQuery);
            return {
                ...state,
                filteredProducts: searchResults,
            }
        }
            

        default:
            return state;
    }
};
export default productsReducer;
