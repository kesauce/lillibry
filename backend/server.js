import express from "express";
import bcrypt from "bcrypt";
import connectDatabase from "./database.js";
import User from "./model/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const app = express();
const PORT = 8000;
const SALT_ROUND = 10;
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
            return res
                .status(401)
                .json({ message: "Invalid username or password" });
        } else {
            // Generate a JWT
            const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
                expiresIn: "30d",
            });
            return res.status(200).json({ "message": "Login successful", token: token });
        }
    } catch (err) {
        console.log(err);
    }
});

app.post("/auth/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Ensure the username isn't taken
        if (await User.findOne({ username: username })) {
            return res.status(409).json({ message: "Username taken" });
        } else {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

            // Add the user the database and hash their password
            await User.create({
                username: username,
                password: hashedPassword,
            });

            // Generate a JWT
            const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
                expiresIn: "30d",
            });

            return res
                .status(201)
                .json({ messsage: "User successfully created", "token": token });
        }
    } catch (err) {
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
