import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Homepage from "./components/Home.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}
            signInUrl="/login"
            signUpUrl="/register"
        >
            <BrowserRouter>
                <Routes>
					<Route index element={<Homepage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </ClerkProvider>
    </StrictMode>,
);
