import { Router } from "express";
import { loginValidator, registerValidator } from "../middleware/users.middleware.js";
import { loginController, registerController } from "../controllers/users.controller.js";


const userRoute = Router();

userRoute.post("/register", registerValidator, registerController);
userRoute.post("/login", loginValidator, loginController);

export default userRoute;