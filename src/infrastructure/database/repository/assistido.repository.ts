import AppError from "../../../application/errors/appError";
import { encrypt, decrypt } from "../../../application/utils/crypto";
import { hashDocumento, normalizeDocumento } from "../../../application/utils/documento.hash";
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
    // Documento cifrado usa IV aleatório; a busca é feita pelo hash determinístico.
    if (!normalizeDocumento(documento)) return null;

    try {
      const show = await prisma.assistidos.findUnique({
        select: {
          id: true,
          nome: true,
          documento: true,
          data_nascimento: true,
          imagem: true,
        },
        where: { documento_hash: hashDocumento(documento) },
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
          documento_hash: normalizeDocumento(documento) ? hashDocumento(documento) : null,
          data_nascimento: data_nascimento ?? null,
          imagem: imagem ?? null,
        },
      });

      const { documento_hash: _h, ...criado } = assistido;
      return {
        ...criado,
        documento: decrypt(criado.documento),
      };
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }

  async update(id: number, input: IAssistido): Promise<IAssistido> {
    try {
      const data: Record<string, any> = {};

      for (const [key, value] of Object.entries(input)) {
        if (value !== undefined && value !== null && value !== "") {
          if (key === "documento") {
            data.documento = encrypt(value);
            data.documento_hash = normalizeDocumento(value) ? hashDocumento(value) : null;
          } else {
            data[key] = value;
          }
        }
      }

      const update = await prisma.assistidos.update({
        where: { id },
        data,
      });

      const { documento_hash: _h, ...atualizado } = update;
      return {
        ...atualizado,
        documento: decrypt(atualizado.documento),
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
