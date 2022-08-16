import { createError } from "../error.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    try {
        const newUser = await User.create({ ...req.body });
        console.log(newUser);
        res.status(200).send(newUser);
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    try {
        //Check if the user exist
        const user = await User.findOne({ email: req.body.email });
        if(!user) return next(createError(404, "User not found"));

        //Confirm their password credentials
        const pwdCheck = await bcrypt.compare(req.body.password, user.password);
        if(!pwdCheck) return next(createError(400, "Wrong credentials"));

        //Create an acess token
        const token = jwt.sign({ id:  user._id }, process.env.JWT_SECRET_KEY);

        const {password, ...result } = user._doc;

        res.cookie("access_token", token, { httpOnly:true })
            .status(200)
            .json({ result });
    } catch (error) {
        next(error)
    }
}

export const googleSignin = async (req,res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(user) {
            //Create an acess token
        const token = jwt.sign({ id:  user._id }, process.env.JWT_SECRET_KEY);

        res.cookie("access_token", token, { httpOnly:true })
            .status(200)
            .json(user._doc);
        } else {
            const newUser = await User.create({ ...req.body, fromGoogle: true})
            if(!newUser) return next(createError(500, "Unable to sign up at the momemt"));

            const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET_KEY);

            const {password, ...result } = newUser._doc;

            res.cookie("access_token", token, { httpOnly:true })
            .status(200)
            .json(result);
        }
    } catch (error) {
        next(error);
    }
}