import "../styles/Shelves.css";
import Book from "../components/Book.jsx";

function Shelf() {
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
        </div>
    );
}

export default Shelf;
