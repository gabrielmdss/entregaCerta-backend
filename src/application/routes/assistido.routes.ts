import { Router } from "express";
import AssistidoDatabaseRepository from "../../infrastructure/database/repository/assistido.repository";
import AssistidoService from "../services/assistido.service";
import AssistidoController from "../controllers/assistido.controller";

const assistidoRoutes = Router();

const assistidoRepository = new AssistidoDatabaseRepository();
const assistidoService = new AssistidoService(assistidoRepository);
const assistidoController = new AssistidoController(assistidoService);

assistidoRoutes.get('/assistido', (req,res, next) => {
    assistidoController.getAll(req, res, next)
});
assistidoRoutes.get('/assistido/:id', (req,res, next) => {
    assistidoController.getById(req, res, next)
});



export default assistidoRoutes;