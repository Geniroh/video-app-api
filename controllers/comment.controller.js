import Comment from "../models/Comments.js"
import Video from "../models/Video.js";

export const addComment = async (req,res,next) => {
    try {
        const newComment = await Comment.create({ ...req.body, userId: req.user.id});
        res.status(200).json(newComment);
    } catch (error) {
        next(err)
    }
}

export const deleteComment = async (req,res,next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);
        if(req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("Comment deleted succesfully");
        } else {
            return next(createError(403, "You can only delete your own comments"));
        }
    } catch (error) {
        next(err)
    }
}

export const getComments = async (req,res,next) => {
    try {
        const comments = await Comment.find({ videoid: req.params.videoId});
        res.status(200).json(comments);
    } catch (error) {
        next(err)
    }
}