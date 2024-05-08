import userService from "../services/users.services.js"

export const registerController = async (req, res, next) => {
    const { email, password } = req.body;
    await userService.register(email, password);
    return res.json({
        message: "Register Successfully",
    });
};

export const loginController = async (req, res, next) => {
    try {
        return res.json({
            message: "Login successfully",
        });
    } catch (error) {
        next(error);
    }
}