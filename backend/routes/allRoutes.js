import { Router } from "express";   
import simpleResume from "../controllers/simpleResume.js"
import gemini from "../controllers/gemini.js"

const router = Router();

router.post("/simpleResume", simpleResume);
router.post("/gemini", gemini);


export default router; 