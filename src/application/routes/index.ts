import { Router } from "express";
import assistidoRoutes from "./assistido.routes";

const routes: Router = Router();

routes.use(assistidoRoutes);

export default routes;