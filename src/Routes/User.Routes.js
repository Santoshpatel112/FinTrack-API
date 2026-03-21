import exprss from 'express'
import { Register,LoginUser ,getAllUser,getprofil } from '../Controllers/User.Controllers'

import { Authrizerole } from '../middleware/role.middleware'
import { authMiddleware } from '../middleware/auth.middleware'


const   router =exprss.Router();

router.post("/register",Register);
router.post(";login",LoginUser);
router.get("/",authMiddleware,getprofil)
router.get("/getAll",authMiddleware,Authrizerole("admin"),getAllUser);
export default router;