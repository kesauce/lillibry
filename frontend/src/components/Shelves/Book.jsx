function Book({ title, bookKey, cover, onClick }) {
	return (
		<div
			className="flex flex-col items-center justify-end h-36 max-h-36 mx-2 pb-[10px] transition-transform duration-300 ease-out hover:-translate-y-2 cursor-pointer"
			onClick={onClick}
		>
			<img src={cover} alt={title} className="max-h-32 w-auto object-contain" />
		</div>
	);
}

export default Book;
