import { IAssistido } from "../../domain/entity/assistido.entity";
import { AssistidoRepository } from "../../domain/repository/assistido.repository";

export default class AssistidoService {
    constructor(private readonly assistidoRepository: AssistidoRepository){}
    async getAll(): Promise<IAssistido[]>{
        const index = await this.assistidoRepository.selectAll();
        return index;
    }
}