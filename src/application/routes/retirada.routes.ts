import { Router } from "express";
import RetiradaController from "../controllers/retirada.controller";
import RetiradaService from "../services/retirada.service";
import RetiradaDatabaseRepository from "../../infrastructure/database/repository/retirada.repository";

const retiradaRoutes = Router();

const retiradaDatabase = new RetiradaDatabaseRepository();
const retiradaService = new RetiradaService(retiradaDatabase);
const retiradaController = new RetiradaController(retiradaService);

retiradaRoutes.get('/retirada/:page/:pageSize', (req,res, next) => {
    retiradaController.getAll(req, res, next)
});
retiradaRoutes.post('/retirada', (req,res, next) => {
    retiradaController.insert(req, res, next)
});
retiradaRoutes.get('/retirada/ultimas', (req, res, next) => {
    retiradaController.selectLastFiveRetiradas(req, res, next);
});
retiradaRoutes.get('/retirada/total', (req,res, next) => {
    retiradaController.countRetiradas(req, res, next)
});
retiradaRoutes.get('/retirada/total/:id', (req,res, next) => {
    retiradaController.countRetiradasByAssistidoId(req, res, next)
});
retiradaRoutes.get('/retirada/assistido/:id', (req,res, next) => {
    retiradaController.getByAssistidoId(req, res, next)
});
retiradaRoutes.get('/retirada/data/:data', (req,res, next) => {
    retiradaController.selectRetiradasByData(req, res, next)
});
retiradaRoutes.get('/retirada/periodo/:dataInicial/:dataFinal', (req,res, next) => {
    retiradaController.selectRetiradasByDataIntervalo(req, res, next)
});
retiradaRoutes.get('/retirada/meses/:ano', (req, res, next) => {
    retiradaController.countRetiradasMesByAno(req, res, next);
});
retiradaRoutes.get('/retirada/:id', (req,res, next) => {
    retiradaController.getById(req, res, next)
});
retiradaRoutes.put('/retirada/:id', (req,res, next) => {
    retiradaController.update(req, res, next)
});
retiradaRoutes.delete('/retirada/:id', (req,res, next) => {
    retiradaController.delete(req, res, next)
});



export default retiradaRoutes;