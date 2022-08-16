import express from "express";
import {addComment, deleteComment, getComments } from "../controllers/comment.controller.js"
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//@desc adding a comment
router.post("/", verifyToken, addComment);

//@desc delete a comment
router.delete("/:id", verifyToken, deleteComment);

//@desc get all the comments
router.get("/:videoId", getComments);

export default router;