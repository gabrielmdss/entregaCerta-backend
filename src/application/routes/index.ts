import { Router } from "express";
import assistidoRoutes from "./assistido.routes";
import retiradaRoutes from "./retirada.routes";

const routes: Router = Router();

routes.use(assistidoRoutes);
routes.use(retiradaRoutes);


export default routes;