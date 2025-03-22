import { Request, Response, NextFunction } from "express";
import AssistidoService from "../services/assistido.service";

export default class AssistidoController {
    constructor(private readonly assistidoService: AssistidoService){}

    async getAll(request: Request, response: Response, next:NextFunction){
        const index = await this.assistidoService.getAll();
        return response.json(index);
    }
}