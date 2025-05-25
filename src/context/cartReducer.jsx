export const cartInitialState = {
    cart: [],
};

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const DEC_ITEM_COUNT = "DEC_ITEM_COUNT";
export const CLEAR_CART = "CLEAR_CART";

const addToCart = (cart, id, count = 1) => {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        return cart.map(item =>
            item.id === id
                ? { ...item, count: item.count + count }
                : item
        );
    } else {
        return [...cart, { id, count }];
    }
};

const decItemCount = (cart, id, count = 1) => {
    return cart
        .map(item =>
            item.id === id
                ? { ...item, count: item.count - count }
                : item
        )
        .filter(item => item.count > 0); 
};

const removeFromCart = (cart, id) => {
    return cart.filter(item => item.id !== id);
};

const cartReducer = (state = cartInitialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const { id, count = 1 } = action.payload;
            if (!id) return state; 
            return {
                ...state,
                cart: addToCart(state.cart, id, count),
            };
        }
        case DEC_ITEM_COUNT: {
            const { id, count = 1 } = action.payload;
            if (!id) return state;
            return {
                ...state,
                cart: decItemCount(state.cart, id, count),
            };
        }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: removeFromCart(state.cart, action.payload),
            };
        case CLEAR_CART:
            return {
                ...state,
                cart:[],
            }
        default:
            return state;
    }
};

export default cartReducer;
