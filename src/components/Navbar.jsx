import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import {
    faArrowRightToBracket,
    faShoePrints,
    faBars,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../context/AppContext";
import SearchBar from "./SearchBar";
import NavMenu from "./NavMenu";
import { SHOW_MODAL, CLOSE_MODAL } from "../context/modalReducer";

function Navbar({setSearchFocused}) {
    const { cartState, screenSize, modalDispatch } = useContext(AppContext);
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            if (Math.abs(window.scrollY - lastScrollY) > 100) {
                const currentScrollY = window.scrollY;
                setIsScrollingUp(
                    currentScrollY < lastScrollY || currentScrollY < 100
                );
                setLastScrollY(currentScrollY);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const openMenu = () => {
        modalDispatch({
            type: SHOW_MODAL,
            payload: { component: NavMenu, props: {} },
        });
    };
    return (
        <nav className="navbar">
            <div className="nav-top">
                {screenSize < 1000 && (
                    <div className="menu-and-login-container">
                        <FontAwesomeIcon
                            icon={faBars}
                            size="xl"
                            onClick={openMenu}
                            className="menu-icon"
                        />
                        <Link to="login">
                            <div className="login-icon">
                                <FontAwesomeIcon
                                    icon={faArrowRightToBracket}
                                    flip="horizontal"
                                    size="lg"
                                />
                                {screenSize >= 600 && <p>ورود / ثبت نام</p>}
                            </div>
                        </Link>
                    </div>
                )}

                <Link to="/">
                    {screenSize > 600 && (
                        <FontAwesomeIcon
                            icon={faShoePrints}
                            size="xl"
                            rotation={270}
                        />
                    )}
                    <h1 className="logo">بازارچی</h1>
                </Link>
                {screenSize >= 1000 && <SearchBar setSearchFocused={setSearchFocused} />}
                <div className="cart-and-search-container">
                    {screenSize < 1000 ? (
                        <FontAwesomeIcon icon={faSearch} size="lg" className="search-icon" onClick={()=>{window.scrollTo({top:0}); setSearchFocused(true);}}/>
                    ) : (
                        <Link to="login">
                            <div className="login-icon">
                                <FontAwesomeIcon
                                    icon={faArrowRightToBracket}
                                    flip="horizontal"
                                    size="lg"
                                />
                                {screenSize >= 600 && <p>ورود / ثبت نام</p>}
                            </div>
                        </Link>
                    )}
                    <Link to="cart">
                        <FontAwesomeIcon
                            className="cart-icon"
                            icon={faCartShopping}
                            size="lg"
                        />
                        <div className="cart-count">
                            {cartState.cart.reduce(
                                (sum, item) => sum + item.count,
                                0
                            )}
                        </div>
                    </Link>
                </div>
            </div>
            {screenSize >= 1000 ? (
                <div
                    className={`nav-bottom ${
                        isScrollingUp ? "nav-menu-show" : "nav-menu-hide"
                    }`}
                >
                    <NavMenu />
                </div>
            ) : null}
        </nav>
    );
}

export default Navbar;
