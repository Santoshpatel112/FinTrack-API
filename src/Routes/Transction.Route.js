import express from 'express'

import {createTransction,UpdateTransctionById,DeleteTransctionById,GetAllTransction ,GetTransctionById} from "./../Controllers/Transction.Controllers.js"
import { authMiddleware } from '../middleware/auth.middleware.js';
const router=express.Router();

router.post("/",authMiddleware,createTransction);
router.patch('/:id',authMiddleware,UpdateTransctionById);
router.delete('/:id',authMiddleware,DeleteTransctionById);
router.get("/",authMiddleware,GetAllTransction);
router.get("/:id",authMiddleware,GetTransctionById);


export default router;