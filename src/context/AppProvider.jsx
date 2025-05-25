import React, { useReducer, useEffect, useState } from "react";
import { AppContext } from "./AppContext";

import productsReducer, {
    productsInitialState,
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
} from "./productsReducer";

import cartReducer, { cartInitialState } from "./cartReducer";

import blogReducer, {
    blogInitialState,
    FETCH_BLOG_START,
    FETCH_BLOG_SUCCESS,
    FETCH_BLOG_ERROR,
} from "./blogReducer";

import alertReducer, {
    alertInitialState,
    SHOW_ALERT,
    HIDE_ALERT,
    SHOW_CONFIRM_ALERT,
} from "./alertReducer";

import modalReducer,{
    modalInitialState,
} from "./modalReducer";

import blog_data from "../assets/blogs.json";

export const AppProvider = ({ children }) => {
    const [productsState, productsDispatch] = useReducer(
        productsReducer,
        productsInitialState
    );
    const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState);
    const [blogState, blogDispatch] = useReducer(blogReducer, blogInitialState);
    const [alertState, alertDispatch] = useReducer(
        alertReducer,
        alertInitialState
    );
    const [modalState , modalDispatch] = useReducer(modalReducer , modalInitialState)

    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [confirmResolver, setConfirmResolver] = useState(null);

    // ---------- PRODUCTS ----------
    const fetchProducts = async () => {
        productsDispatch({ type: FETCH_PRODUCTS_START });
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            if (!response.ok) {
                throw new Error("امکان دریافت اطلاعات وجود ندارد");
            }
            const data = await response.json();
            productsDispatch({
                type: FETCH_PRODUCTS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            productsDispatch({
                type: FETCH_PRODUCTS_ERROR,
                payload: error.message,
            });
        }
    };

    // ---------- BLOG ----------
    const fetchBlog = () => {
        blogDispatch({ type: FETCH_BLOG_START });
        try {
            blogDispatch({ type: FETCH_BLOG_SUCCESS, payload: blog_data });
        } catch (error) {
            blogDispatch({ type: FETCH_BLOG_ERROR, payload: error.message });
        }
    };

    // ---------- ALERTS ----------
    const showAlert = ({ type, msg, confirm = false }) => {
        alertDispatch({ type: HIDE_ALERT });
        setTimeout(() => {
            alertDispatch({
                type: confirm ? SHOW_CONFIRM_ALERT : SHOW_ALERT,
                payload: { type, msg },
            });
        }, 100);
    };

    const showConfirm = ({ type, msg }) => {
        return new Promise((resolve) => {
            setConfirmResolver(() => resolve);
            alertDispatch({
                type: SHOW_CONFIRM_ALERT,
                payload: { type, msg },
            });
        });
    };

    useEffect(() => {
        if (alertState.confirmed && confirmResolver) {
            confirmResolver(true);
            setConfirmResolver(null);
        }
        if (alertState.canceled && confirmResolver) {
            confirmResolver(false);
            setConfirmResolver(null);
        }
    }, [alertState.confirmed, alertState.canceled]);

    // ---------- WINDOW RESIZE ----------
    const handleResize = () => {
        setScreenSize(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => removeEventListener("resize", handleResize);
    }, []);

    return (
        <AppContext.Provider
            value={{
                productsState,
                productsDispatch,
                cartState,
                cartDispatch,
                blogState,
                blogDispatch,
                alertState,
                alertDispatch,
                fetchProducts,
                fetchBlog,
                showAlert,
                showConfirm,
                screenSize,
                modalState,
                modalDispatch
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
