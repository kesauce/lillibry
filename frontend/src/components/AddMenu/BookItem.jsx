import { useState, useEffect } from "react";
import "../../styles/Menu.css";
import bookPlaceholder from "../../assets/images/book_placeholder.png";

function BookItem({ title, author, coverID, coverURL }) {
    const [cover, setCover] = useState(bookPlaceholder);

    // Runs once - sets the default to the placeholder and rerenders once it gets the actual image if there is onez
    useEffect(() =>{
        if(!coverID) return;
        setCover(coverURL)
    }, []);

    return (
        <div className="book-item">
            <img
                src={cover}
                onError={(event) => (event.target.src = bookPlaceholder)}
            />
            <p>
                {title} <br /> <span id="author">{author}</span>
            </p>
        </div>
    );
}

export default BookItem;
