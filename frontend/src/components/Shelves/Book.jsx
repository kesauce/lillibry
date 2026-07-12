import "../../styles/Book.css";

function Book({title, bookKey, cover}) {
    return (
        <div className="flex flex-col items-center justify-end h-36 max-h-36 w-24 mx-1">
            <img
                src={cover}
                alt={title}
                className="max-h-32 w-auto object-contain"
            />
        </div>
    );
}

export default Book;
