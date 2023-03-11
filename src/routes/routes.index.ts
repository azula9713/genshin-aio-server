import { Express } from "express";

import characterRoutes from "./enkaCharacterRoutes";

const routes = (server: Express): void => {
  server.use("/api/v1/enkaCharacters", characterRoutes);
};

export default routes;
