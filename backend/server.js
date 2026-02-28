import express from "express";
import connectDatabase from './database.js';
import User from './model/User.js';

const app = express();
const PORT = 8000;
app.use(express.json());
connectDatabase();

// Routing for user authentication
app.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;

    // Check if that username exists
    try{
        const user = await User.findOne({ 'username': username });
        console.log(user);
    }
    catch{

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
