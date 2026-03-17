import express from "express";
import auth from "./auth.js";
import books from "./books.js";
import shelves from "./shelves.js";
const router = express.Router();

router.use("/auth", auth);
router.use("/book", books);
router.use("/shelf", shelves);

export default router;