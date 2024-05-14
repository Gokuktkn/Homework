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
        const userId = req.user._id;
        const {access_token, refresh_token} = await userService.login(userId);
        return res.json({
            message: "Login Successfully",
            access: access_token,
            refresh: refresh_token,
        });
    } catch (error) {
        next(error);
    }
};