"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assistido_repository_1 = __importDefault(require("../../infrastructure/database/repository/assistido.repository"));
const assistido_service_1 = __importDefault(require("../services/assistido.service"));
const assistido_controller_1 = __importDefault(require("../controllers/assistido.controller"));
const assistidoRoutes = (0, express_1.Router)();
const assistidoRepository = new assistido_repository_1.default();
const assistidoService = new assistido_service_1.default(assistidoRepository);
const assistidoController = new assistido_controller_1.default(assistidoService);
assistidoRoutes.get('/assistido', (req, res, next) => {
    assistidoController.getAll(req, res, next);
});
assistidoRoutes.post('/assistido', (req, res, next) => {
    assistidoController.insert(req, res, next);
});
assistidoRoutes.get('/assistido/total', (req, res, next) => {
    assistidoController.countAllAssistidos(req, res, next);
});
assistidoRoutes.get('/assistido/documento/:documento', (req, res, next) => {
    assistidoController.getByDocumento(req, res, next);
});
assistidoRoutes.get('/assistido/:id', (req, res, next) => {
    assistidoController.getById(req, res, next);
});
assistidoRoutes.put('/assistido/:id', (req, res, next) => {
    assistidoController.update(req, res, next);
});
assistidoRoutes.delete('/assistido/:id', (req, res, next) => {
    assistidoController.delete(req, res, next);
});
exports.default = assistidoRoutes;
