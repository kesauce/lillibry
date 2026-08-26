function BookDetails({ book, onClose }) {
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
				<div>
					<h1 className="text-4xl font-bold">{book.title}</h1>
					<h1 className="text-xl italic">
						Author: {book.author?.join(", ")}
					</h1>
					{book.publishYear && (
						<h1 className="text-xl italic">
							Published: {book.publishYear}
						</h1>
					)}
				</div>
			</div>
		</div>
	);
}

export default BookDetails;
