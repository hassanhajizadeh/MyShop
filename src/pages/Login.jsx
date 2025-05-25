import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Login = () => {
    const { showAlert } = useContext(AppContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [email, setEmail] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.trim().length <= 0 || email.trim().length <= 0) {
            showAlert({
                type: "error",
                msg: "شما باید تمام فیلد ها را پر کنید.",
            });
            return;

        }
        if (isRegister) {
            if (password !== rePassword) {
                showAlert({
                    type: "error",
                    msg: "تکرار رمز عبور شما اشتباه است",
                });
            } else {
                showAlert({
                    type: "success",
                    msg: "تاییدیه ثبت نام به اییل شما ارسال خواهد شد",
                });
            }
        } else {
            showAlert({
                type: "alert",
                msg: "این وبسایت تنها یک نمونه اولیه است . و حاوی api ای برای مدیریت درخواست ورود نمیباشد.",
            });
        }
    };
    return (
        <div className="login-container">
            <div className="login">
                <h1>صفحه {isRegister ? <>ثبت نام</> : <>ورود</>}</h1>
                <form action="#">
                    <div className="username">
                        <label htmlFor="username">ایمیل / نام کاربری</label>
                        <input
                            type="text"
                            id="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="password">
                        <label htmlFor="password">رمز عبور</label>
                        <section>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <FontAwesomeIcon icon={faEye} />
                                ) : (
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                )}
                            </span>
                        </section>
                    </div>
                    {isRegister && (
                        <div className="password">
                            <label htmlFor="repassword">تکرار رمز عبور</label>
                            <section>
                                <input
                                    type={showRePassword ? "text" : "password"}
                                    id="repassword"
                                    value={rePassword}
                                    onChange={(e) =>
                                        setRePassword(e.target.value)
                                    }
                                />
                                <span
                                    onClick={() =>
                                        setShowRePassword(!showRePassword)
                                    }
                                >
                                    {showRePassword ? (
                                        <FontAwesomeIcon icon={faEye} />
                                    ) : (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    )}
                                </span>
                            </section>
                        </div>
                    )}
                </form>
                <input
                    type="submit"
                    value={isRegister ? "ثبت نام" : "وارد شوید"}
                    onClick={(e) => handleSubmit(e)}
                />
                <div>
                    {isRegister ? (
                        <p>
                            اکانت دارید ؟{" "}
                            <span
                                className="crimson-color"
                                onClick={() => setIsRegister(!isRegister)}
                            >
                                وارد شوید
                            </span>
                        </p>
                    ) : (
                        <p>
                            اکانت ندارید ؟{" "}
                            <span
                                className="crimson-color"
                                onClick={() => setIsRegister(!isRegister)}
                            >
                                ساخت اکانت
                            </span>
                        </p>
                    )}
                    <p>
                        رمز خود را فراموش کرده اید ؟‌{" "}
                        <Link to="/reset-password" className="crimson-color">
                            فراموشی رمز عبور
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
