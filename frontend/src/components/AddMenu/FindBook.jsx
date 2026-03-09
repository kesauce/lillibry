import { useState, useEffect } from "react";
import { Bouncy } from "ldrs/react";
import "../../styles/Menu.css";

function FindBook() {
    const [results, setResults] = useState(null);
    const [status, setStatus] = useState("idle");
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

        //Extract the response and add it to result
        const data = await res.json();
        setStatus("idle");
        setResults(data.result);
    };

    // Runs handleSearch everytime query is changed
    useEffect(() => {
        if (!query || query.length < 3) return;

        // Only runs handleSearch() after 500ms after the user stops typing
        const timeout = setTimeout(() => {
            handleSearch();
            setStatus("loading");
        }, 500);

        // Runs this code before every execution of the next useEffect - remove timeout if user types before 500ms has passed
        return () => {
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

            <div className="book-list">
                {status == "loading" ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <Bouncy color="#454d30" />
                    </div>
                ) : (
                    <ul>
                        {results
                            ? Object.values(results).map((result, index) => (
                                  <li key={result.key || index}>
                                      {result.title} {result.author}
                                  </li>
                              ))
                            : null}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default FindBook;
