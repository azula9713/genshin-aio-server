import { Router } from "express";
import { getWeaponsForAllCharacters } from "../controllers/weapons";

const router = Router();

router.route("/").get((_req, res) => {
  res.send("Weapon API running");
});

router.route("/allForCharacters").get(getWeaponsForAllCharacters);

export default router;
