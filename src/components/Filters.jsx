import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../context/AppContext";
import { FILTER_PRODUCTS, SORT_PRODUCTS } from "../context/productsReducer";
import { CLOSE_MODAL } from "../context/modalReducer";
const Filters = () => {
    const { productsState, productsDispatch,modalDispatch } = useContext(AppContext);

    const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(false);
    const [isCategoryDropOpen, setIsCategoryDropOpen] = useState(false);
    const [isRatingOpen, setIsRatingOpen] = useState(false);

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [category, setCategory] = useState([]);
    const [rate, setRate] = useState(0);

    const handleFilter = () => {
        productsDispatch({
            type: FILTER_PRODUCTS,
            payload: {
                minPrice: Number(minPrice) || 0,
                maxPrice: maxPrice !== "" ? Number(maxPrice) : Infinity,
                category: category.length > 0 ? category : "all",
                minRating: rate || 0,
            },
        });

        productsDispatch({
            type: SORT_PRODUCTS,
            payload: "",  
        });
        modalDispatch({type:CLOSE_MODAL})
    };

    return (
        <div className="products-filter">
            <h1>فیلتر ها</h1>

            <h2>
                محدوده قیمت
                <button
                    className={isPriceRangeOpen ? "rotate-down" : "rotate-up"}
                    onClick={() => setIsPriceRangeOpen(!isPriceRangeOpen)}
                >
                    <FontAwesomeIcon icon={faCircleChevronDown} size="2xl" />
                </button>
            </h2>
            <div className={isPriceRangeOpen ? "price-filter show" : "price-filter hide"}>
                <div className="min-price">
                    <label htmlFor="min-price">حداقل قیمت</label>
                    <div className="min-price-input">
                        <input
                            type="number"
                            id="min-price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        دلار
                    </div>
                </div>
                <div className="max-price">
                    <label htmlFor="max-price">حداکثر قیمت</label>
                    <div className="max-price-input">
                        <input
                            type="number"
                            id="max-price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                        دلار
                    </div>
                </div>
            </div>

            <div className="category-filter">
                <h2>
                    دسته ها
                    <button
                        className={isCategoryDropOpen ? "rotate-down" : "rotate-up"}
                        onClick={() => setIsCategoryDropOpen(!isCategoryDropOpen)}
                    >
                        <FontAwesomeIcon icon={faCircleChevronDown} size="2xl" />
                    </button>
                </h2>
                <ul className={isCategoryDropOpen ? "category-filter-options show" : "category-filter-options hide"}>
                    {productsState.categories.map((cate, idx) => (
                        <li key={idx}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={category.includes(cate)}
                                    onChange={() => {
                                        if (category.includes(cate)) {
                                            setCategory(category.filter((c) => c !== cate));
                                        } else {
                                            setCategory([...category, cate]);
                                        }
                                    }}
                                />
                                {cate}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="rating-filter">
                <h2>
                    امتیاز محصول
                    <button
                        className={isRatingOpen ? "rotate-down" : "rotate-up"}
                        onClick={() => setIsRatingOpen(!isRatingOpen)}
                    >
                        <FontAwesomeIcon icon={faCircleChevronDown} size="2xl" />
                    </button>
                </h2>
                <ul className={isRatingOpen ? "rating-filter-options show" : "rating-filter-options hide"}>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <li key={value}>
                            <label className="custom-checkbox">
                                <input
                                    type="checkbox"
                                    checked={rate === value}
                                    onChange={() => setRate(rate === value ? 0 : value)}
                                />
                                <span className="checkmark"></span>
                                {value === 5 ? "امتیاز کامل" : `امتیاز بیش از ${value}`}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={handleFilter}>اعمال فیلتر</button>
        </div>
    );
};

export default Filters;
