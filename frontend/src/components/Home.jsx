// import "../styles/Auth.css";
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

function Homepage() {
    return (
        <div className="homepage">
            <header>
                <SignedOut>
                    <Navigate to="/login" />
                </SignedOut>
                <SignedIn>
                    {/* insert things here */}
                </SignedIn>
            </header>
        </div>
    );
}

export default Homepage;
