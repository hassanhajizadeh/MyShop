import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ Link was missing
import { AppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ADD_TO_CART } from "../context/cartReducer";
import Loading from './Loading'

const TopProducts = () => {
    const { productsState, fetchProducts, cartDispatch, showAlert } = useContext(AppContext);

    useEffect(() => {
        fetchProducts();
    }, []);

    const topProducts = productsState.products.sort((a,b)=> b.rating.rate - a.rating.rate).slice(0, 4); 
    
    return (
        <div className="blog">
            <h1 className="cat-heading">محبوب ترین محصولات</h1>
            <div className="products-show" id="products-show">
                {topProducts.length > 0 ? (
                    topProducts.map((product) => (
                        <div className="product-show-item" key={product.id}>
                            <img src={product.image} alt={product.title} />
                            <h3>{product.title}</h3>
                            <div className="rating">
                                <p>
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
                                            payload: {
                                                id: product.id,
                                                count: 1,
                                            },
                                        });
                                        showAlert({
                                            type: "success",
                                            msg: "محصول با موفقیت به سبد اضافه شد.",
                                        });
                                    }}
                                >
                                    افزودن به سبد
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="container">
                        <h1><b>محصول مورد نظر یافت نشد</b></h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopProducts;
