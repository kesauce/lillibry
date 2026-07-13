import Book from "./Book.jsx";

function Shelf({ name, books, setSelectedBook}) {
    return (
        <div className="bg-gray-orange pt-8 pb-8 px-4 sm:px-8 w-full sm:w-4/5 h-full mx-auto mt-2 mb-4">
            <div
                className="flex flex-wrap items-end content-start gap-x-1 gap-y-4 p-4 min-h-[30rem] bg-gray-brown"
                // Make a repeating shelf wall background to simulate shelf levels
                style={{
                    backgroundImage:
                        "linear-gradient(to bottom, transparent calc(10rem - 10px), #a98467 calc(10rem - 10px), #a98467 10rem)",
                    backgroundSize: "100% 10rem",
                    backgroundRepeat: "repeat-y",
                }}
            >
                {books.map((book) => (
                    <Book
                        key={book.key}
                        title={book.title}
                        bookKey={book.key}
                        cover={book.cover}
                        onClick={() => setSelectedBook(book)}
                    />
                ))}
            </div>
            <p className="font-radley p-0 text-3xl text-light-yellow text-center mt-4">
                {name}
            </p>
        </div>
    );
}

export default Shelf;