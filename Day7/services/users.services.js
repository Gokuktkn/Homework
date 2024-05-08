import UserModel from "../models/users.models.js";
import bcrypt from "bcrypt";

class UserService {
    async register(email, password) {
        const saltRounds = 10;
        // tạo chuỗi ngẫu nhiên
        const salt = bcrypt.genSaltSync(saltRounds);
        // thực hiện mã hoá với chuỗi salt
        const hashPassword = bcrypt.hashSync(password, salt);
        await UserModel.create({ email, password: hashPassword });
    }
    async login() {
        return "Login successfully";
    }
}

const userService = new UserService();

export default userService;