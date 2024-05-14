import UserModel from "../models/users.models.js";
import bcrypt from "bcrypt";
import { signRefreshToken, signToken } from "../utils/jwt.js";
import { config } from "dotenv";
import RefreshModel from "../models/tokens.models.js";
config();

class UserService {
    async register(email, password) {
        const saltRounds = 10;
        // tạo chuỗi ngẫu nhiên
        const salt = bcrypt.genSaltSync(saltRounds);
        // thực hiện mã hoá với chuỗi salt
        const hashPassword = bcrypt.hashSync(password, salt);
        await UserModel.create({ email, password: hashPassword });
    }
    async login(userId) {
        const access_token = await signToken({
            payload: {
                id: userId,
            },
            privateKey: process.env.JWT_PRIVATE_KEY,
        });
        const refresh_token = await signRefreshToken();
        return { access_token, refresh_token };
    }
    async createToken(userId, oldToken) {
        const access_token = await signToken({
            payload: {
                id: userId,
            },
            privateKey: process.env.JWT_PRIVATE_KEY,
        });
        const refresh_token = await signRefreshToken();
        if (oldToken) {
            await RefreshModel.deleteOne({ token: oldToken });
        }
        return { access_token, refresh_token };
    }
}

const userService = new UserService();

export default userService;