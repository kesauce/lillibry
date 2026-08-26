import { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function BookDetails({ book, shelves, onClose, onShelvesChanged }) {
	const [selectedShelves, setSelectedShelves] = useState([]);
	const animatedComponents = makeAnimated();

	const shelfOptions = shelves.map((shelf) => ({
		value: shelf.name,
		label: shelf.name,
	}));

	// Grab the names of the shelves this book is currently in
	const checkBook = async () => {
		const token = localStorage.getItem("token");

		const res = await fetch(
			`http://localhost:8000/book/check?bookKey=${book.key}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		const data = await res.json();
		if (res.status == 200) {
			const formattedResult = data.shelves.map((shelfName) => ({
				value: shelfName,
				label: shelfName,
			}));
			setSelectedShelves(formattedResult);
		}
	};

	// Recheck which shelves this book is in whenever a different book is selected
	useEffect(() => {
		checkBook();
	}, [book.key]);

	// Handle the shelf change and persist it immediately
	const updateShelves = async (selectedOptions) => {
		const token = localStorage.getItem("token");

		const newSelectedShelves = selectedOptions.map(
			(selectedItem) => selectedItem.value,
		);

		const res = await fetch("http://localhost:8000/book/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				shelves: newSelectedShelves,
				bookKey: book.key,
				title: book.title,
				author: book.author,
				coverID: book.coverID,
				coverURL: book.coverURL,
				publishYear: book.publishYear,
			}),
		});

		if (res.status == 200) {
			setSelectedShelves(selectedOptions);
			onShelvesChanged?.();
		}
	};

	return (
		<div className="bg-yellow-green w-full h-full p-4 rounded-md shadow-lg">
			<button onClick={onClose} className="absolute top-2 right-2">
				<img
					id="close-icon"
					src="../../../src/assets/icons/cancel.svg"
					className="w-7 cursor-pointer"
				/>
			</button>
			<div className="font-radley text-ebony w-200 h-150 flex gap-4">
				{book.coverURL && (
					<img
						src={book.coverURL}
						alt={book.title}
						className="w-1/2 h-auto object-contain"
					/>
				)}
				<div className="flex-1">
					<h1 className="text-4xl font-bold">{book.title}</h1>
					<h1 className="text-xl italic">
						Author: {book.author?.join(", ")}
					</h1>
					{book.publishYear && (
						<h1 className="text-xl italic">
							Published: {book.publishYear}
						</h1>
					)}
					<h1 className="text-xl italic">Shelves: </h1>
					<Select
						onChange={updateShelves}
						closeMenuOnSelect={false}
						components={animatedComponents}
						isMulti
						options={shelfOptions}
						value={selectedShelves}
						placeholder={"Select shelves"}
						theme={(theme) => ({
							...theme,
							colors: {
								...theme.colors,
								primary: "#454d30",
								primary25: "#adc178", // Hover
								neutral10: "#adc178", // Selected option
								neutral0: "#f0ead2", // Background colour
								neutral80: "#454d30", // Selected value text & input text
								neutral60: "#454d30", // Placeholder text
								neutral20: "#454d30", // Border & indicators
							},
						})}
						styles={{
							control: (base, state) => ({
								...base,
								boxShadow: "none", // Removes the glow ring
								borderColor: state.isFocused
									? "#454d30"
									: base.borderColor,
								"&:hover": {
									borderColor: "#454d30",
								},
							}),
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default BookDetails;
