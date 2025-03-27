import { Request, Response, NextFunction } from "express";
import EstoqueService from "../services/estoque.service";
import * as status from "../../constraints/http.status";

export default class EstoqueController {
  constructor(private estoqueService: EstoqueService) {}

  async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      const index = await this.estoqueService.getAll();
      return response.status(status.SUCCESS).json(index);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getById(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const show = await this.estoqueService.getById(+id);
      return response.status(status.SUCCESS).json(show);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async insert(request: Request, response: Response, next: NextFunction) {
    try {
      const input = request.body;
      const insert = await this.estoqueService.insert(input);
      return response.status(status.CREATED).json(insert);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const input = request.body;
      const update = await this.estoqueService.update(+id, input);
      return response.status(status.SUCCESS).json(update);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const deleteInsumo = await this.estoqueService.delete(+id);
      return response.status(status.NO_CONTENT).json(deleteInsumo);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async adjustStock(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const { quantidade } = request.body;
      const adjust = await this.estoqueService.adjustStock(+id, quantidade);
      return response.status(status.SUCCESS).json(adjust);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
