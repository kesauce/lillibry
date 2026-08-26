import Shelves from "./Shelves/Shelves.jsx";
import Nav from "../components/Nav.jsx";
import "../styles/Nav.css";
import AddMenu from "./AddMenu/AddMenu.jsx";
import { useEffect, useRef, useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import BookDetails from "./Shelves/BookDetails.jsx";

function Homepage() {
	const [activeMenu, setActiveMenu] = useState(null);
	const [selectedBook, setSelectedBook] = useState(null);
	const addMenuRef = useRef(null);

	const [shelves, setShelves] = useState([]);

	const fetchShelves = async () => {
		// Make the fetch
		const token = localStorage.getItem("token");
		const res = await fetch("http://localhost:8000/shelf/find", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.status == 200) {
			//Extract the response
			const body = await res.json();
			setShelves(body.data);
		}
	};

	// Fetch the shelves once
	useEffect(() => {
		fetchShelves();
	}, []);

	return (
		<div className="homepage">
			<Nav activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
			<Shelves shelves={shelves} setSelectedBook={setSelectedBook} />
			<AnimatePresence>
				{" "}
				{/* Needs to watch its children for it to work */}
				{activeMenu == null ? null : (
					<div className="backdrop">
						{activeMenu == "add" ? (
							<motion.div
								key="modal"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{
									duration: 0.2,
								}}
								style={{
									position: "fixed",
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -45%)",
									zIndex: 2,
								}}
							>
								<AddMenu
									ref={addMenuRef}
									shelves={shelves}
									onShelfAdded={fetchShelves}
									onBookAdded={fetchShelves}
								/>
							</motion.div>
						) : null}
					</div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{selectedBook && (
					<div className="backdrop" onClick={() => setSelectedBook(null)}>
						<motion.div
							key="book-modal"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							style={{
								position: "fixed",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -45%)",
								zIndex: 2,
							}}
							onClick={(e) => e.stopPropagation()}
						>
							<BookDetails
								book={selectedBook}
								shelves={shelves}
								onClose={() => setSelectedBook(null)}
								onShelvesChanged={fetchShelves}
							/>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default Homepage;
