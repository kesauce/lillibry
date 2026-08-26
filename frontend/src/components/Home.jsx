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

	// Only one popup (AddMenu or BookDetails) should be open at a time
	const openMenu = (menu) => {
		setSelectedBook(null);
		setActiveMenu(menu);
	};

	const openBook = (book) => {
		setActiveMenu(null);
		setSelectedBook(book);
	};

	return (
		<div className="homepage">
			<Nav activeMenu={activeMenu} setActiveMenu={openMenu} />
			<Shelves shelves={shelves} setSelectedBook={openBook} />
			<AnimatePresence>
				{activeMenu != null && (
					<motion.div
						key="add-backdrop"
						className="backdrop"
						onClick={() => setActiveMenu(null)}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						{activeMenu == "add" && (
							<div
								style={{
									position: "fixed",
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -45%)",
									zIndex: 2,
								}}
								onClick={(e) => e.stopPropagation()}
							>
								<AddMenu
									ref={addMenuRef}
									shelves={shelves}
									onShelfAdded={fetchShelves}
									onBookAdded={fetchShelves}
								/>
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{selectedBook && (
					<motion.div
						key="book-backdrop"
						className="backdrop"
						onClick={() => setSelectedBook(null)}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<div
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
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default Homepage;
