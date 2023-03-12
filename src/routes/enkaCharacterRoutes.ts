import { Router } from "express";

import { getAllCharacters, getCharacterById } from "../controllers/characters";
import validate from "../middleware/validateResource";
import { getCharacterByIdSchema } from "../schemas/enkaCharacter.schema";

const router = Router();

router.route("/").get((_req, res) => {
  res.send("Character API running");
});

router.route("/all").get(getAllCharacters);
router
  .route("/characterData")
  .get(validate(getCharacterByIdSchema), getCharacterById);

export default router;
