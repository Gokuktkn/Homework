import { config } from "dotenv";
import mongoose from "mongoose";

config();

class DatabaseService {
    constructor() {
        this.uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@firsttry.4eeavwa.mongodb.net/?retryWrites=true&w=majority&appName=FirstTry`
    }
    async connect() {
        try {
            await mongoose.connect(this.uri);
            console.log(`MongoDB connect successfully`);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;