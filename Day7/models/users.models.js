import mongoose from "mongoose";
import Collections from "../constants/collections.js";

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
    },
    {versionKey: false}
);

const UserModel = mongoose.model(Collections.USER, userSchema);
export default UserModel;