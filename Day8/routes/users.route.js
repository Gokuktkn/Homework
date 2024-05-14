import { Router } from "express";
import { loginValidator, registerValidator } from "../middleware/users.middleware.js";
import { loginController, registerController } from "../controllers/users.controller.js";
import { tokenValidator } from "../middleware/tokens.middleware.js";
import { tokenController } from "../controllers/tokens.controller.js";


const userRoute = Router();

userRoute.post("/register", registerValidator, registerController);
userRoute.post("/login", loginValidator, loginController);
userRoute.post("/token", tokenValidator, tokenController);

export default userRoute;