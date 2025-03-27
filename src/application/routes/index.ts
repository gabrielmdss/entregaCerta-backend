import { Router } from "express";
import assistidoRoutes from "./assistido.routes";
import retiradaRoutes from "./retirada.routes";
import estoqueRoutes from "./estoque.routes";

const routes: Router = Router();

routes.use(assistidoRoutes);
routes.use(retiradaRoutes);
routes.use(estoqueRoutes);

export default routes;