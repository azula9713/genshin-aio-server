import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import routes from "./routes/routes.index";

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(compression());

const port = 4000;

server.listen(port, () => {
  console.log("Sever running on port " + port);
  routes(server);
});
