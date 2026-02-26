import "../styles/Shelves.css";
import Book from "../components/Book.jsx";

function Shelf({name}) {
    return (
        <div className="shelf">
            <div className="shelf-row">
                <Book title="book1" />
            </div>
            <div className="shelf-row">
                <Book title="book2" />
            </div>
            <div className="shelf-row">
                <Book title="book3" />
            </div>
            <h1 className="shelf-name">{name}</h1>
        </div>
    );
}

export default Shelf;
