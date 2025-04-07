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
    const camposObrigatorios: (keyof IAssistido)[] = [
      "nome",
      "documento",
      "data_nascimento",
    ];

    for (const campo of camposObrigatorios) {
      if (!input[campo] || input[campo]?.toString().trim() === "") {
        throw new AppError(
          `Preencha todos os campos obrigatórios`,
          status.BAD_REQUEST
        );
      }
    }

    const assistidoByDocumento =
      await this.assistidoRepository.selectByDocumento(input.documento);

    if (assistidoByDocumento) {
      throw new AppError("Documento já cadastrado", status.INTERNAL_SERVER);
    }

    if (input.data_nascimento) {
      input.data_nascimento = new Date(input.data_nascimento);
    }

    const assistido = await this.assistidoRepository.insert(input);

    return assistido;
  }
  async update(id: number, input: IAssistido): Promise<IAssistido> {
    const camposObrigatorios: (keyof IAssistido)[] = [
      "nome",
      "documento",
      "data_nascimento",
      "imagem"
    ];
  
    const assistido = await this.assistidoRepository.selectById(id);
  
    if (!assistido) {
      throw new AppError("Assistido não encontrado", status.INTERNAL_SERVER);
    }
  
    const temAlgumCampoPreenchido = camposObrigatorios.some((campo) => {
      const valor = input[campo];
      return valor !== undefined && valor !== null && String(valor).trim() !== "";
    });
  
    if (!temAlgumCampoPreenchido) {
      throw new AppError(
        "Forneça ao menos um dado válido para atualização",
        status.BAD_REQUEST
      );
    }
  
    const assistidoAtualizado = await this.assistidoRepository.update(id, input);
  
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
