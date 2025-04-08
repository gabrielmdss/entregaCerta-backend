import AppError from "../../../application/errors/appError";
import { encrypt, decrypt } from "../../../application/utils/crypto"; // <- Adicionamos o decrypt aqui
import { getErrorMessage } from "../../../application/utils/sql.errors.code";
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
          data_nascimento: true,
          imagem: true,
        },
      });

      return index.map((assistido) => ({
        ...assistido,
        documento: decrypt(assistido.documento),
      }));
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
          data_nascimento: true,
          imagem: true,
        },
        where: { id },
      });

      if (!show) return null;

      return {
        ...show,
        documento: decrypt(show.documento),
      };
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }

  async selectByDocumento(documento: string): Promise<IAssistido | null> {

    const encryptedDocument = encrypt(documento)

    try {
      const show = await prisma.assistidos.findFirst({
        select: {
          id: true,
          nome: true,
          documento: true,
          data_nascimento: true,
          imagem: true,
        },
        where: { documento: encryptedDocument },
      });

      if (!show) return null;

      return {
        ...show,
        documento: decrypt(show.documento),
      };
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }

  async insert(input: IAssistido): Promise<IAssistido> {
    try {
      const { nome, documento, data_nascimento, imagem } = input;

      const assistido = await prisma.assistidos.create({
        data: {
          nome,
          documento: encrypt(documento), 
          data_nascimento: data_nascimento ?? null,
          imagem: imagem ?? null,
        },
      });

      return {
        ...assistido,
        documento: decrypt(assistido.documento),
      };
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }

  async update(id: number, input: IAssistido): Promise<IAssistido> {
    try {
      const data: Partial<IAssistido> = {};

      for (const [key, value] of Object.entries(input)) {
        if (value !== undefined && value !== null && value !== "") {
          (data as any)[key] = key === "documento" ? encrypt(value) : value;
        }
      }

      const update = await prisma.assistidos.update({
        where: { id },
        data,
      });

      return {
        ...update,
        documento: decrypt(update.documento),
      };
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
