import { Router } from "express";
import { getAllCharacters } from "../controllers/characters";

const router = Router();

router.route("/").get((_req, res) => {
  res.send("Character API running");
});

router.route("/all").get(getAllCharacters);

export default router;
