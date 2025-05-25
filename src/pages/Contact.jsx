import React from "react";

const Contact = () => {
    return (
        <div className="contact">
            <div className="page-header contact-header">
                <h1>تماس با ما</h1>
            </div>
            <div className="contact-container">
                ما همیشه مشتاق شنیدن نظرات، پیشنهادات و سوالات شما هستیم. اگر
                نیاز به راهنمایی دارید یا با مشکلی مواجه شده‌اید، تیم پشتیبانی
                ما آماده پاسخگویی است. می‌توانید از طریق ایمیل یا شماره تماس زیر
                با ما در ارتباط باشید. ما تلاش می‌کنیم در سریع‌ترین زمان ممکن
                پاسخگوی پیام‌های شما باشیم. ساعات کاری: شنبه تا پنج‌شنبه از ساعت
                ۹ صبح تا ۶ عصر (به‌جز روزهای تعطیل رسمی) راه‌های ارتباطی:
                <br />
                <div>
                    <br />
                    تلفن&nbsp;:&nbsp;
                    <a
                        href="tel:+982112345678"
                        dir="ltr"
                        className="crimson-color"
                    >
                        {" "}
                        ۰۲۱-۱۲۳۴۵۶۷۸
                    </a>
                    <br />
                    <br />
                    ایمیل&nbsp;:&nbsp;
                    <a
                        href="mailto:+982112345678"
                        dir="ltr"
                        className="crimson-color contact-email"
                    >
                        example@something.com
                    </a>
                    <br />
                    <br />
                    آدرس&nbsp;:&nbsp;
                    <span className="crimson-color">تهران - خیابان مثال - کوچه مثل - پلاک ۲۰ - طبقه ۳</span>
                </div>
            </div>
        </div>
    );
};

export default Contact;
