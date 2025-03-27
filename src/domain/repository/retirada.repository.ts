import { IRetirada, IRetiradasPorMes } from "../entity/retirada.entity";

export interface RetiradaRepository {
        selectAll(page: number, pageSize: number): Promise<IRetirada[]>;
        selectById(id: number): Promise<IRetirada | null>;
        insert(input: IRetirada): Promise<IRetirada>;
        update(id: number, input: IRetirada): Promise<IRetirada>;
        delete(id: number): Promise<void>;
        // =====================================>
        selectByAssistidoId(id: number): Promise<IRetirada[]>;
        countRetiradasByAssistido(id: number): Promise<number>;
        selectByData(data: string): Promise<IRetirada[]>;
        selectByDataIntervalo(dataInicial: string, dataFinal: string): Promise<IRetirada[]>;
        countRetiradas(): Promise<number>;
        countByMes(ano: string): Promise<IRetiradasPorMes[]>;
        selectLastFive():Promise<IRetirada[]>;
}