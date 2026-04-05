import { useState, useEffect } from "react";
import "../../styles/Menu.css";
import bookPlaceholder from "../../assets/images/book_placeholder.png";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function BookItem({ shelves, bookKey, title, author, coverID, coverURL }) {
    const [cover, setCover] = useState(bookPlaceholder);
    const animatedComponents = makeAnimated();

    // Reformat the shelves
    const shelfNames = shelves.map((shelf) => ({
        value: shelf.name,
        label: shelf.name,
        bookKey: bookKey,
        title: title,
    }));

    // Runs once - sets the default to the placeholder and rerenders once it gets the actual image if there is onez
    useEffect(() => {
        if (!coverID) return;
        setCover(coverURL);
    }, []);

    // Handle the shelf change
    const addToShelf = async (selectedOptions) => {
        // Grab token
        const token = localStorage.getItem("token");
        
        // Add the book to every selected shelf using a fetch
        let selectedShelves = selectedOptions.map(
            (selectedItem) => selectedItem.value,
        );

        const res = await fetch("http://localhost:8000/book/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                shelves: selectedShelves,
                bookKey: bookKey,
                title: title,
            }),
        });

        // //Extract the response and add it to result
        // const data = await res.json();
        // setResultStatus("idle");
        // setResults(data.result);
    };

    return (
        <div className="book-item">
            <div className="left">
                <img
                    src={cover}
                    onError={(event) => (event.target.src = bookPlaceholder)}
                />
                <p>
                    {title} <br /> <span id="author">{author}</span>
                </p>
            </div>
            <div className="right">
                <Select
                    onChange={addToShelf}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={shelfNames}
                    placeholder={"Select shelves"}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary: "#454d30",
                            primary25: "#adc178", // Hover
                            neutral10: "#adc178", // Selected option
                            neutral0: "#f0ead2", // Background colour
                            neutral80: "#454d30", // Selected value text & input text
                            neutral60: "#454d30", // Placeholder text
                            neutral20: "#454d30", // Border & indicators
                        },
                    })}
                    styles={{
                        control: (base, state) => ({
                            ...base,
                            boxShadow: "none", // Removes the glow ring
                            borderColor: state.isFocused
                                ? "#454d30"
                                : base.borderColor,
                            "&:hover": {
                                borderColor: "#adc178",
                            },
                        }),
                    }}
                />
            </div>
        </div>
    );
}

export default BookItem;
