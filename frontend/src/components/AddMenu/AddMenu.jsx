import "../../styles/Menu.css";
import { useState } from "react";
import FindBook from "./FindBook";

function AddMenu() {
    const [activePage, setActivePage] = useState("FindBook");
    let pageComponent;

    switch (activePage){
        default:
            pageComponent = <FindBook/>
            break;
    };


    return (
        <div className="add-menu">
            <nav>
                <h1>Books</h1>
                <div onClick={() => setActivePage("FindBook")} className={`link-wrapper ${activePage === "FindBook" ? "link-wrapper-active" : ""}`}><a>Find A Book</a></div>
                <div onClick={() => setActivePage("AddBook")} className={`link-wrapper ${activePage === "AddBook" ? "link-wrapper-active" : ""}`}><a>Add A Custom Book</a></div>
                <h1>Shelves</h1>
                <div onClick={() => setActivePage("AddShelf")} className={`link-wrapper ${activePage === "AddShelf" ? "link-wrapper-active" : ""}`}><a>Add A Shelf</a></div>
            </nav>

            {pageComponent}
        </div>
    );
}

export default AddMenu;
