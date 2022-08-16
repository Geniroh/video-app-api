import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.acess_token;

    //Check if the token exists
    if(!token) return next(createError(401, "Unauthorized"));

    //Check if token is valid
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userId) => {
        if(err) return next(createError(403, "Invalid token!"));
        req.user = userId;
        next()
    })
}