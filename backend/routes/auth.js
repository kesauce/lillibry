import express from "express";
import bcrypt from "bcrypt";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const SALT_ROUND = 10;

const router = express.Router();

// Routing for user login
router.post("/login", async (req, res) => {
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
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: "30d",
                },
            );
            return res
                .status(200)
                .json({ message: "Login successful", token: token });
        }
    } catch (err) {
        console.log(err);
    }
});

// Routing for user registeration
router.post("/register", async (req, res) => {
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
            const token = jwt.sign({ sub: User._id }, process.env.JWT_SECRET, {
                expiresIn: "30d",
            });

            return res
                .status(201)
                .json({ messsage: "User successfully created", token: token });
        }
    } catch (err) {
        console.log(err);
    }
});

// Routing for token verification
router.get("/verify", async (req, res) => {
    try {
        // Grab only the token from the response if the header exists
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];

            if (!token) {
                return res.status(401).json({ message: "Token not found." });
            }

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                return res
                    .status(200)
                    .json({ message: "Token valid.", userId: decoded.userId });
            } catch (err) {
                return res.status(401).json({ message: "Token invalid." });
            }
        }
    } catch (err) {
        console.log(err);
    }
});

export default router;