import { IAssistido } from "../../domain/entity/assistido.entity";
import { AssistidoRepository } from "../../domain/repository/assistido.repository";
import AppError from "../errors/appError";
import * as status from '../../constraints/http.status'

export default class AssistidoService {
    constructor(private readonly assistidoRepository: AssistidoRepository){}
    async getAll(): Promise<IAssistido[]>{
        const index = await this.assistidoRepository.selectAll();
        return index;
    }
    async getById(id: number): Promise<IAssistido>{
        const show = await this.assistidoRepository.selectById(id);

        if (!show) {
            throw new AppError('Assistido não encontrado', status.NOT_FOUND);
        }
        return show
    }
    async insert(input: IAssistido): Promise<IAssistido>{
        const assistido = await this.assistidoRepository.insert(input);

        if (!assistido) {
            throw new AppError('Assistido não cadastrado', status.INTERNAL_SERVER);
        }
        return assistido
    }
} 