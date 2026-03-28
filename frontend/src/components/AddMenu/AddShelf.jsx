import { useState, useEffect } from "react";
import "../../styles/Menu.css";

function AddShelf() {
    // Setting up states
    const [shelfName, setShelfName] = useState("");
    const [shelfTaken, setShelfTaken] = useState(false);
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("var(--ebony)");

    // Add the shelf to the database
    const handleShelfAdd = async (e) => {
        e.preventDefault();

        // Check if the shelf name is valid
        if (!shelfName || shelfTaken) {
            setMessageColor("red");
            setMessage(
                `Shelf with that name already exists. Please choose another name.`,
            );
            return;
        }

        // Grab the user's authorisation token from the local storage
        const token = localStorage.getItem("token");

        // Make the fetch
        const res = await fetch("http://localhost:8000/shelf/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                shelfName: shelfName,
            }),
        });

        // Extract the token from the response
        const data = await res.json();
        if (res.status == 200) {
            let message = document.getElementById("message");
            let shelfName = document.getElementById("shelf-name");

            setMessage("Shelf successfully created.");
            shelfName.value = "";
        } else {
            alert("An error has occurred. Please try again.");
        }
    };

    // Check if the shelf name is already taken
    useEffect(() => {
        // Run the check if shelf name isn't empty
        if (shelfName) {
            // Only runs fetch shelf after 500ms after the user stops typing
            const timeout = setTimeout(() => {
                async function fetchShelf() {
                    // Make the fetch
                    const token = localStorage.getItem("token");
                    const res = await fetch(
                        `http://localhost:8000/shelf/find?name=${shelfName}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    // Shelf already exists
                    if (res.status == 200) {
                        setMessageColor("red");
                        setMessage(
                            `Shelf with that name already exists. Please choose another name.`,
                        );
                        setShelfTaken(true);
                    }
                    // Shelf doesn't exist
                    else if (res.status == 404) {
                        setMessageColor("var(--ebony)");
                        setMessage(`Shelf name clear.`);
                        setShelfTaken(false);
                    } else {
                    }
                }

                fetchShelf();
            }, 500);

            // Runs this code before every execution of the next useEffect - remove timeout if user types before 500ms has passed
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [shelfName]);

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
            <p id="message" style={{ color: messageColor }}>
                {message}
            </p>
        </div>
    );
}

export default AddShelf;
