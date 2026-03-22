import exprss from 'express'
import { Register, LoginUser, getAllUser, getprofil ,logout} from '../Controllers/User.Controllers.js'

import { Authrizerole } from '../middleware/role.middleware.js'
import { authMiddleware } from '../middleware/auth.middleware.js'


const   router = exprss.Router();

router.post("/register", Register);
router.post("/login", LoginUser);
router.get("/logout",authMiddleware,logout);
router.get("/", authMiddleware, getprofil)
router.get("/getAll", authMiddleware, Authrizerole("admin"), getAllUser);
export default router;