import mongoose from "mongoose"; 
import dotenv from 'dotenv';
import color from'colors'
// Load environment variables from .env file
dotenv.config();

// Connect to the database
export default async function ConnectDB(){
    try {
        await mongoose.connect(process.env.DB_URL, );
        console.log("Database connected successfully".bgBlue);
    } catch (error) {
        console.log("Database connection error:", error);
    }
}

