import { USER_MESSAGE } from "../constants/messages.js";
import RefreshModel from "../models/tokens.models.js";
import UserModel from "../models/users.models.js";
import jwt from "jsonwebtoken";

export const tokenValidator = async (req, res, next) => {
    try {
        if (!req.headers.authorization) throw new Error();
        const token = req.headers.authorization.split(" ")[1];
        if (!token) throw new Error();
        const { id } = req.query;
        const user = await UserModel.findOne({ _id: id });
        if (!user) {
            throw new Error(USER_MESSAGE.USER_DOES_NOT_EXIST);
        }
        const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        if (decode.id != id) throw new Error();

        const rfToken = req.body.token;
        const stored_token = await RefreshModel.findOne({ token: rfToken });
        if (!stored_token || stored_token.expiryDate < new Date()) throw new Error("Invalid token");

        req.token = { stored_token };
        next();
    } catch (error) {
        next(error);
    }

};