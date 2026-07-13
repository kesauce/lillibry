import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

const shelfSchema = new Schema({
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    books: [
        {
            key: String,
            title: String,
            coverID: String,
            coverURL: String,
            author: [String],
            publishYear: Number
        }
    ],
});

// Create a new collection using the schema
const Shelf = model("Shelf", shelfSchema);
export default Shelf;
