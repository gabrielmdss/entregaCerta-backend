import { IEstoque } from "../entity/estoque.entity";

export interface EstoqueRepository {
  selectAll(): Promise<IEstoque[]>;
  selectById(id: number): Promise<IEstoque | null>;
  selectByDescricao(descricao: string | null): Promise<IEstoque | null>;
  insert(input: IEstoque): Promise<IEstoque>;
  update(id: number, input: IEstoque): Promise<IEstoque>;
  delete(id: number): Promise<void>;
  //======================================>
  adjustStock(id: number, quantidade: number): Promise<IEstoque | null>;
}
