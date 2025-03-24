import AppError from "../errors/appError";
import * as status from "../../constraints/http.status";
import { RetiradaRepository } from "../../domain/repository/retirada.repository";
import { IRetirada } from "../../domain/entity/retirada.entity";

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
}
