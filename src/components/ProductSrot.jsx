import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { SHOW_MODAL } from "../context/modalReducer";
import Filters from './Filters'
const ProductSort = () => {
    const { productsState, productsDispatch, screenSize ,modalDispatch} =
        useContext(AppContext);
    const sortOption = productsState.sortOption || "";

    const handleChange = (e) => {
        const value = e.target.value;
        if (sortOption !== value) {
            productsDispatch({ type: "SORT_PRODUCTS", payload: value });
        }
    };
    const showFilter = () =>{
        modalDispatch({type:SHOW_MODAL , payload:{component:Filters , props:{}}})
    }

    return (
        <div className="products-show-option">
            {screenSize <= 1250 && <FontAwesomeIcon icon={faSliders} onClick={showFilter} className="filter-icon"/>}
            {screenSize >= 600 ? (
                <b>مرتب‌سازی بر اساس: </b>
            ) : (
                <div className="sort-list">
                    <label htmlFor="sorting">مرتب سازی</label>
                    <select name="sorting" id="sorting" value={sortOption} onChange={handleChange}>
                        <option value="cheap" onClick={handleChange}>ارزان ترین</option>
                        <option value="expensive" onClick={handleChange}>گران ترین</option>
                        <option value="rated" onClick={handleChange}>محبوب ترین</option>
                    </select>
                </div>
            )}
            {screenSize >= 600 && (
                <ul>
                    <li
                        className={
                            sortOption === "expensive" ? "active-option" : ""
                        }
                    >
                        <input
                            type="radio"
                            id="expensive"
                            name="sort"
                            value="expensive"
                            checked={sortOption === "expensive"}
                            onChange={handleChange}
                        />
                        <label htmlFor="expensive">گران‌ترین</label>
                    </li>
                    <li
                        className={
                            sortOption === "cheap" ? "active-option" : ""
                        }
                    >
                        <input
                            type="radio"
                            id="cheapest"
                            name="sort"
                            value="cheap"
                            checked={sortOption === "cheap"}
                            onChange={handleChange}
                        />
                        <label htmlFor="cheapest">ارزان‌ترین</label>
                    </li>
                    <li
                        className={
                            sortOption === "rated" ? "active-option" : ""
                        }
                    >
                        <input
                            type="radio"
                            id="most-rated"
                            name="sort"
                            value="rated"
                            checked={sortOption === "rated"}
                            onChange={handleChange}
                        />
                        <label htmlFor="most-rated">محبوب‌ترین</label>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default ProductSort;
