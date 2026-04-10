import { useEffect } from "react";
import "../../styles/Shelves.css";
import Book from "./Book.jsx";

function Shelf({name, books}) {
    console.log(books);
    // Divide the books into an nested array in groups of 5
    const groupedBooks = [];
    for (let i = 0; i < books.length; i += 5) {
        groupedBooks.push(books.slice(i, i + 5));
    }

    // Pad the rows to 3 - ensures theres a minimum of 3 rows
    while (groupedBooks.length < 3) {
        groupedBooks.push([]);
    }


    return (
        <div className="shelf">
            {groupedBooks.map((row, i) => (
                <div key={i} className="shelf-row">
                {row.map( book => (
                    <Book key={book.key} title={book.title} bookKey={book.key}/>
                ))}
                </div>
            ))}
            <h1 className="shelf-name">{name}</h1>
        </div>
    );
}

export default Shelf;
