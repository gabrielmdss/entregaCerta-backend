import AppError from "../../../application/errors/appError";
import { mapRetiradaToDTO } from "../../../constraints/mapper";
import { getErrorMessage } from "../../../constraints/sql.errors.code";
import {
  IRetirada,
  IRetiradasPorMes,
} from "../../../domain/entity/retirada.entity";
import { RetiradaRepository } from "../../../domain/repository/retirada.repository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default class RetiradaDatabaseRepository implements RetiradaRepository {
  async selectAll(): Promise<IRetirada[]> {
    try {
      const index = await prisma.retiradas.findMany({
        include: {
          assistidos: {
            select: {
              id: true,
              nome: true,
              documento: true,
            },
          },
        },
      });

      const result = index.map(mapRetiradaToDTO);

      return result;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }

  async selectById(id: number): Promise<IRetirada | null> {
    try {
      const show = await prisma.retiradas.findUnique({
        include: {
          assistidos: {
            select: {
              id: true,
              nome: true,
              documento: true,
            },
          },
        },
        where: { id },
      });

      if (show) {
        const result = {
          id: show.id,
          assistido_id: show.assistido_id,
          data_retirada: show.data_retirada,
          nome: show.assistidos.nome,
          documento: show.assistidos.documento,
        };
        return result;
      } else {
        return null;
      }
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
  async selectByAssistidoId(id: number): Promise<IRetirada[]> {
    try {
      const show = await prisma.retiradas.findMany({
        include: {
          assistidos: {
            select: {
              id: true,
              nome: true,
              documento: true,
            },
          },
        },
        where: { assistido_id: id },
      });
      const result = show.map(mapRetiradaToDTO);
      return result;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
  async insert(input: IRetirada): Promise<IRetirada> {
    try {
      const { assistido_id, data_retirada } = input;
      const insert = await prisma.retiradas.create({
        data: {
          assistido_id,
          data_retirada: data_retirada
        },
      });
      return insert;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
  async update(id: number, input: IRetirada): Promise<IRetirada> {
    try {
      const { assistido_id, data_retirada } = input;
      const update = prisma.retiradas.update({
        data: {
          assistido_id,
          data_retirada: new Date (data_retirada),
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
      await prisma.retiradas.delete({
        where: { id },
      });
      return;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
  async countRetiradasByAssistido(id: number): Promise<number> {
    try {
      const show = prisma.retiradas.count({
        where: { assistido_id: id },
      });
      return show;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
  async selectByData(data: string): Promise<IRetirada[]> {
    try {
      const index = await prisma.retiradas.findMany({
        include: {
          assistidos: {
            select: {
              id: true,
              nome: true,
              documento: true,
            },
          },
        },
        where: { data_retirada: new Date(data) },
      });

      const result = index.map(mapRetiradaToDTO)
      return result;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
  async selectByDataIntervalo(
    dataInicial: string,
    dataFinal: string
  ): Promise<IRetirada[]> {
    try {
      const retiradas = await prisma.retiradas.findMany({
        where: {
          data_retirada: {
            gte: new Date(dataInicial),
            lte: new Date(dataFinal),
          },
        },
        include: {
          assistidos: {
            select: {
              nome: true,
              documento: true,
            },
          },
        },
        orderBy: {
          data_retirada: "desc",
        },
      });

      const result = retiradas.map(mapRetiradaToDTO)

      return result;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }
  async countByMes(ano: string): Promise<IRetiradasPorMes[]> {
    try {
      const retiradasPorMes = await prisma.retiradas.findMany({
        where: {
          data_retirada: {
            gte: new Date(`${ano}-01-01`),
            lte: new Date(`${ano}-12-31`),
          },
        },
        select: {
          data_retirada: true,
        },
      });

      const retiradasAgrupadas: Record<string, number> = {};

      retiradasPorMes.forEach((item) => {
        const mesAno = `${
          item.data_retirada.getMonth() + 1
        }-${item.data_retirada.getFullYear()}`;
        if (retiradasAgrupadas[mesAno]) {
          retiradasAgrupadas[mesAno] += 1;
        } else {
          retiradasAgrupadas[mesAno] = 1;
        }
      });

      const resultado = Object.keys(retiradasAgrupadas).map((key) => {
        const [mes, ano] = key.split("-");
        const mesNome = new Date(`${ano}-${mes}-01`).toLocaleString("default", {
          month: "long",
        });
        return {
          mes: `${mesNome} de ${ano}`,
          total: retiradasAgrupadas[key],
        };
      });

      return resultado;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro desconhecido", error);
    }
  }

  async selectLastFive(): Promise<IRetirada[]> {
    try {
      const retiradas = await prisma.retiradas.findMany({
        take: 5,
        orderBy: {
          data_retirada: "desc",
        },
        include: {
          assistidos: {
            select: {
              nome: true,
              documento: true,
            },
          },
        },
      });

      const result = retiradas.map(mapRetiradaToDTO)

      return result;
    } catch (error: any) {
      getErrorMessage(error);
      throw new AppError("Erro ao buscar últimas retiradas", error);
    }
  }
}
