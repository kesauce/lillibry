import Shelves from "../components/Shelves.jsx";
import Nav from "../components/Nav.jsx";
import { Navigate } from "react-router-dom";

function Homepage() {
    return (
        <div className="homepage">
            <Nav />
            <Shelves />
        </div>
    );
}

export default Homepage;
