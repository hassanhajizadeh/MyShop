import React, { useContext, useEffect, useRef } from "react";
import { CLOSE_MODAL } from "../context/modalReducer";
import { AppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = () => {
    const { modalState, modalDispatch } = useContext(AppContext);
    const { modalComponent: Component, modalProps } = modalState;
    const modalRef = useRef(null);
    useEffect(() => {
        requestAnimationFrame(() => {
            if (modalRef.current) {
                modalRef.current.style.opacity = "1";
            }
        });
    }, []);
    const closeModal = () => {
        requestAnimationFrame(() => {
            modalRef.current.style.opacity = "0" ;
        });
        setTimeout(() => {
            modalDispatch({ type: CLOSE_MODAL });
        }, 150);
    };

    if (!Component) return null;

    return (
        <div className="modal" ref={modalRef}>
            <div className="modal-close-container">
                <button onClick={closeModal}><FontAwesomeIcon icon={faXmark} size="2xl"/></button>
            </div>
            <Component {...modalProps} />
        </div>
    );
};

export default Modal;
