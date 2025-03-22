import cors from "cors";
import "dotenv/config";
import express, { Express } from "express";
import routes from "./application/routes";
import Errors from "./application/middlewares/errors";

const PORT: string | undefined = process.env.PORT;
const server: Express = express();

server.use(express.json());
server.use(cors());

server.use("/api/entregaCerta", routes);
server.use(Errors)

server.listen(PORT, () => {
    console.info(`server is running in port ${PORT}`);
});
