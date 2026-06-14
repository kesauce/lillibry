import "../../styles/Book.css";

function Book({title, bookKey}) {
    return (
        <div className="book">
            <h1>{bookKey}</h1>
        </div>
    );
}

export default Book;
