import { createError } from "../error.js"
import User from "../models/User.js";
import mongoose from "mongoose";
import Video from "../models/Video.js";

export const update = async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json({
                success: true,
                user: updatedUser
            })
        } catch (error) {
            next(err);
        }
    } else {
        return next(createError(403, "Operation denied for this user!"));
    }
}

export const deleteUser = async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            res.status(200).json({
                success: true,
                info: "User has beeen deleted"
            })
        } catch (error) {
            next(err);
        }
    } else {
        return next(createError(403, "Operation denied for this user!"));
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) return next(createError(404, "User not found!"));
        res.status(200).json({ user })
    } catch (error) {
        next(error)
    }
}

export const subscribe = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
       await session.withTransaction( async () => {
        //Find current user, then push subscribed channel ids
        await User.findById(req.user.id, {
            $push: {subscribedUsers: req.params.id}
        }, { session })

        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: 1}
        })
       })
        
       await session.endSession();
       res.status(200).json("Subscription successful");
    } catch (error) {
        next(error)
    }
}

export const unsubscribe = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
       await session.withTransaction( async () => {
        //Find current user, then push subscribed channel ids
        await User.findById(req.user.id, {
            $pull: {subscribedUsers: req.params.id}
        }, { session })

        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: -1}
        })
       })
        
       await session.endSession();
       res.status(200).json("Unsubscription successful");
    } catch (error) {
        next(error)
    }
}

export const like = async (req, res, next) => {
    try {
        const id = req.user.id;
        const videoId = req.params.videoId;

        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id},
            $pull: { dislikes: id}
        })

        res.status(200).json("You liked this video")
    } catch (error) {
        next(error)
    }
}

export const dislike = async (req, res, next) => {
    try {
        const id = req.user.id;
        const videoId = req.params.videoId;

        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id},
            $pull: { likes: id}
        })

        res.status(200).json("You disliked this video")
    } catch (error) {
        next(error)
    }
}