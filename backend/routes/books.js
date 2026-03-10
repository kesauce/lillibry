import express from "express";
import "dotenv/config";

const router = express.Router();

// Routing for finding a book using API
router.post("/find", async (req, res) => {
    try {
        const { query } = req.body;
        const apiURL = "https://openlibrary.org/search.json";

        // Ensure query isn't empty or less than 3 digits
        if (!query || query.length < 3) {
            console.err("Query error: Search query is empty or less than 3 character.");
            return res
                .status(400)
                .json({ message: "Query is empty or less than 3 characters." });
        }

        // Make a serach query at OpenLibrary.org
        let queryURL = `${apiURL}?q=${query}`;
        const apiRes = await fetch(queryURL);

        // Check if the API responded
        if (!apiRes.ok) {
            console.err(
                `OpenLibrary.org error: ${apiRes.status}`,
            );
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
        return res.status(500).json({"message": "An unexpected server error has occurred."});
    }
});

export default router;
