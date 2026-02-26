import "../styles/Shelves.css";
import Shelf from "../components/Shelf.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Shelves() {
    return (
        <div className="shelves">
            <Swiper
                modules={[Navigation, Pagination]}
                cssMode={true}
                // loop={true}
                pagination={{ clickable: true }}
                navigation={false}
                slidesPerView={1.40}
                centeredSlides={true}
                // spaceBetween={24}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    700: { slidesPerView: 1.4 },
                }}
                slideToClickedSlide={true}
            >
                <SwiperSlide>
                    <Shelf name="Read"/>
                </SwiperSlide>
                <SwiperSlide>
                    <Shelf name="To Read"/>
                </SwiperSlide>
                <SwiperSlide>
                    <Shelf name="Reading"/>
                </SwiperSlide>
                <SwiperSlide>
                    <Shelf name="Dropped"/>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Shelves;
