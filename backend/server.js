import express from "express";
import connectDatabase from "./database.js";
import routes from "./routes/routes.js";
import "dotenv/config";

const PORT = 8000;
const app = express();

app.use(express.json());
app.use('/', routes);

connectDatabase();

// Start the server
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});
