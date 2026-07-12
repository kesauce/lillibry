import { useEffect } from "react";
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
        <div className="bg-gray-orange pt-8 pb-8 px-8 w-4/5 h-full mx-auto mt-2 mb-4">
            {groupedBooks.map((row, i) => (
                <div key={i} className="bg-gray-brown h-40 mb-4 flex items-end overflow-hidden">
                {row.map( book => (
                    <Book key={book.key} title={book.title} bookKey={book.key} cover={book.cover}/>
                ))}
                </div>
            ))}
            <p className="font-radley p-0 text-3xl text-light-yellow text-center">{name}</p>
        </div>
    );
}

export default Shelf;
