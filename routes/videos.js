import express from "express";
import { verifyToken } from "../verifyToken.js";
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, searchVideo, subscribe, trend, updateVideo } from "../controllers/video.controller.js";

const router = express.Router();

//@desc add a video
router.post("/", verifyToken, addVideo);

//@desc
router.put("/:id", verifyToken, updateVideo)

//@desc delete a video
router.delete("/:id", verifyToken, deleteVideo)

//@desc find a video
router.get("/find/:id", getVideo)

//@desc video views
router.put("/view/:id", addView)

//@desc trending videos endpoint
router.get("/trend", trend)

//@desc random videos
router.get("/random", random)

//@desc subscribed channels videos
router.get("/sub", verifyToken, subscribe)

//@desc search videos by name and tags
router.get("/search", searchVideo)
router.get("/tags", getByTag)




export default router;