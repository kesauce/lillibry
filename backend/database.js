import mongoose from "mongoose";
import "dotenv/config";
import User from "./model/User.js";

mongoose.connect(process.env.MONGO_URI);

// Creates a new user  and inserts it into database
const user = await User.create({
    username: "test",
    password: "test"
});

console.log("Created user:", user);
