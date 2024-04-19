import express from "express"
import mongoose from "mongoose";
import UserModel from "./models/users.models.js";

mongoose.connect("mongodb+srv://quan01092003:quan01092003@firsttry.4eeavwa.mongodb.net/day4?retryWrites=true&w=majority&appName=FirstTry")
const app = express();
const PORT = 1007;
app.use(express.json());

app.post("/api/v1/users", async (req, res) => {
    try {
        const { userName, email } = req.body;
        if (!userName) throw new Error("UserName is required!");
        if (!email) throw new Error("Email is required!");

        const createdUser = await UserModel.create({
            userName,
            email
        });
        res.status(201).send({
            data: createdUser,
            message: 'Register successful!',
            success: true
        });
    } catch (error) {
        res.status(403).send({
            message: error.message,
            data: null,
            success: false
        });
    }
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Error: ${err.message}`);
    } else {
        console.log(`Server is listening on port ${PORT}`);
    }
});