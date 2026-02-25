import "../styles/Auth.css";
import { SignedIn, SignedOut, SignUp, UserButton } from '@clerk/clerk-react';

function Register() {
    return (
        <div className="login">
            <h1>lillibry</h1>
            <header>
                {/* Show the sign-in and sign-up buttons when the user is signed out */}
                <SignedOut>
                    <SignUp />
                </SignedOut>
                {/* Show the user button when the user is signed in */}
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </header>
        </div>
    );
}

export default Register;
