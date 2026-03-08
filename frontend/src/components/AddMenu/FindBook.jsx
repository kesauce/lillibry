import { useEffect } from "react";
import "../../styles/Menu.css";
import { useState } from "react";

function FindBook() {
    const [query, setQuery] = useState("");

    const handleSearch = async () => {
        // Make the fetch
        const res = await fetch("http://localhost:8000/book/find", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: query,
            }),
        });

        //Extract the response
        const data = await res.json();
    };

    // Runs handleSearch everytime query is changed
    useEffect(() => {
        if (!query) return;

        // Only runs handleSearch() after 500ms after the user stops typing
        const timeout = setTimeout(() => { handleSearch() }, 500);

        // Runs this code before every execution of the next useEffect - remove timeout if user types before 500ms has passed
        return() => {
            clearTimeout(timeout);
        };
    }, [query]);

    return (
        <div className="find-book">
            <h1>Find A Book</h1>
            <form>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter book title or author"
                    onChange={(event) => {
                        setQuery(event.target.value);
                    }}
                />
            </form>

            <div className="book-list">book 1</div>
        </div>
    );
}

export default FindBook;
