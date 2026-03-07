import "../styles/Menu.css"

function AddMenu() {
    return (
        <div className="add-menu">
            <nav>
                <h1>Books</h1>
                <div class="link-wrapper"><a>Find a book</a></div>
                <div class="link-wrapper"><a>Add a custom</a></div>
                <h1>Shelves</h1>
                <div class="link-wrapper"><a>Add a shelf</a></div>
            </nav>

        </div>
    );
}

export default AddMenu;
