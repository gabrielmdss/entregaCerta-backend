import { Request, Response, NextFunction } from "express";
import * as status from '../../constraints/http.status'
import RetiradaService from "../services/retirada.service";

export default class RetiradaController {
    constructor(private readonly retiradaService: RetiradaService){}

    async getAll(request: Request, response: Response, next:NextFunction){
        try {
            const index = await this.retiradaService.getAll();
            return response.status(status.SUCCESS).json(index);
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async getById(request: Request, response: Response, next:NextFunction){
        try {
            const {id} = request.params;
            const show = await this.retiradaService.getById(+id);
            return response.status(status.SUCCESS).json(show)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async getByAssistidoId(request: Request, response: Response, next:NextFunction){
        try {
            const {id} = request.params;
            const show = await this.retiradaService.getByAssistidoId(+id);
            return response.status(status.SUCCESS).json(show)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async insert(request: Request, response: Response, next:NextFunction){
        try {
            const { input } = request.body
            const insert = await this.retiradaService.insert(input);
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
            const update = await this.retiradaService.update(+id, input);
            return response.status(status.SUCCESS).json(update)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async delete(request: Request, response: Response, next:NextFunction){
        try {
            const { id } = request.params;
            const deleteRetirada = await this.retiradaService.delete(+id);
            return response.status(status.NO_CONTENT).json(deleteRetirada)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async countRetiradasByAssistidoId(request: Request, response: Response, next:NextFunction){
        try {
            const { id } = request.params;
            const show = await this.retiradaService.countRetiradasByAssistidoId(+id);
            return response.status(status.SUCCESS).json(show)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async selectRetiradasByData(request: Request, response: Response, next:NextFunction){
        try {
            const { data } = request.params;
            const show = await this.retiradaService.selectRetiradasByData(data);
            return response.status(status.SUCCESS).json(show)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async selectRetiradasByDataIntervalo(request: Request, response: Response, next:NextFunction){
        try {
            const { dataInicial, dataFinal } = request.params;
            const show = await this.retiradaService.selectRetiradaByDataIntervalo(dataInicial, dataFinal);
            return response.status(status.SUCCESS).json(show)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}