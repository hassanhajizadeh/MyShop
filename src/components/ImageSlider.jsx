import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import image0 from "../assets/sliderImg0.jpg";
import image1 from "../assets/sliderImg1.jpg";
import image2 from "../assets/sliderImg2.jpg";
import image3 from "../assets/sliderImg3.jpg";
import { useNavigate } from "react-router-dom";

const ImageSlider = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);

    const images = [
        { img: image0, caption: "لباس های چرم با طرح نوین" },
        { img: image1, caption: "لباس های ست برای زوج ها" },
        { img: image2, caption: "کیف های چرم اصل با ضمانت" },
        { img: image3, caption: "لباس های مردانه کلاسیک" },
    ];

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
            {images.map((item, index) => (
                <SwiperSlide key={index} className="swiper-slider">
                    <img
                        className="slider-img"
                        src={item.img}
                        crossOrigin="anonymous"
                        alt={`Slide ${index + 1}`}
                    />
                    <div className="slider-data">
                        <div
                            className={`caption ${
                                index === activeIndex ? "animate-caption" : ""
                            }`}
                        >
                            {item.caption}
                        </div>
                        <button
                            className={`finalize-btn ${
                                index === activeIndex ? "animate-button" : ""
                            }`}
                            onClick={()=>{navigate('/products')}}
                        >
                            مشاهده محصولات
                        </button>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ImageSlider;
