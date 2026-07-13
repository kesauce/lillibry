import "../../styles/Swiper.css";
import Shelf from "./Shelf.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Shelves({ shelves, setSelectedBook }) {
	return (
		<div className="shelves h-4/5 flex justify-center items-center">
			<Swiper
				modules={[Navigation, Pagination]}
				cssMode={true}
				// loop={true}
				pagination={{ clickable: true }}
				navigation={false}
				slidesPerView={1.4}
				centeredSlides={true}
				// spaceBetween={24}
				breakpoints={{
					0: { slidesPerView: 1 },
					700: { slidesPerView: 1.4 },
				}}
				slideToClickedSlide={true}
			>
				{shelves.map((shelf, i) => (
					<SwiperSlide key={i}>
						<Shelf
							name={shelf.name}
							books={shelf.books}
							setSelectedBook={setSelectedBook}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

export default Shelves;
