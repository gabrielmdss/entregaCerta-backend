import { IRetirada } from "../entity/retirada.entity";

export interface RetiradaRepository {
        selectAll(): Promise<IRetirada[]>;
        selectById(id: number): Promise<IRetirada>;
        insert(input: IRetirada): Promise<IRetirada>;
        update(id: number, input: IRetirada): Promise<IRetirada>;
        delete(id: number): Promise<void>;
        // =====================================>
        selectByAssistidoId(id: number): Promise<IRetirada[]>;
}