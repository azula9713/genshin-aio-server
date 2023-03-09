import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { getAllChatactersFromEnka } from "../services/EnkaClient";
import logger from "../utils/logger";

export const getAllCharacters = async (req: Request<{}, {}>, res: Response) => {
  try {
    let characters: any[] = [];
    const response = getAllChatactersFromEnka();

    response.forEach((character) => {
      characters.push({
        id: uuidv4(),
        enkaId: character.id,
        name: character.name.get("en"),
        nameId: character._nameId,
        descriptions: character.description.get("en"),
        stars: character.stars,
        iconUrl: character.icon.url,
        rarity: character.rarity,
        element: {
          id: character.element?.id,
          name: character.element?.name.get("en"),
        },
      });
    });

    res.send(characters);
  } catch (error) {
    logger.error(error);
  }
};

// skills: character.skills.forEach((skill) => {
//   skills.push({
//     id: skill.id,
//     name: skill.name.get("en"),
//     descriprion: skill.description.get("en"),
//     icon: skill.icon.url,
//   });
// }),
// elementalBurst: {
//   id: character.elementalBurst?.id,
//   name: character.elementalBurst?.name.get("en"),
//   description: character.elementalBurst?.description.get("en"),
//   icon: character.elementalBurst?.icon.url,
// },
