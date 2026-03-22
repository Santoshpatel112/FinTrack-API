import express from "express"

const router=express.Router();
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createCategory,GetCategory } from "../Controllers/Category.Controllers.js";

router.post("/",authMiddleware,createCategory);
router.get("/",authMiddleware,GetCategory);

export default router;