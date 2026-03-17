import { useState, useEffect } from "react";
import "../../styles/Menu.css";

function AddShelf() {
    // Setting up states
    const [shelfName, setShelfName] = useState("");

    // const handleShelfCheck = async () => {
    //     // Make the fetch
    //     const res = await fetch("http://localhost:8000/book/find", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             query: query,
    //         }),
    //     });

    //     //Extract the response and add it to result
    //     const data = await res.json();
    //     setResultStatus("idle");
    //     setResults(data.result);
    // };

    const handleShelfAdd = async (e) => {
        e.preventDefault();

        // Grab the user's authorisation token from the local storage
        const token = localStorage.getItem("token");

        // Make the fetch
        const res = await fetch("http://localhost:8000/shelf/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                "shelfName": shelfName,
            }),
        });

        // Extract the token from the response
        const data = await res.json();
        if (res.status == 200) {
            let message = document.getElementById("message");
            message.value = "Shelf succesfully created.";
        }
        else{
            alert("An error has occurred. Please try again.")
        }
    };

    return (
        <div className="add-shelf">
            <h1>Add A Shelf</h1>
            <form onSubmit={handleShelfAdd}>
                <input
                    type="text"
                    id="shelf-name"
                    placeholder="Enter shelf name"
                    onChange={(event) => setShelfName(event.target.value)}
                />
                <button onClick={handleShelfAdd} className="submit-shelf">
                    Create shelf
                </button>
            </form>
            <p id="message"></p>
        </div>
    );
}

export default AddShelf;
