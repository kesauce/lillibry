import "../styles/Auth.css";
import { SignedIn, SignedOut, SignUp } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

function Register() {
    return (
        <div className="login">
            <h1>lillibry</h1>
            <div class="login-container">
                <h2>REGISTER</h2>

                <div class="input-group">
                    <label for="username">USERNAME</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="username"
                    />
                </div>

                <div class="input-group">
                    <label for="password">PASSWORD</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                    />
                </div>

                <button type="submit">SIGN UP</button>

                <div class="divider">OR</div>
                <div class="footer">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </div>
        </div>
    );
}

export default Register;
