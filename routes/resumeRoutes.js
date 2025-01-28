import { Router } from "express";   
import simpleResume from "../controllers/simpleResume.js"

const router = Router();

router.post("/simpleResume", simpleResume);

export default router;