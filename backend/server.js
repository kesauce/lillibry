import express from "express";
import bcrypt from "bcrypt";
import connectDatabase from "./database.js";
import User from "./model/User.js";

const app = express();
const PORT = 8000;
app.use(express.json());
connectDatabase();

// Routing for user authentication
app.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;

    // Check if that username exists
    try {
        const user = await User.findOne({ username: username });

        // Failed login - if username doesn't exist or password doesn't match existing user's
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid username or password" });
        } else {
            
        }
    } catch (err){
        console.log(err);
    }
});

// // Routing for user information
// app.get("/users", (req, res) => {
//     let filteredData = startups;

//     const { id, username, password, shelves } = req.query;
// });

// // Routing for book information
// app.get("/books", (req, res) => {
//     res.send("Welcome to the Express.js Tutorial");
// });

// Start the server
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});
