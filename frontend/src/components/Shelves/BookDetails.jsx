function BookDetails({ book, onClose }) {
	return (
		<div className="bg-yellow-green w-full h-full p-4 rounded-md shadow-lg">
			<button onClick={onClose} className="absolute top-2 right-2">
				<img
					id="close-icon"
					src="../../../src/assets/icons/cancel.svg"
					className="w-5 cursor-pointer"
				/>
			</button>
			<div className="font-radley text-ebony">
				<h2 className="text-2xl">{book.title}</h2>
				<h2 className="text-xl">Author:{book.author}
				</h2>
			</div>
		</div>
	);
}

export default BookDetails;
