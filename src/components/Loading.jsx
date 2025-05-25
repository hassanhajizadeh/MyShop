import React from "react";

const Loading = () => {
    return (
        <div className="center-page-notif loading">
            <div className="wave-container">
                <div className="wave" style={{animationDelay:'.1s'}}></div>
                <div className="wave" style={{animationDelay:'.2s'}}></div>
                <div className="wave" style={{animationDelay:'.3s'}}></div>
                <div className="wave" style={{animationDelay:'.4s'}}></div>
                <div className="wave" style={{animationDelay:'.5s'}}></div>
                <div className="wave" style={{animationDelay:'.6s'}}></div>
            </div>
        </div>
    );
};

export default Loading;
