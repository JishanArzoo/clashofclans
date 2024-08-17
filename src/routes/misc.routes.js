import { Router } from "express";
import { ClanInfo, PlayerInfo } from "../controllers/misc.controllers.js";

const router = Router()

//All small routes here

router.route("/player-info/:tag").get(PlayerInfo)
router.route("/clan-info/:tag").get(ClanInfo)

export default router