import { Request, Response, NextFunction } from "express";
import AssistidoService from "../services/assistido.service";
import * as status from '../../constraints/http.status'

export default class AssistidoController {
    constructor(private readonly assistidoService: AssistidoService){}

    async getAll(request: Request, response: Response, next:NextFunction){
        try {
            const index = await this.assistidoService.getAll();
            return response.status(status.SUCCESS).json(index);
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async getById(request: Request, response: Response, next:NextFunction){
        try {
            const {id} = request.params;
            const show = await this.assistidoService.getById(+id);
            return response.status(status.SUCCESS).json(show)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async getByDocumento(request: Request, response: Response, next:NextFunction){
        try {
            const {documento} = request.params;
            const show = await this.assistidoService.getByDocumento(documento);
            return response.status(status.SUCCESS).json(show)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async insert(request: Request, response: Response, next:NextFunction){
        try {
            const input = request.body
            const insert = await this.assistidoService.insert(input);
            return response.status(status.CREATED).json(insert)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async update(request: Request, response: Response, next:NextFunction){
        try {
            const { id } = request.params;
            const { input } = request.body
            const update = await this.assistidoService.update(+id, input);
            return response.status(status.SUCCESS).json(update)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async delete(request: Request, response: Response, next:NextFunction){
        try {
            const { id } = request.params;
            const deleteAssitido = await this.assistidoService.delete(+id);
            return response.status(status.NO_CONTENT).json(deleteAssitido)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async countAllAssistidos(request: Request, response: Response, next:NextFunction){
        try {
            const show = await this.assistidoService.countAllAssistidos();
            return response.status(status.SUCCESS).json({total: show})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

}