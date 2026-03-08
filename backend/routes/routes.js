import express from "express";
import auth from "./auth.js";
import books from "./books.js";
const router = express.Router();

router.use("/auth", auth);
router.use("/book", books);

export default router;