import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faStore,
    faNewspaper,
    faPhone,
    faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../context/AppContext";
import {CLOSE_MODAL} from '../context/modalReducer'
const NavMenu = () => {
    const {modalDispatch} = useContext(AppContext);
    return (
        <div className='nav-menu'>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "active-navlink" : "navlink"
                }
                onClick={()=>{modalDispatch({type:CLOSE_MODAL})}}
            >
                <FontAwesomeIcon
                    className="navlink-icon"
                    icon={faHome}
                    
                ></FontAwesomeIcon>
                خانه
            </NavLink>
            <NavLink
                to="products"
                className={({ isActive }) =>
                    isActive ? "active-navlink" : "navlink"
                }
                onClick={()=>{modalDispatch({type:CLOSE_MODAL})}}
            >
                <FontAwesomeIcon
                    className="navlink-icon"
                    icon={faStore}
                ></FontAwesomeIcon>
                محصولات
            </NavLink>
            <NavLink
                to="blog"
                className={({ isActive }) =>
                    isActive ? "active-navlink" : "navlink"
                }
                onClick={()=>{modalDispatch({type:CLOSE_MODAL})}}

            >
                <FontAwesomeIcon
                    className="navlink-icon"
                    icon={faNewspaper}
                ></FontAwesomeIcon>
                مقالات
            </NavLink>
            <NavLink
                to="about"
                className={({ isActive }) =>
                    isActive ? "active-navlink" : "navlink"
                }
                onClick={()=>{modalDispatch({type:CLOSE_MODAL})}}

            >
                <FontAwesomeIcon
                    className="navlink-icon"
                    icon={faAddressCard}
                ></FontAwesomeIcon>
                درباره ما
            </NavLink>
            <NavLink
                to="contact"
                className={({ isActive }) =>
                    isActive ? "active-navlink" : "navlink"
                }
                onClick={()=>{modalDispatch({type:CLOSE_MODAL})}}

            >
                <FontAwesomeIcon
                    className="navlink-icon"
                    icon={faPhone}
                    flip="horizontal"
                ></FontAwesomeIcon>
                تماس با ما
            </NavLink>
        </div>
    );
};

export default NavMenu;
