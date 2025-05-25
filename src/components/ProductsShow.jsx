import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../context/AppContext";
import {
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCTS_SUCCESS,
} from "../context/productsReducer";
import { ADD_TO_CART } from "../context/cartReducer";
import { SHOW_ALERT, HIDE_ALERT } from "../context/alertReducer";
import ProductSrot from "./ProductSrot";

const ProductsShow = () => {
    const { productsState, cartDispatch, fetchProducts, showAlert } =
        useContext(AppContext);

    useEffect(() => {
        if (productsState.products.length === 0) {
            fetchProducts();
        }
    }, []);
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, []);

    if (productsState.loading) {
        return (
            <div className="products-show">
                <Loading />
            </div>
        );
    }

    if (productsState.error) {
        return (
            <div className="products-show">
                <ErrorMessage message={"مشکل در بارگیری محصولات."} />
            </div>
        );
    }
    return (
        <div className="products-order">
            <ProductSrot />
            <div className="products-show">
                {productsState.filteredProducts.length>0 ? productsState.filteredProducts.map((product) => (
                    <div className="product-show-item" key={product.id}>
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <div className="rating">
                            <p>
                                {" "}
                                <b>موجودی</b> : {product.rating.count}
                            </p>
                            <p>
                                {product.rating.rate}
                                <span>
                                    <FontAwesomeIcon icon={faStar} />
                                </span>
                            </p>
                        </div>
                        <h3 className="price">
                            {product.price} <span>دلار</span>
                        </h3>
                        <div className="product-btns">
                            <Link to={`/products/${product.id}`}>
                                جزئیات بیشتر
                            </Link>
                            <button
                                onClick={() => {
                                    cartDispatch({
                                        type: ADD_TO_CART,
                                        payload: { id: product.id, count: 1 },
                                    });
                                    showAlert({
                                        type: "success",
                                        msg: "محصول با موفقیت به سبد اضافه شد. ",
                                    });
                                }}
                            >
                                افزودن به سبد
                            </button>
                        </div>
                    </div>
                )):<div className="container"><b><h1>محصول مورد نظر یافت نشد</h1></b></div>}
            </div>
        </div>
    );
};

export default ProductsShow;
