import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import Shelf from "../model/Shelf.js";

const router = express.Router();
// Add a shelf to the database
router.post("/add", async (req, res) => {
    try {
        const { shelfName } = req.body;

        // Check if username or password are empty
        if (!shelfName) {
            console.error("Field error: Shelf name is empty.");
            return res.status(400).json({ message: "Shelf name is empty" });
        }

        // Check the user's cookies and ensure that the server is making a shelf for correct user
        if (!req.headers.authorization) {
            console.error("Token error: Header doesn't exist.");
            return res.status(401).json({ message: "Header doesn't exist." });
        }

        const token = req.headers.authorization.split(" ")[1];

        // Ensure token exists
        if (!token) {
            console.error("Token error: Token doesn't exist.");
            return res.status(401).json({ message: "Token not found." });
        }

        try {
            // Add a shelf with that user's account
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.userId;

            // Ensure the shelf name isn't taken
            if (await Shelf.findOne({ owner: userId })) {
                return res
                    .status(409)
                    .json({ message: "Shelf already exists." });
            } else {
                // Add the shelf to that user's database
                await Shelf.create({
                    owner: userId,
                    name: shelfName,
                });

                return res
                    .status(201)
                    .json({ messsage: "Shelf successfully created" });
            }
        } catch (err) {
            console.error("Token error: Token is invalid.");
            return res.status(401).json({ message: "Token invalid." });
        }
    } catch (err) {
        console.error(`A server error has occurred: ${err}`);
        return res
            .status(500)
            .json({ message: "An unexpected server error has occurred." });
    }
});

// Find a shelf in the database
router.get("/find", async (req, res) => {
    try {
        const { name } = req.query;

        // If finding a single shelf
        if (name) {
            // Search for movies of that specific genre
            const shelf = await Shelf.findOne({ name: name });
            if (shelf){
                return res.status(200).json({ message: `Shelf with the name ${name} found.` });
            }
            else{
                return res.status(404).json({message: `Shelf with the name ${name} not found.`})
            }
        }
        // Return all the shelves
        else {
        }
    } catch (err) {
        console.error(`A server error has occurred: ${err}`);
        return res
            .status(500)
            .json({ message: "An unexpected server error has occurred." });
    }
});
export default router;
