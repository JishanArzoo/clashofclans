import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register", registerUser)
router.route("/login", loginUser)
router.route("/logout", VerifyJWT, logoutUser)
router.route("/get-user", VerifyJWT, getCurrentUser)










export default router