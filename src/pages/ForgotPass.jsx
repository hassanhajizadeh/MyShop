import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const ForgotPass = () => {
    const { showAlert } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim().length > 0)
            showAlert({
                type: "success",
                msg: "رمز موقت به ایمیل شما ارسال شد ",
            });
        else
            showAlert({
                type: "alert",
                msg: "شما باید ابتدا ایمیل خود را وارد کنید.",
            });
    };
    return (
        <div className="login-container">
            <div className="login">
                <h1>بازیابی رمز عبور</h1>
                <form action="#">
                    <div className="username">
                        <label htmlFor="username">ایمیل / نام کاربری</label>
                        <input
                            type="text"
                            id="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <p>رمز عبور موقت به ایمیل شما ارسال خواهد شد</p>
                </form>
                <input
                    type="submit"
                    value="بازیابی رمز عبور"
                    onClick={(e) => {
                        handleSubmit(e);
                    }}
                />
            </div>
        </div>
    );
};

export default ForgotPass;
