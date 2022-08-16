import express from "express";
import { signup, signin, googleSignin } from "../controllers/auth.controller.js";

const router = express.Router();

//@desc create a user
router.post("/signup", signup)

//@desc sign in a user
router.post("/signin", signin);

//@desc google authentication
router.post("/google", googleSignin);

export default router;