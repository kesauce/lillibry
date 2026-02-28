import "../styles/Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router";

function Register() {
    // Setting the states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("");
    
    let navigate = useNavigate();

    // Handle the register and submit the form
    const register = async (e) => {
        // Prevent the page from refreshing onsubmit
        e.preventDefault();

        // Make the fetch
        const res = await fetch("http://localhost:8000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        //Extract the response
        const data = await res.json();

        // If successful registeration, navigate to page
        if (res.status == 201 && data.token != null) {
            navigate("/");
        }
        // If username taken
        else if (res.status == 409){
            let username = document.getElementById("username");
            username.classList.add("input-error");
            
            setUsernameMessage("Username taken. Please try another one.")
        }
        else{
            alert("An error has occurred. Please try again.")
        }
    };

    return (
        <div className="login">
            <h1>lillibry</h1>
            <div className="login-container">
                <h2>REGISTER</h2>
                <form onSubmit={register}>
                    <div className="input-group">
                        <label htmlFor="username">USERNAME</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="username"
                            required
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
                    </div>

                    <p id="username-message">{usernameMessage}</p>

                    <div className="input-group">
                        <label htmlFor="password">PASSWORD</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            required
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </div>

                    <button type="submit">SIGN UP</button>

                    <div className="divider">OR</div>
                    <div className="footer">
                        Already have an account? <a href="/login">Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
