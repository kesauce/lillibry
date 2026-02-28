import "../styles/Auth.css";
import { useState } from "react";

function Login() {
    // Setting the states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Handle the login and submit the form
    const login = async (e) => {
        // Prevent the page from refreshing onsubmit
        e.preventDefault();

        // Make the fetch
        const res = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "username": username,
                "password": password
            }
            ),
        });
    };

    return (
        <div className="login">
            <h1>lillibry</h1>
            <div className="login-container">
                <h2>LOGIN</h2>
                <form onSubmit={login}>
                    <div className="input-group">
                        <label htmlFor="username">USERNAME</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="username"
                            required
                            onChange={(event) => {setUsername(event.target.value)}}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">PASSWORD</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            required
                            onChange={(event) => {setPassword(event.target.value)}}
                        />
                    </div>

                    <button type="submit">SIGN IN</button>

                    <div className="divider">OR</div>
                    <div className="footer">
                        Don't have an account? <a href="/register">Sign up</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
