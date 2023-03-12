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
import CharacterWeaponData from "../static/WeaponData.json";

import logger from "../utils/logger";

interface AllCharacterWeaponData {
  [key: string]: {
    weaponType: string;
    signatureWeapon: number;
    name: string;
    icon: string;
  };
}

export const getAllCharacters = async (req: Request<{}, {}>, res: Response) => {
  try {
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

  const weaponDetails: AllCharacterWeaponData =
    CharacterWeaponData.allCharacterWeaponData;

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
      name,
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
      name: decryptTextAsset(name),
      nameId,
      affiliation: decryptTextAsset(characterData.details?.location),
      constellation:
        nameId === "Zhongli"
          ? "Lapis De"
          : decryptTextAsset(characterData.details?.constellation),
      description: decryptTextAsset(description),
      weapon: weaponDetails[characterData.skillDepotId],
      element: {
        id: element?.id,
        name: decryptTextAsset(element?.name),
      },
      // weaponType: characterData.
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
