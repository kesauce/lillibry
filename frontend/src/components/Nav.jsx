import "../styles/Nav.css";

function Nav({ activeMenu, setActiveMenu }) {
    return (
        <div className="nav">
            <div className="search-wrapper">
                <img id="search-icon" src="../src/assets/icons/search.svg" />
                <input placeholder="Search here"></input>
            </div>
            <div className="icons">
                <button
                    onClick={() => activeMenu == "add" ? setActiveMenu(null) : setActiveMenu("add")}
                >
                    <img id="add-icon" src="../src/assets/icons/add.svg" />
                </button>
                <button>
                    <img id="edit-icon" src="../src/assets/icons/edit.svg" />
                </button>
                <button>
                    <img
                        id="delete-icon"
                        src="../src/assets/icons/delete.svg"
                    />
                </button>
                <button>
                    <img
                        id="profile-icon"
                        src="../src/assets/icons/profile.svg"
                    />
                </button>
            </div>
        </div>
    );
}

export default Nav;
