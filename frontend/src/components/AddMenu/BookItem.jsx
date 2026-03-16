import { useState, useEffect } from "react";
import "../../styles/Menu.css";
import bookPlaceholder from "../../assets/images/book_placeholder.png";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function BookItem({ title, author, coverID, coverURL }) {
    const [cover, setCover] = useState(bookPlaceholder);

    const animatedComponents = makeAnimated();

    // Runs once - sets the default to the placeholder and rerenders once it gets the actual image if there is onez
    useEffect(() => {
        if (!coverID) return;
        setCover(coverURL);
    }, []);

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
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    placeholder={"Select shelves"}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary: "#454d30",
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
