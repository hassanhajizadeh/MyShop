import React, { useContext, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTriangleExclamation,
    faCircleExclamation,
    faThumbsUp,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { AppContext } from "../context/AppContext";
import {
    HIDE_ALERT,
    CONFIRM_ALERT,
    CANCEL_ALERT,
} from "../context/alertReducer";

const Alert = () => {
    const { alertState, alertDispatch } = useContext(AppContext);
    const { type, message, isConfirm } = alertState;

    const alertRef = useRef(null);
    const progressRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        // Animate in
        requestAnimationFrame(() => {
            if (alertRef.current) {
                alertRef.current.style.transform =
                    "translateX(-50%) translateY(1em)";
            }
        });

        if (!isConfirm) {
            // Auto-dismiss alert
            timerRef.current = setTimeout(() => {
                hideAlert();
            }, 3000);

            return () => clearTimeout(timerRef.current);
        }

        // If it's a confirm alert, pause progress (even if hidden)
        if (progressRef.current) {
            progressRef.current.style.animationPlayState = "paused";
        }
    }, []);

    const hideAlert = () => {
        if (alertRef.current) {
            alertRef.current.style.transform =
                "translateX(-50%) translateY(calc(-100% - 4em))";
        }
        setTimeout(() => {
            alertDispatch({ type: HIDE_ALERT });
        }, 500);
    };

    const closeAlert = () => {
        clearTimeout(timerRef.current);
        hideAlert();
    };

    const pauseAlert = () => {
        clearTimeout(timerRef.current);
        if (progressRef.current) {
            progressRef.current.style.animationPlayState = "paused";
        }
    };

    const resumeAlert = () => {
        timerRef.current = setTimeout(() => {
            hideAlert();
        }, 2000);
        if (progressRef.current) {
            progressRef.current.style.animationPlayState = "running";
        }
    };

    const handleConfirm = () => {
        alertDispatch({ type: CONFIRM_ALERT });
    };

    const handleCancel = () => {
        alertDispatch({ type: CANCEL_ALERT });
    };

    return (
        <div
            className="alert"
            ref={alertRef}
            onMouseEnter={!isConfirm ? pauseAlert : undefined}
            onMouseLeave={!isConfirm ? resumeAlert : undefined}
        >
            <div className="content">
                {!isConfirm && (
                    <div className="close-alert" onClick={closeAlert}>
                        <FontAwesomeIcon icon={faXmark} size="lg" />
                    </div>
                )}

                <div className="msg-type-icon">
                    {type === "error" && (
                        <FontAwesomeIcon
                            icon={faTriangleExclamation}
                            color="red"
                            size="lg"
                        />
                    )}
                    {type === "success" && (
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            color="green"
                            size="lg"
                        />
                    )}
                    {type === "alert" && (
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                            color="orange"
                            size="lg"
                        />
                    )}
                </div>

                <div className="msg">{message}</div>
            </div>

            {isConfirm && (
                <div className="btns">
                    <button onClick={handleCancel}>لغو</button>
                    <button onClick={handleConfirm}>ادامه</button>
                </div>
            )}
            {!isConfirm && (
                <div className="progress-bar">
                    <div className="progress-fill" ref={progressRef}></div>
                </div>
            )}
        </div>
    );
};

export default Alert;
