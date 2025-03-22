import { Request, Response, NextFunction } from "express";
import AssistidoService from "../services/assistido.service";

export default class AssistidoController {
    constructor(private readonly assistidoService: AssistidoService){}

    async getAll(request: Request, response: Response, next:NextFunction){
        try {
            const index = await this.assistidoService.getAll();
            return response.status(200).json(index);
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async getById(request: Request, response: Response, next:NextFunction){
        try {
            const {id} = request.params;
            const show = await this.assistidoService.getById(+id);
            return response.status(200).json(show)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}