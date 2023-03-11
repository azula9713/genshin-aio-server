import { CharacterData, Costume } from "enka-network-api";
import { Request, Response } from "express";
import { GetCharacterEnkaIdInput } from "../schemas/enkaCharacter.schema";

import {
  getAllChatactersFromEnka,
  getCharacterByEnkaId,
} from "../services/EnkaClient";

import logger from "../utils/logger";

export const getAllCharacters = async (req: Request<{}, {}>, res: Response) => {
  try {
    let characters: any[] = [];
    const response: CharacterData[] = getAllChatactersFromEnka();

    response.forEach((character) => {
      characters.push({
        id:
          character._nameId + character.element?.name.get("en") + character.id,
        enkaId: character.id,
        name: character.name.get("en"),
        nameId: character._nameId,
        rarity: character.rarity,
        iconUrl: character.icon.url,
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

export const getCharacterById = async (
  req: Request<GetCharacterEnkaIdInput["params"]>,
  res: Response
) => {
  const { enkaId } = req.params;

  try {
    let character = {};
    let costumes: any = [];
    let skills: any = [];

    const response: CharacterData = getCharacterByEnkaId(parseInt(enkaId));

    response.skills.forEach((skill) => {
      skills.push({
        id: skill.id,
        name: skill.name.get("en"),
        descriprion: skill.description.get("en"),
        icon: skill.icon?.url,
      });
    });

    response.costumes.forEach((costume) => {
      costumes.push({
        id: costume.id,
        name: costume.name.get("en"),
        url: costume.splashImage?.url,
      });
    });

    character = {
      id: response.id,
      nameId: response._nameId,
      descriptions: response.description.get("en"),
      element: {
        id: response.element?.id,
        name: response.element?.name.get("en"),
      },
      splashImage: response.splashImage.url,
      rarity: response.rarity,
      stars: response.stars,
      costumes,
      skillDepotId: response.skillDepotId,
      skills,
      elementalSkill: {
        id: response.elementalSkill?.id,
        name: response.elementalSkill?.name.get("en"),
        description: response.elementalSkill?.description.get("en"),
        icon: response.elementalSkill?.icon.url,
        maxCharge: response.elementalSkill?.maxCharge,
        cooldown: response.elementalSkill?.cooldown,
      },
      elementalBurst: {
        id: response.elementalBurst?.id,
        name: response.elementalBurst?.name.get("en"),
        description: response.elementalBurst?.description.get("en"),
        icon: response.elementalBurst?.icon.url,
        maxCharge: response.elementalBurst?.maxCharge,
        cooldown: response.elementalBurst?.cooldown,
      },
    };
    res.send(character);
  } catch (error) {
    logger.error(error);
  }
};
