import { Router } from "express";
import EstoqueDatabaseRepository from "../../infrastructure/database/repository/estoque.repository";
import EstoqueService from "../services/estoque.service";
import EstoqueController from "../controllers/estoque.controller";

const estoqueRoutes = Router();

const estoqueRepository = new EstoqueDatabaseRepository();
const estoqueService = new EstoqueService(estoqueRepository);
const estoqueController = new EstoqueController(estoqueService);

estoqueRoutes.get('/estoque', (req,res, next) => {
    estoqueController.getAll(req, res, next)    
});
estoqueRoutes.post('/estoque', (req,res, next) => {
    estoqueController.insert(req, res, next)
});
estoqueRoutes.get('/estoque/:id', (req,res, next) => {
    estoqueController.getById(req, res, next)
});
estoqueRoutes.put('/estoque/:id', (req,res, next) => {
    estoqueController.update(req, res, next)
});
estoqueRoutes.delete('/estoque/:id', (req,res, next) => {
    estoqueController.delete(req, res, next)
});

export default estoqueRoutes;