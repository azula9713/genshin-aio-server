import { WeaponData } from "enka-network-api";
import { Request, Response } from "express";
import { getAllWeaponsFromEnka } from "../services/EnkaClient";
import { decryptTextAsset } from "../utils/EnkaAssetMapper";
import logger from "../utils/logger";

export const getWeaponsForAllCharacters = async (
  req: Request<{}, {}>,
  res: Response
) => {
  try {
    const response: WeaponData[] = getAllWeaponsFromEnka();

    const weapons = response.map((weapon) => {
      return {
        weaponType: weapon.weaponType,
        signatureWeapon: weapon.id,
        name: decryptTextAsset(weapon.name),
        icon: weapon.icon.url,
      };
    });

    res.send(weapons);
  } catch (error) {
    logger.error(error);
  }
};
