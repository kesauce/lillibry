import "../../styles/Menu.css";
import { useState } from "react";

function FindBook() {
    const handleSearch = async (e) => {
        // Prevent the page from refreshing onsubmit
        e.preventDefault();

        // Make the fetch
        const res = await fetch("http://localhost:8000/book/find", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        //Extract the response
        const data = await res.json();
    };

    return (
        <div className="find-book">
            <h1>Find A Book</h1>
            <form>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter book title or author"
                    onChange={(event) => {}}
                />
            </form>

            <div className="book-list">book 1</div>
        </div>
    );
}

export default FindBook;
