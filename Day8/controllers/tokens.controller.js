import userService from "../services/users.services.js";

export const tokenController = async (req, res, next) => {
    try {
        const userId = req.query;
        const oldToken = req.token.stored_token.token;
        const {access_token, refresh_token} = await userService.createToken(userId, oldToken);
        return res.json({
            message: "Create token Successfully",
            access: access_token,
            refresh: refresh_token,
        });
    } catch (error) {
        next(error);
    }
};