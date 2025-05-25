import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Alert from "./Alert";
import { AppContext } from "../context/AppContext";
import Modal from "./Modal";
import SearchBar from "./SearchBar";

const SharedLayout = () => {
    const {alertState , modalState,screenSize} = useContext(AppContext);
    const [searchFocused , setSearchFocused] = useState(false);
    return (
        <>
            {modalState.isModalOpen && <Modal Component={modalState.modalComponent}/>}
            {alertState.show && <Alert/>}
            <Navbar setSearchFocused={setSearchFocused}/>
            <div className='navbar-padder'></div>
            {screenSize<1000 && <SearchBar setSearchFocused={setSearchFocused} searchFocused={searchFocused}/>}
            <Outlet />
            <Footer/>
        </>
    );
};

export default SharedLayout;
