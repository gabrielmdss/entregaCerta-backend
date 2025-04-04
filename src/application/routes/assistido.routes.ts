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
assistidoRoutes.post('/assistido', (req,res, next) => {
    assistidoController.insert(req, res, next)
});
assistidoRoutes.get('/assistido/total', (req,res, next) => {
    assistidoController.countAllAssistidos(req, res, next)
});
assistidoRoutes.get('/assistido/documento/:documento', (req,res, next) => {
    assistidoController.getByDocumento(req, res, next)
});
assistidoRoutes.get('/assistido/:id', (req,res, next) => {
    assistidoController.getById(req, res, next)
});
assistidoRoutes.put('/assistido/:id', (req,res, next) => {
    assistidoController.update(req, res, next)
});
assistidoRoutes.delete('/assistido/:id', (req,res, next) => {
    assistidoController.delete(req, res, next)
});




export default assistidoRoutes;