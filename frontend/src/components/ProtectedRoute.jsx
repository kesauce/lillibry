import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router";
import { Bouncy } from "ldrs/react";
import "ldrs/react/Bouncy.css";

function ProtectedRoute({ children }) {
    const [status, setStatus] = useState("loading");
    const token = localStorage.getItem("token");

    let navigate = useNavigate();

    const verifyToken = async () => {
        try {
            const data = await fetch("http://localhost:8000/auth/verify", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }, //Standard for JWT tokens
            });

            // If token is invalid, redirect to login
            if (data.status == 401) {
                setStatus("invalid");
            } else {
                setStatus("valid");
            }
        } catch (err) {
            console.error(err);
            setStatus("invalid");
        }
    };

    // Ensure that React only runs verifyToken once, not on every render
    useEffect(() => {
        verifyToken();
    }, []);

    // Show different views depending on the status
    if (status == "loading") {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Bouncy color="#454d30" />
            </div>
        );
    } else if (status == "valid") {
        return children;
    } else if (status == "invalid") {
        return <Navigate to="/login" replace />;
    }
}

export default ProtectedRoute;
