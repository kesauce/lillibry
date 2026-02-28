import "../styles/Auth.css";

function Login() {
    return (
        <div className="login">
            <h1>lillibry</h1>
            <div class="login-container">
                <h2>LOGIN</h2>

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

                <button type="submit">SIGN IN</button>

                <div class="divider">OR</div>
                <div class="footer">
                    Don't have an account? <a href="/register">Sign up</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
