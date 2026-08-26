import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import Shelf from "../model/Shelf.js";

const router = express.Router();

// Routing for finding a book using API
router.post("/find", async (req, res) => {
    try {
        const { query } = req.body;
        const apiURL = "https://openlibrary.org/search.json";

        // Ensure query isn't empty or less than 3 digits
        if (!query || query.length < 3) {
            console.error(
                "Query error: Search query is empty or less than 3 character.",
            );
            return res
                .status(400)
                .json({ message: "Query is empty or less than 3 characters." });
        }

        // Make a serach query at OpenLibrary.org
        let queryURL = `${apiURL}?q=${query}`;
        const apiRes = await fetch(queryURL);

        // Check if the API responded
        if (!apiRes.ok) {
            console.error(`OpenLibrary.org error: ${apiRes.status}`);
            return res
                .status(502)
                .json({ message: "Failed to reach OpenLibrary.org." });
        }

        // Format the data and only return the title, author, cover, key, and publishing year
        const data = await apiRes.json();
        let formattedResult = [];

        const limit = Math.min(data.docs.length, 100);
        for (let i = 0; i < limit; i++) {
            let result = {
                key: data.docs[i].key,
                title: data.docs[i].title,
                author: data.docs[i].author_name,
                coverID: data.docs[i].cover_i,
                coverURL: `https://covers.openlibrary.org/b/id/${data.docs[i].cover_i}-L.jpg`,
                publishYear: data.docs[i].first_publish_year,
            };

            formattedResult.push(result);
        }

        return res.status(200).json({ result: formattedResult });
    } catch (err) {
        console.error(`A server error has occurred: ${err}`);
        return res
            .status(500)
            .json({ message: "An unexpected server error has occurred." });
    }
});

// Route for checking if a book is in a shelf
router.get("/check", async (req, res) => {
    try {
        const { bookKey } = req.query;

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
            // Add the book's key to the given shelves with that user's account
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.userId;

            try {
                // Find all the user shelves
                const userShelves = await Shelf.find({ owner: userId });

                let bookShelves = [];

                // Map through the userShelves and add the shelf to the array if it contains the given book
                const promiseArray = userShelves.map(async (userShelf) => {
                    if (userShelf.books.some((b) => b.key === bookKey)) {
                        bookShelves.push(userShelf.name);
                    }
                });
                await Promise.all(promiseArray);

                if (bookShelves) {
                    return res
                        .status(200)
                        .json({
                            message: "Book found in shelves.",
                            shelves: bookShelves,
                        });
                } else {
                    return res
                        .status(404)
                        .json({ message: "Book not found in any shelf." });
                }
            } catch (err) {
                console.error(`Database error: ${err}`);
                return res
                    .status(500)
                    .json({ message: "There was an error with the database." });
            }
        } catch (err) {
            console.error(`Token error: ${err}`);
            return res.status(401).json({ message: "Token invalid." });
        }
    } catch (err) {
        console.error(`A server error has occurred: ${err}`);
        return res
            .status(500)
            .json({ message: "An unexpected server error has occurred." });
    }
});

// Route for adding a book to a given shelf
router.post("/add", async (req, res) => {
    try {
        // Grab the given data
        const { shelves, bookKey, title, author, coverID, coverURL, publishYear } = req.body;

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
            // Add the book's key to the given shelves with that user's account
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.userId;

            try {
                // Take an array of promises (using map) to run and wait
                const userShelves = await Shelf.find({ owner: userId });

                // Map through the userShelves and make an array of promises - then run it (foreach doesn't wait for promises)
                const promiseArray = userShelves.map(async (userShelf) => {
                    // If this user shelf is included in the selected shelves then add the book - but only if it isn't already there, otherwise it creates a duplicate entry
                    if (
                        shelves.includes(userShelf.name) &&
                        !userShelf.books.some((b) => b.key === bookKey)
                    ) {
                        await Shelf.updateOne(
                            { owner: userId, name: userShelf.name },
                            {
                                $push: {
                                    books: {
                                        key: bookKey,
                                        title: title,
                                        author: author,
                                        coverID: coverID,
                                        coverURL: coverURL,
                                        publishYear: publishYear
                                    },
                                },
                            },
                        );
                    }
                    // Remove that book from the shelf if it exists - because it's not included in the selected shelves
                    else if (!shelves.includes(userShelf.name) && userShelf.books.some((b) => b.key === bookKey)) {
                        await Shelf.updateOne(
                            { owner: userId, name: userShelf.name },
                            { $pull: { books: { key: bookKey } } },
                        );
                    }
                });
                await Promise.all(promiseArray);

                return res
                    .status(200)
                    .json({ message: "Shelves updated successfully." });
            } catch (err) {
                console.error(`Database error: ${err}`);
                return res
                    .status(500)
                    .json({ message: "There was an error with the database." });
            }
        } catch (err) {
            console.error(`Token error: ${err}`);
            return res.status(401).json({ message: "Token invalid." });
        }
    } catch (err) {
        console.error(`A server error has occurred: ${err}`);
        return res
            .status(500)
            .json({ message: "An unexpected server error has occurred." });
    }
});

export default router;
