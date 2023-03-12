import { Express } from "express";

import characterRoutes from "./enkaCharacterRoutes";
import weaponRoutes from "./enkaWeaponRoutes";

const routes = (server: Express): void => {
  server.use("/api/v1/enkaCharacters", characterRoutes);
  server.use("/api/v1/enkaWeapons", weaponRoutes);
};

export default routes;
