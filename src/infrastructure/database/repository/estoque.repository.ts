import AppError from "../../../application/errors/appError";
import { getErrorMessage } from "../../../constraints/sql.errors.code";
import { IEstoque } from "../../../domain/entity/estoque.entity";
import { EstoqueRepository } from "../../../domain/repository/estoque.repository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class EstoqueDatabaseRepository implements EstoqueRepository {
  async selectAll(): Promise<IEstoque[]> {
    try {
      const index = await prisma.estoque.findMany({
        select: {
          id: true,
          quantidade: true,
          descricao: true,
          data_atualizacao: true,
        },
      });
      return index;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
  async selectById(id: number): Promise<IEstoque | null> {
    try {
      const show = await prisma.estoque.findUnique({
        select: {
          id: true,
          quantidade: true,
          descricao: true,
          data_atualizacao: true,
        },
        where: { id },
      });

      return show;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
  async selectByDescricao(descricao: string): Promise<IEstoque | null> {
    try {
      const show = await prisma.estoque.findFirst({
        select: {
          id: true,
          descricao: true,
          quantidade: true,
          data_atualizacao: true,
        },
        where: {
          descricao,
        },
      });
      return show;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
  async insert(input: IEstoque): Promise<IEstoque> {
    try {
      const { descricao, quantidade, data_atualizacao } = input;

      const show = prisma.estoque.create({
        data: {
          descricao,
          quantidade,
          data_atualizacao: data_atualizacao
            ? new Date(data_atualizacao)
            : new Date(),
        },
      });
      return show;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
  async update(id: number, input: IEstoque): Promise<IEstoque> {
    try {
      const { descricao, quantidade, data_atualizacao } = input;
      const show = await prisma.estoque.update({
        data: {
          descricao,
          quantidade,
          data_atualizacao: data_atualizacao
            ? new Date(data_atualizacao)
            : new Date(),
        },
        where: {
          id,
        },
      });
      return show;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
  async delete(id: number): Promise<void> {
    try {
      await prisma.estoque.delete({
        where: { id },
      });
      return;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
  async adjustStock(id: number, quantidade: number): Promise<IEstoque> {
    try {
      const updateStock = await prisma.estoque.update({
        where: { id },
        data: {
          quantidade: {
            increment: quantidade,
          },
          data_atualizacao: new Date(),
        },
      });
      return updateStock;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
}
