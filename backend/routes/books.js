import express from "express";
import "dotenv/config";

const router = express.Router();

// Routing for finding a book using API
router.post("/find", async (req, res) => {
    const { query } = req.body;
    const apiURL = "https://openlibrary.org/search.json"

    // Make a serach query at OpenLibrary.org
    let queryURL = `${apiURL}?q=${query}`;

    const data = await fetch(queryURL);

    const json = await data.json();

    res.status(200).json({"message" : json})
});

export default router;