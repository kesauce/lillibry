import mongoose from "mongoose";
const { Schema, model } = mongoose;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    }
    
});

// Create a new collection using the schema
const Book = model("Book", bookSchema);
export default Book;
