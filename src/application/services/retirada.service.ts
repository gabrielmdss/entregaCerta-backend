import AppError from "../errors/appError";
import * as status from "../../constraints/http.status";
import { RetiradaRepository } from "../../domain/repository/retirada.repository";
import {
  IRetirada,
  IRetiradasPorMes,
} from "../../domain/entity/retirada.entity";
import { EstoqueRepository } from "../../domain/repository/estoque.repository";
import EstoqueDatabaseRepository from "../../infrastructure/database/repository/estoque.repository";
import { AssistidoRepository } from "../../domain/repository/assistido.repository";
import AssistidoDatabaseRepository from "../../infrastructure/database/repository/assistido.repository";

export default class RetiradaService {
  private estoqueRepository: EstoqueRepository;
  private assistidoRepository: AssistidoRepository;

  constructor(private readonly retiradaRepository: RetiradaRepository) {
    this.estoqueRepository = new EstoqueDatabaseRepository();
    this.assistidoRepository = new AssistidoDatabaseRepository();
  }
  async getAll(): Promise<IRetirada[]> {
    const index = await this.retiradaRepository.selectAll();
    return index;
  }
  async getAllWithPagination(page: number, pageSize: number): Promise<IRetirada[]> {
    const index = await this.retiradaRepository.selectAllWithPagination(page, pageSize);
    return index;
  }
  async getById(id: number): Promise<IRetirada> {
    const show = await this.retiradaRepository.selectById(id);

    if (!show) {
      throw new AppError("Retirada não encontrada", status.NOT_FOUND);
    }
    return show;
  }
  async getByAssistidoId(id: number): Promise<IRetirada[]> {
    const show = await this.retiradaRepository.selectByAssistidoId(id);

    if (!show) {
      throw new AppError("Retirada não encontrada", status.NOT_FOUND);
    }
    return show;
  }
  async insert(input: IRetirada): Promise<IRetirada> {
    if (!input.assistido_id) {
      throw new AppError("Preencha todos os dados", status.BAD_REQUEST);
    }

    const assistido = await this.assistidoRepository.selectById(
      input.assistido_id
    );

    if (!assistido) {
      throw new AppError(
        "Assistido não cadastrado, entre em contato com o suporte",
        status.BAD_REQUEST
      );
    }

    if (!input.data_retirada || input.data_retirada === "") {
      input.data_retirada = new Date().toISOString();
    } else {
      input.data_retirada = new Date(input.data_retirada).toISOString();
    }
    
    const estoque = await this.estoqueRepository.selectById(1)

    if (!estoque || estoque.quantidade === undefined || estoque.quantidade < 1) {
      throw new AppError(
        "Estoque insuficiente",
        status.BAD_REQUEST
      );
    }
  
    const retirada = await this.retiradaRepository.insert(input);

    await this.estoqueRepository.adjustStock(1, -1);

    return retirada;
  }
  async update(id: number, input: IRetirada): Promise<IRetirada> {
    const retirada = await this.retiradaRepository.selectById(id);

    if (!retirada) {
      throw new AppError("Retirada não encontrada", status.INTERNAL_SERVER);
    }

    if (!input.data_retirada || input.data_retirada === "") {
      input.data_retirada = new Date().toISOString();
    } else {
      input.data_retirada = new Date(input.data_retirada).toISOString();
    }
    

    const retiradaAtualizada = await this.retiradaRepository.update(id, input);

    return retiradaAtualizada;
  }
  async delete(id: number): Promise<void> {
    const retirada = await this.retiradaRepository.selectById(id);

    if (!retirada) {
      throw new AppError("Retirada não encontrado", status.INTERNAL_SERVER);
    }

    const deleteRetirada = await this.retiradaRepository.delete(id);

    return;
  }
  async countRetiradas(): Promise<number>{
    const show = this.retiradaRepository.countRetiradas();
    if (!show) {
      throw new AppError("Erro ao contabilizar retiradas", status.NOT_FOUND);
    }
    return show;
  }
  async countRetiradasByAssistidoId(id: number): Promise<number> {
    const show = await this.retiradaRepository.countRetiradasByAssistido(id);

    if (!show) {
      throw new AppError("Retirada não encontrada", status.NOT_FOUND);
    }
    return show;
  }
  async selectRetiradasByData(data: string): Promise<IRetirada[]> {
    const date = new Date(`${data}T00:00:00.000Z`);

    const index = await this.retiradaRepository.selectByData(date.toISOString());

    if (!index) {
      throw new AppError(
        "Retirada não encontrada nesta data",
        status.NOT_FOUND
      );
    }

    return index;
  }
  async selectRetiradaByDataIntervalo(
    dataInicial: string,
    dataFinal: string
  ): Promise<IRetirada[]> {
    if (!dataInicial || !dataFinal) {
      throw new AppError(
        "As datas de início e fim são obrigatórias.",
        status.BAD_REQUEST
      );
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dataInicial) || !dateRegex.test(dataFinal)) {
      throw new AppError(
        "As datas devem estar no formato 'AAAA-MM-DD'.",
        status.BAD_REQUEST
      );
    }

    if (new Date(dataInicial) > new Date(dataFinal)) {
      throw new AppError(
        "A data inicial não pode ser posterior à data final.",
        status.BAD_REQUEST
      );
    }

    let dataInicialFormated = new Date(dataInicial).toISOString();
    let dataFinalFormated = new Date(dataFinal).toISOString();

    const retiradas = await this.retiradaRepository.selectByDataIntervalo(
      dataInicialFormated,
      dataFinalFormated
    );

    if (!retiradas) {
      throw new AppError(
        "Nenhuma retirada encontrada no intervalo especificado.",
        status.NOT_FOUND
      );
    }

    return retiradas;
  }
  async countRetiradasMesByAno(ano: string): Promise<IRetiradasPorMes[]> {
    const retiradas = await this.retiradaRepository.countByMes(ano);
    if (!retiradas || !retiradas.length) {
      throw new AppError(
        "Retiradas não encontradas neste ano",
        status.NOT_FOUND
      );
    }
    return retiradas;
  }
  async selectLastFiveRetiradas(): Promise<IRetirada[]> {
    const retiradas = await this.retiradaRepository.selectLastFive();
    if (!retiradas || !retiradas.length) {
      throw new AppError("Últimas retiradas não encontradas", status.NOT_FOUND);
    }
    return retiradas;
  }
}
