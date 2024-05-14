import mongoose from "mongoose";
import Collections from "../constants/collections.js";

const refreshSchema = new mongoose.Schema(
    {
        token: String,
        expiryDate: Date,
    },
    { versionKey: false }
);

const RefreshModel = mongoose.model(Collections.REFRESH_TOKEN, refreshSchema);
export default RefreshModel;