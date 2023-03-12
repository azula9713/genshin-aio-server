import {
  CharacterData,
  ElementalBurst,
  ElementalSkill,
} from "enka-network-api";
import { Request, Response } from "express";

import { GetCharacterEnkaIdInput } from "../schemas/enkaCharacter.schema";
import {
  getAllChatactersFromEnka,
  getCharacterByEnkaId,
} from "../services/EnkaClient";
import {
  decryptTextAsset,
  mapAbility,
  mapConstellations,
  mapCostumes,
  mapPassiveTalents,
  mapSkills,
} from "../utils/EnkaAssetMapper";

import logger from "../utils/logger";

export const getAllCharacters = async (req: Request<{}, {}>, res: Response) => {
  try {
    // let characters: any[] = [];
    const response: CharacterData[] = getAllChatactersFromEnka();

    const characters = response.map((character) => {
      const { _nameId, id, rarity, icon, element, skillDepotId } = character;

      return {
        id: skillDepotId + _nameId + id,
        enkaId: id,
        name: decryptTextAsset(character.name),
        nameId: character._nameId,
        rarity,
        iconUrl: icon.url,
        element: {
          id: element?.id,
          name: decryptTextAsset(element?.name),
        },
        skillDepotId,
      };
    });

    res.send(characters);
  } catch (error) {
    logger.error(error);
  }
};

export const getCharacterById = async (
  req: Request<{}, {}, GetCharacterEnkaIdInput["query"]>,
  res: Response
) => {
  const { enkaSkillDepotId, enkaId } = req.query;

  try {
    const characterData: CharacterData = getCharacterByEnkaId(
      Number(enkaId),
      Number(enkaSkillDepotId)
    );

    const skills = mapSkills(characterData.skills);
    const passiveTalents = mapPassiveTalents(characterData.passiveTalents);
    const constellations = mapConstellations(characterData.constellations);
    const costumes = mapCostumes(characterData.costumes);

    const {
      id,
      _nameId: nameId,
      description,
      element,
      splashImage: { url: splashImageUrl } = {},
      rarity,
      stars,
      skillDepotId,
    } = characterData;

    const character = {
      id,
      nameId,
      description: decryptTextAsset(description),
      element: {
        id: element?.id,
        name: decryptTextAsset(element?.name),
      },
      splashImageUrl,
      rarity,
      stars,
      costumes,
      skillDepotId,
      skills,
      passiveTalents,
      constellations,
      elementalSkill: mapAbility(
        characterData.elementalSkill as ElementalSkill
      ),
      elementalBurst: mapAbility(
        characterData.elementalBurst as ElementalBurst
      ),
      normalAttack: mapAbility(characterData.normalAttack),
    };

    res.send(character);
  } catch (error) {
    logger.error(error);
  }
};
