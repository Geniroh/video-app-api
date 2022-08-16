import express from "express";
import { update, deleteUser, getUser, subscribe, like, dislike, unsubscribe } from "../controllers/user.controller.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//@desc update a user
router.put("/:id", verifyToken, update);

//@desc delete a user
router.delete("/:id", verifyToken, deleteUser)

//@desc get a user
router.get("/find/:id", getUser)

//@desc subscribe a user
router.put("subscribe/:id", verifyToken, subscribe)

//@desc unsubscribe a user
router.put("unsub/:id", verifyToken, unsubscribe)

//@desc like avideo
router.put("/like/:videoId",verifyToken, like)

//@desc dislike a video
router.put("/dislike/:videoId", verifyToken, dislike)

export default router;