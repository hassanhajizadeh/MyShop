import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FILTER_PRODUCTS } from "../context/productsReducer";
const Categories = () => {
    const { productsState, fetchProducts, productsDispatch } =
        useContext(AppContext);

    useEffect(() => {
        fetchProducts();
    }, []);
    const handleFilter = (cat) => {
        productsDispatch({
            type: FILTER_PRODUCTS,
            payload: {
                minPrice: 0,
                maxPrice: Infinity,
                category: cat,
                minRating: 0,
            },
        });
    };

    return (
        <>
            <h1 className="cat-heading">دسته بندی ها</h1>
            <div className="categories">
                {productsState.categories.map((item, index) => {
                    return (
                        <Link
                            to="/products"
                            key={index}
                            onClick={() => {
                                handleFilter(item);
                            }}
                        >
                            <div className="category-border">
                                <div className="category-item">{item}</div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default Categories;
