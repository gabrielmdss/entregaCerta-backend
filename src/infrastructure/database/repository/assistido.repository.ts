import AppError from "../../../application/errors/appError";
import { getErrorMessage } from "../../../constraints/sql.errors.code";
import { IAssistido } from "../../../domain/entity/assistido.entity";
import { AssistidoRepository } from "../../../domain/repository/assistido.repository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default class AssistidoDatabaseRepository
  implements AssistidoRepository
{
  async selectAll(): Promise<IAssistido[]> {
    try {
      const index = await prisma.assistidos.findMany({
        select: {
          id: true,
          nome: true,
          documento: true,
        },
      });
      return index;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
  async selectById(id: number): Promise<IAssistido | null> {
    try {
      const show = await prisma.assistidos.findUnique({
        select: {
          id: true,
          nome: true,
          documento: true,
        },
        where: { id },
      });
      return show;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
  async selectByDocumento(documento: string): Promise<IAssistido | null> {
    try {
      const show = prisma.assistidos.findFirst({
        select: {
          id: true,
          nome: true,
          documento: true,
        },
        where: { documento },
      });
      return show;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
  async insert(input: IAssistido): Promise<IAssistido> {
    try {
      const { nome, documento } = input;
      const assistido = await prisma.assistidos.create({
        data: {
          nome,
          documento,
        },
      });
      return assistido;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }

  async update(id: number, input: IAssistido): Promise<IAssistido> {
    try {
      const { nome, documento } = input;
      const update = await prisma.assistidos.update({
        data: {
          nome,
          documento,
        },
        where: { id },
      });
      return update;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
  async delete(id: number): Promise<void> {
    try {
      await prisma.assistidos.delete({
        where: {
          id,
        },
      });
      return;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
  async countAllAssistidos(): Promise<number> {
    try {
      const result = await prisma.assistidos.count();
      return result;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
}
