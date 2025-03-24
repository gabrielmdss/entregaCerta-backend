import { IAssistido } from "../entity/assistido.entity";

export interface AssistidoRepository {
    selectAll(): Promise<IAssistido[]>;
    selectById(id: number): Promise<IAssistido>;
    insert(input: IAssistido): Promise<IAssistido>;
    update(id: number, input: IAssistido): Promise<IAssistido>;
    // delete(id: number): Promise<void>;
}