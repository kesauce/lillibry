import { useState, useEffect } from "react";
import "../../styles/Menu.css";
import bookPlaceholder from "../../assets/images/book_placeholder.png";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function BookItem({ shelves, bookKey, title, author, coverID, coverURL }) {
    const [cover, setCover] = useState(bookPlaceholder);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [selectedShelves, setSelectedShelves] = useState([]);
    const animatedComponents = makeAnimated();

    // Reformat the shelves
    const shelfNames = shelves.map((shelf) => ({
        value: shelf.name,
        label: shelf.name,
        bookKey: bookKey,
        title: title,
    }));

    // Grab the names of the shelves this book is in
    const checkBook = async () => {
        // Grab token
        const token = localStorage.getItem("token");

        const res = await fetch(
            `http://localhost:8000/book/check?bookKey=${bookKey}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        //Extract the response and set the selected shelves
        const data = await res.json();
        if (res.status == 200) {
            const formattedResult = data.shelves.map((shelfName) => ({
                value: shelfName,
                label: shelfName,
            }));
            setSelectedShelves(formattedResult);
        }
    };

    // Runs once
    useEffect(() => {
        // Sets the default to the placeholder and rerenders once it gets the actual image if there is one
        if (!coverID) return;
        setCover(coverURL);

        // Check what shelves this book is in
        checkBook();
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

        //Extract the response and add it to result
        if (res.status == 200) {
            setSelectedShelves(selectedOptions);
        }
    };

    return (
        <div className="book-item">
            <div className="left">
                <img
                    src={coverID && imageLoaded ? coverURL : bookPlaceholder}
                    onLoad={() => coverID && setImageLoaded(true)}
                    onError={() => setImageLoaded(false)}
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
                    value={selectedShelves}
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
