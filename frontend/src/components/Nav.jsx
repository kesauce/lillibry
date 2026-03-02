import "../styles/Nav.css";

function Nav() {
    return (
        <div className="nav">
            <div className="search-wrapper">
                <img id="search-icon" src="../src/assets/icons/search.svg" />
                <input placeholder="Search here"></input>
            </div>
            <div className="icons">
                <img id="add-icon" src="../src/assets/icons/add.svg" />
                <img id="edit-icon" src="../src/assets/icons/edit.svg"/>
                <img id="delete-icon" src="../src/assets/icons/delete.svg" />
                <img id="profile-icon" src="../src/assets/icons/profile.svg" />
            </div>
        </div>
    );
}

export default Nav;
