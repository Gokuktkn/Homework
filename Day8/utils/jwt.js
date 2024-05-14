import jwt from "jsonwebtoken";
import RefreshModel from "../models/tokens.models.js";
export const signToken = ({ payload, privateKey, options }) => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(payload, privateKey, {
      expiresIn: "1d",
      ...options,
    });
    if (!token) {
      throw reject(token);
    } else {
      resolve(token);
    }
  });
};

export const signRefreshToken = async () => {
  const refresh_token = crypto.randomUUID();
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);
  await RefreshModel.create({ token: refresh_token, expiryDate });
  return refresh_token;
};