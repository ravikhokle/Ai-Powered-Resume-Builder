import { Router } from "express";   
import simpleResume from "../controllers/simpleResume.js"
import register from "../controllers/register.js"
import login from "../controllers/login.js"
import gemini from "../controllers/gemini.js"

const router = Router();

router.post("/simpleResume", simpleResume);
router.post("/register", register);
router.post("/login", login);
router.post("/gemini", gemini);


export default router;