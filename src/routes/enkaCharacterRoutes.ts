import { Router } from "express";
import { getAllCharacters, getCharacterById } from "../controllers/characters";

const router = Router();

router.route("/").get((_req, res) => {
  res.send("Character API running");
});

router.route("/all").get(getAllCharacters);
router.route("/:enkaId").get(getCharacterById);

export default router;
