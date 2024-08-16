import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(VerifyJWT, logoutUser)
router.route("/get-user").get(VerifyJWT, getCurrentUser)










export default router