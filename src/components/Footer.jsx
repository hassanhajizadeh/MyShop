import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTruckFast,
    faCreditCard,
    faClock,
    faCircleCheck,
    faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import {
    faInstagram,
    faXTwitter,
    faTelegram,
    faFacebook,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { AppContext } from "../context/AppContext";
const Footer = () => {
    const {screenSize,productsState,fetchProducts} = useContext(AppContext);
    useEffect(()=>{
        fetchProducts();
    },[])
    return (
        <footer>
            <ul className="warranty-list">
                <li>
                    <FontAwesomeIcon
                        color="crimson"
                        size="2xl"
                        icon={faCircleCheck}
                    />
                    ضمانت اصل بودن کالا
                </li>
                <li>
                    <FontAwesomeIcon
                        color="crimson"
                        size="2xl"
                        icon={faCreditCard}
                    />
                    پرداخت درب محل
                </li>
                <li>
                    <FontAwesomeIcon
                        color="crimson"
                        size="2xl"
                        icon={faTruckFast}
                    />
                    ارسال سریع
                </li>
                <li>
                    <FontAwesomeIcon
                        color="crimson"
                        size="2xl"
                        icon={faClock}
                    />
                    بازگشت کالا تا ۷ روز
                </li>
            </ul>
            <div className="social-media-list">
                <h1>ما را در شبکه های اجتماعی دنبال کنید</h1>
                <ul>
                    <li>
                        <Link to="/">
                            <FontAwesomeIcon icon={faInstagram} size="2xl" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <FontAwesomeIcon icon={faTelegram} size="2xl" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <FontAwesomeIcon icon={faXTwitter} size="2xl" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <FontAwesomeIcon icon={faFacebook} size="2xl" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <FontAwesomeIcon icon={faLinkedin} size="2xl" />
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="footer-lists">
                <ul className="footer-list">
                    <h2>دسترسی سریع</h2>
                    <li>
                        <Link to="/">خانه</Link>
                    </li>
                    <li>
                        <Link to="/products">محصولات</Link>
                    </li>
                    <li>
                        <Link to="/blog">مقالات</Link>
                    </li>
                    <li>
                        <Link to="/about">دریاره ما</Link>
                    </li>
                    <li>
                        <Link to="/contact">تماس با ما</Link>
                    </li>
                </ul>
                <ul className="footer-list">
                    <h2>محبوب ترین ها</h2>
                    {productsState.products.sort((a,b)=> b.rating.rate - a.rating.rate).slice(0,4).map(product=>{
                        return <Link to={`/products/${product.id}`} key={product.id}>...{product.title.slice(0,20)}</Link>
                    })}
                </ul>
                <ul className="footer-list">
                    <h2>ارزان ترین ها</h2>
                    {productsState.products.sort((a,b)=> a.price - b.price).slice(0,4).map(product=>{
                        return <Link to={`/products/${product.id}`} key={product.id}>...{product.title.slice(0,15)}</Link>
                    })}
                </ul>
                <div className="send-your-email">
                    ایمیل خود را به ما ارسال کنید تا از جدیدترین تحفیف ها آگاه
                    شوید
                    <div className="your-email-input">
                        <input type="email" spellCheck="false" placeholder="ایمیل خود را وارد کنید ..." />
                        {screenSize>400?<button>ارسال</button>:<button><FontAwesomeIcon icon={faPaperPlane} flip="horizontal"/></button>}
                    </div>
                </div>
            </div>
            <div className="copy-right">
                &copy;{new Date().getFullYear()} کلیه حقوق مادی و معنوی محفوظ
                است .
            </div>
        </footer>
    );
};

export default Footer;
