import mongoose from "mongoose";
import "dotenv/config";

// Attempt to connect to database
const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDatabase;
