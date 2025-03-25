"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const retirada_controller_1 = __importDefault(require("../controllers/retirada.controller"));
const retirada_service_1 = __importDefault(require("../services/retirada.service"));
const retirada_repository_1 = __importDefault(require("../../infrastructure/database/repository/retirada.repository"));
const retiradaRoutes = (0, express_1.Router)();
const retiradaDatabase = new retirada_repository_1.default();
const retiradaService = new retirada_service_1.default(retiradaDatabase);
const retiradaController = new retirada_controller_1.default(retiradaService);
retiradaRoutes.get('/retirada', (req, res, next) => {
    retiradaController.getAll(req, res, next);
});
retiradaRoutes.post('/retirada', (req, res, next) => {
    retiradaController.insert(req, res, next);
});
retiradaRoutes.get('/retirada/total/:id', (req, res, next) => {
    retiradaController.countRetiradasByAssistidoId(req, res, next);
});
retiradaRoutes.get('/retirada/assistido/:id', (req, res, next) => {
    retiradaController.getByAssistidoId(req, res, next);
});
retiradaRoutes.get('/retirada/data/:data', (req, res, next) => {
    retiradaController.selectRetiradasByData(req, res, next);
});
retiradaRoutes.get('/retirada/periodo/:dataInicial/:dataFinal', (req, res, next) => {
    retiradaController.selectRetiradasByDataIntervalo(req, res, next);
});
retiradaRoutes.get('/retirada/meses/:ano', (req, res, next) => {
    retiradaController.countRetiradasMesByAno(req, res, next);
});
retiradaRoutes.get('/retirada/:id', (req, res, next) => {
    retiradaController.getById(req, res, next);
});
retiradaRoutes.put('/retirada/:id', (req, res, next) => {
    retiradaController.update(req, res, next);
});
retiradaRoutes.delete('/retirada/:id', (req, res, next) => {
    retiradaController.delete(req, res, next);
});
exports.default = retiradaRoutes;
