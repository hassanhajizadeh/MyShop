import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import NumberInput from "../components/NumberInput";
import { ADD_TO_CART } from "../context/cartReducer";
const SingleProduct = () => {
    const [count, setCount] = useState(1);
    const { productsState, fetchProducts, cartDispatch, showAlert, cartState } =
        useContext(AppContext);
    const { loading, error, products } = productsState;
    const { productId } = useParams();
    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, []);
    const addToCart = (maxCount) => {
        const itemCountInCart = cartState.cart.find((item) => item.id === Number(productId));
        let availCount = maxCount;
        if (itemCountInCart) {
            availCount -= itemCountInCart.count;
        }
        if (count > availCount) {
            showAlert({
                type: "error",
                msg: "مجموع تعداد سفارش شما از این محصول بیش از تعداد موجود میباشد",
            });
        } 
        else {
            cartDispatch({
                type: ADD_TO_CART,
                payload: { id: Number(productId), count: count },
            });
            showAlert({
                type: "success",
                msg: `${count} عدد از این محصول به سبد اضافه شد.`,
            });
            setCount(1);
        }
    };
    const result = products.find((product) => product.id === Number(productId));

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (error) {
        return <div>خطا در دریافت اطلاعات محصول: {error}</div>;
    }

    if (!result) {
        return <div>محصول مورد نظر پیدا نشد.</div>;
    }

    return (
        <div className="single-product">
            <img src={result.image} alt={result.title} />
            <div className="data">
                <h1>{result.title}</h1>
                <p>{result.description}</p>
                <div className="rating">
                    <h3>
                        {result.rating.rate}
                        <FontAwesomeIcon icon={faStar} className="star" />
                    </h3>
                    <h3>موجودی : {result.rating.count}</h3>
                </div>
                <h3>
                    قیمت : {result.price}
                    <span className="crimson-color">دلار</span>
                </h3>
                <div className="purchase">
                    <h3>تعداد ‌: </h3>
                    <NumberInput
                        count={count}
                        setCount={setCount}
                        maxCount={result.rating.count}
                        min="1"
                        max={result.rating.count}
                        showAlert = {showAlert}
                    />
                    <button
                        onClick={() => {
                            addToCart(result.rating.count);
                        }}
                    >
                        افزودن به سبد
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
