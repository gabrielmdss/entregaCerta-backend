import { selectRetiradaByDataIntervalo } from "./../../infrastructure/database/scripts/retirada.script";
import AppError from "../errors/appError";
import * as status from "../../constraints/http.status";
import { RetiradaRepository } from "../../domain/repository/retirada.repository";
import {
  IRetirada,
  IRetiradasPorMes,
} from "../../domain/entity/retirada.entity";

export default class RetiradaService {
  constructor(private readonly retiradaRepository: RetiradaRepository) {}
  async getAll(): Promise<IRetirada[]> {
    const index = await this.retiradaRepository.selectAll();
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

    if (!input.data_retirada || input.data_retirada === "") {
      const dataToday = new Date().toISOString().split("T")[0];
      input.data_retirada = dataToday
    }

    const retirada = await this.retiradaRepository.insert(input);
    return retirada;
  }

  async update(id: number, input: IRetirada): Promise<IRetirada> {
    const retirada = await this.retiradaRepository.selectById(id);

    if (!retirada) {
      throw new AppError("Retirada não encontrada", status.INTERNAL_SERVER);
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
  async countRetiradasByAssistidoId(id: number): Promise<number> {
    const show = await this.retiradaRepository.countRetiradasByAssistido(id);

    if (!show) {
      throw new AppError("Retirada não encontrada", status.NOT_FOUND);
    }
    return show;
  }
  async selectRetiradasByData(data: string): Promise<IRetirada[]> {
    const index = this.retiradaRepository.selectByData(data);

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

    const retiradas = await this.retiradaRepository.selectByDataIntervalo(
      dataInicial,
      dataFinal
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
