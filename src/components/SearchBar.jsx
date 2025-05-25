import React, { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { SEARCH_PRODUCTS } from "../context/productsReducer";

const SearchBar = ({setSearchFocused , searchFocused=false}) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const { productsState, productsDispatch } = useContext(AppContext);
    const searchInput = useRef(null);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useEffect(()=>{
        if(searchFocused){
            searchInput.current?.focus();
        }
    },[searchFocused])

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        productsDispatch({ type: SEARCH_PRODUCTS, payload: query });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate("/products");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setIsSearchFocused(false);
            searchInput.current?.blur();
            navigate("/products");
        }
    };

    const filteredResults = searchQuery
        ? productsState.products
              .filter(
                  (product) =>
                      product.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                      product.description
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
              )
              .slice(0, 4)
        : [];

    return (
        <div className="search-container">
            <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                    type="text"
                    placeholder="جستجوی انگلیسی محصول ..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => {
                        setTimeout(() => {
                            setIsSearchFocused(false);
                            setSearchFocused(false);
                        }, 200);
                    }}
                    ref={searchInput}
                />
                <button type="submit">
                    <FontAwesomeIcon icon={faSearch} size="xl" />
                </button>
            </form>

            {filteredResults.length > 0 && isSearchFocused && (
                <div className="search-result">
                    {filteredResults.map((item) => (
                        <div
                            className="search-result-item"
                            key={item.id}
                            onClick={() => {
                                navigate(`/products/${item.id}`);
                            }}
                        >
                            <img src={item.image} alt="" />
                            <div>{item.title.slice(0, 30)}...</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
