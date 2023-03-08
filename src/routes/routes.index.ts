import { Express } from "express";

import characterRoutes from "./characterRoutes";

const routes = (server: Express): void => {
  server.use("/api/v1/characters", characterRoutes);
};

export default routes;
