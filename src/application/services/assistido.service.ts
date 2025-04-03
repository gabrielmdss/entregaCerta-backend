import { IAssistido } from "../../domain/entity/assistido.entity";
import { AssistidoRepository } from "../../domain/repository/assistido.repository";
import AppError from "../errors/appError";
import * as status from "../../constraints/http.status";

export default class AssistidoService {
  constructor(private readonly assistidoRepository: AssistidoRepository) {}
  async getAll(): Promise<IAssistido[]> {
    const index = await this.assistidoRepository.selectAll();
    return index;
  }
  async getById(id: number): Promise<IAssistido> {
    const show = await this.assistidoRepository.selectById(id);

    if (!show) {
      throw new AppError("Assistido não encontrado", status.NOT_FOUND);
    }
    return show;
  }
  async getByDocumento(documento: string): Promise<IAssistido> {
    const show = await this.assistidoRepository.selectByDocumento(documento);

    if (!show) {
      throw new AppError("Assistido não encontrado", status.NOT_FOUND);
    }
    return show;
  }
  async insert(input: IAssistido): Promise<IAssistido> {
    
    if (!input.nome || !input.documento) {
      throw new AppError("Preencha todos os dados", status.BAD_REQUEST);
    }
    
    const assistidoByDocumento =
    await this.assistidoRepository.selectByDocumento(input.documento);
    
    if (assistidoByDocumento) {
      throw new AppError("Documento já cadastrado", status.INTERNAL_SERVER);
    }
    
    const assistido = await this.assistidoRepository.insert(input);

    return assistido;
  }
  async update(id: number, input: IAssistido): Promise<IAssistido> {
    const assistido = await this.assistidoRepository.selectById(id);

    if (!assistido) {
      throw new AppError("Assistido não encontrado", status.INTERNAL_SERVER);
    }

    if (!input || Object.keys(input).length === 0 || (!input.nome?.trim() && !input.documento?.trim())) {
      throw new AppError("Forneça ao menos um dado para atualização", status.INTERNAL_SERVER);
    }
    

    const assistidoAtualizado = await this.assistidoRepository.update(
      id,
      input
    );

    return assistidoAtualizado;
  }
  async delete(id: number): Promise<void> {
    const assistido = await this.assistidoRepository.selectById(id);

    if (!assistido) {
      throw new AppError("Assistido não encontrado", status.INTERNAL_SERVER);
    }

    const deleteAssistido = await this.assistidoRepository.delete(id);

    return;
  }
  async countAllAssistidos(): Promise<number> {
    const show = await this.assistidoRepository.countAllAssistidos();

    if (!show) {
      throw new AppError("Nenhum assistido cadastrado", status.NOT_FOUND);
    }
    return show;
  }
}
