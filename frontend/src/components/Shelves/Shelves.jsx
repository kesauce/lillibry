import "../../styles/Shelves.css";
import Shelf from "./Shelf.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

function Shelves() {
    const [shelves, setShelves] = useState([]);

    const fetchShelves = async () => {
        // Make the fetch
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/shelf/find", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.status == 200){
            //Extract the response
            const body = await res.json();
            console.log(body);
            setShelves(body.data);
        }
    };

    // Fetch the shelves once
    useEffect(() => {
        fetchShelves();
    }, []);

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
                
                    {
                        shelves.map((shelf, i) => (
                            <SwiperSlide key={i}>
                                <Shelf name={shelf.name}/>
                            </SwiperSlide>
                        ))
                    }
                
            </Swiper>
        </div>
    );
}

export default Shelves;
