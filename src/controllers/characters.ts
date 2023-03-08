import { Request, Response } from "express";

import { getAllChatactersFromEnka } from "../services/EnkaClient";
import logger from "../utils/logger";

export const getAllCharacters = async (req: Request<{}, {}>, res: Response) => {
  try {
    const characters = getAllChatactersFromEnka();
    // console.log("Characters: ", characters.length);\
    console.log(characters);
    res.json(characters);
  } catch (error) {
    logger.error(error);
  }
};
