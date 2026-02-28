import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    shelves: [{
        type: SchemaTypes.ObjectId,
        ref: 'Shelf'
    }]
});

// Create a new collection using the schema
const User = model("User", userSchema);
export default User;
