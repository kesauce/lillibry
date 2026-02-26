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
                loop={true}
                pagination={{ clickable: true }}
                navigation={true}
                slidesPerView={1}
                centeredSlides={true}
                spaceBetween={24}
            >
                <SwiperSlide>
                    <Shelf />
                </SwiperSlide>
                <SwiperSlide>
                    <Shelf />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Shelves;
