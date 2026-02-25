import "../styles/Auth.css";
import { SignedIn, SignedOut, SignUp } from '@clerk/clerk-react';
import { Navigate } from "react-router-dom";

function Register() {
    return (
        <div className="login">
            <h1>lillibry</h1>
            <header>
                <SignedOut>
                    <SignUp />
                </SignedOut>
                <SignedIn>
                    <Navigate to="/homepage" />
                </SignedIn>
            </header>
        </div>
    );
}

export default Register;
