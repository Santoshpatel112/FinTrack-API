import express from 'express'

import {createTransction,UpdateTransctionById,DeleteTransctionById,GetAllTransction} from "./../Controllers/Transction.Controllers.js"
import { authMiddleware } from '../middleware/auth.middleware.js';
const router=express.Router();

router.post("/",authMiddleware,createTransction);
router.patch('/',authMiddleware,UpdateTransctionById);
router.delete('/',authMiddleware,DeleteTransctionById);
router.get("/",authMiddleware,GetAllTransction);


export default router;