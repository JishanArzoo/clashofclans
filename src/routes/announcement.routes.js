import { Router } from "express";
import { VerifyJWT } from "../middlewares/auth.middleware.js";
import { createAnnouncement, getAllAnnouncements } from "../controllers/announcement.controllers.js";

const router = Router()


//Secured Routes
router.route("/create").post(VerifyJWT, createAnnouncement)
router.route("/get").get(VerifyJWT, getAllAnnouncements)


export default router