import Shelves from "../components/Shelves.jsx";
import Nav from "../components/Nav.jsx";
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

function Homepage() {
    return (
        <div className="homepage">
            <header>
                {/* <SignedOut>
                    <Navigate to="/login" />
                </SignedOut>
                <SignedIn>
                    <Shelves/>
                </SignedIn> */}
                <SignedOut>
                    <Nav />
                    <Shelves />
                </SignedOut>
            </header>
        </div>
    );
}

export default Homepage;
