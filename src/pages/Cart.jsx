import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import {
    ADD_TO_CART,
    DEC_ITEM_COUNT,
    REMOVE_FROM_CART,
    CLEAR_CART,
} from "../context/cartReducer";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
    const {
        cartState,
        cartDispatch,
        productsState,
        fetchProducts,
        screenSize,
        showAlert,
        showConfirm,
    } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, [cartState.cart]);

    const cartItems = cartState.cart
        .map((item) => {
            const product = productsState.products.find(
                (p) => p.id === item.id
            );
            return product ? { ...product, count: item.count } : null;
        })
        .filter(Boolean);

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + Number(item.price) * item.count,
        0
    );

    const increaseCount = (id) => {
        const product = productsState.products.find((p) => p.id === id);
        const itemInCart = cartState.cart.find((item) => item.id === id);
        const currentCount = itemInCart?.count || 0;

        if (product && currentCount < product.rating.count) {
            cartDispatch({ type: ADD_TO_CART, payload: { id, count: 1 } });
        } else {
            showAlert({
                type: "error",
                msg: "موجودی کافی برای افزودن بیشتر این محصول وجود ندارد.",
            });
        }
    };

    const decreaseCount = async (id) => {
        const item = cartState.cart.find((item) => item.id === id);

        if (item && item.count === 1) {
            const confirmed = await showConfirm({
                type: "alert",
                msg: "آیا از حذف این محصول مطمئن هستید؟",
            });
            if (!confirmed) return;
        }

        cartDispatch({ type: DEC_ITEM_COUNT, payload: { id, count: 1 } });
    };

    const finilizeShopping = () => {
        showAlert({
            type: "alert",
            msg: "برای ثبت خرید ابتدا باید وارد حساب کاربری خود شوید",
        });
    };

    return (
        <div className="cart">
            <h1>سبد خرید</h1>
            {cartItems.length > 0 ? (
                <div className="cart-container">
                    {cartItems.map((item) => {
                        return (
                            <div className="cart-item" key={item.id}>
                                <div>
                                    <h4 className="price">
                                        {(
                                            Number(item.price) *
                                            Number(item.count)
                                        ).toFixed(2)}
                                        <span className="crimson-color">
                                            دلار
                                        </span>
                                    </h4>

                                    <div className="number-input cart-number-input">
                                        {screenSize > 1000 && <h4>تعداد :</h4>}
                                        <button
                                            className="inc"
                                            onClick={() =>
                                                increaseCount(item.id)
                                            }
                                        >
                                            +
                                        </button>
                                        <input
                                            type="number"
                                            value={item.count}
                                            disabled
                                        />
                                        <button
                                            onClick={() =>
                                                decreaseCount(
                                                    item.id,
                                                    item.count
                                                )
                                            }
                                        >
                                            -
                                        </button>
                                    </div>
                                </div>
                                <div
                                    onClick={() => {
                                        navigate(`/products/${item.id}`);
                                    }}
                                >
                                    <h3>{item.title}</h3>
                                    <img src={item.image} alt="order image" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div>سبد خرید شما خالی است </div>
            )}
            <div className="total">
                <h3 className="total-price">
                    مجموع قیمت :‌ {totalPrice.toFixed(2)}
                    <span className="crimson-color">دلار</span>
                </h3>
                <button className="finalize-btn" onClick={finilizeShopping}>
                    ثبت خرید
                </button>
            </div>
        </div>
    );
};

export default Cart;
