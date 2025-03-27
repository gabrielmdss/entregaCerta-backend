import { IEstoque } from "../../domain/entity/estoque.entity";
import { EstoqueRepository } from "../../domain/repository/estoque.repository";
import AppError from "../errors/appError";
import * as status from "../../constraints/http.status";

export default class EstoqueService {
  constructor(private estoqueRepository: EstoqueRepository) {}

  async getAll(): Promise<IEstoque[]> {
    const index = await this.estoqueRepository.selectAll();
    return index;
  }
  async getById(id: number): Promise<IEstoque> {
    const show = await this.estoqueRepository.selectById(id);

    if (!show) {
      throw new AppError("Item do estoque não encontrado", status.NOT_FOUND);
    }
    return show;
  }
  async insert(input: IEstoque): Promise<IEstoque> {
    if (!input.quantidade || !input.quantidade) {
      throw new AppError("Preencha todos os dados", status.BAD_REQUEST);
    }

    const itemByDescricao = await this.estoqueRepository.selectByDescricao(
      input.descricao
    );

    if (itemByDescricao) {
      throw new AppError("Item já cadastrado", status.INTERNAL_SERVER);
    }

    const insumo = await this.estoqueRepository.insert(input);

    return insumo;
  }
  async update(id: number, input: IEstoque): Promise<IEstoque> {
    const insumoById = await this.estoqueRepository.selectById(id);

    if (!insumoById) {
      throw new AppError("insumo não encontrado", status.INTERNAL_SERVER);
    }

    const insumoAtualizado = await this.estoqueRepository.update(id, input);
    return insumoAtualizado;
  }
  async delete(id: number): Promise<void> {
    const insumo = await this.estoqueRepository.selectById(id);

    if (!insumo) {
      throw new AppError("Insumo não encontrado", status.INTERNAL_SERVER);
    }

    await this.estoqueRepository.delete(id);

    return;
  }
  async adjustStock(id: number, quantidade: number): Promise<IEstoque | null> {
    const insumo = await this.estoqueRepository.selectById(id);

    if (insumo?.quantidade !== undefined) {
      if (quantidade < 0 && insumo.quantidade < Math.abs(quantidade)) {
        throw new AppError(
          `Quantidade de ${insumo.descricao}(s) insuficiente`,
          status.INTERNAL_SERVER
        );
      }
    }
    const adjustInsumo = await this.estoqueRepository.adjustStock(
      id,
      quantidade
    );
    return adjustInsumo;
  }
}
