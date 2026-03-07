import "../styles/Menu.css"
import { useState } from "react";

function AddMenu() {
    const [activePage, setActivePage] = useState("FindBook");
    let pageComponent;

    switch (activePage){
        default:
            pageComponent = (
                <p>ho</p>
            );
            break;
    };


    return (
        <div className="add-menu">
            <nav>
                <h1>Books</h1>
                <div onClick={() => setActivePage("FindBook")} className={`link-wrapper ${activePage === "FindBook" ? "link-wrapper-active" : ""}`}><a>Find a book</a></div>
                <div onClick={() => setActivePage("AddBook")} className={`link-wrapper ${activePage === "AddBook" ? "link-wrapper-active" : ""}`}><a>Add a custom</a></div>
                <h1>Shelves</h1>
                <div onClick={() => setActivePage("AddShelf")} className={`link-wrapper ${activePage === "AddShelf" ? "link-wrapper-active" : ""}`}><a>Add a shelf</a></div>
            </nav>

            {pageComponent}
        </div>
    );
}

export default AddMenu;
