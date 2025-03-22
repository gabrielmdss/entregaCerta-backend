import BadRequest from "../../../application/errors/badRequest.error";
import { IAssistido } from "../../../domain/entity/assistido.entity";
import { AssistidoRepository } from "../../../domain/repository/assistido.repository";
import { pool } from "../../config/database";
import { selectAllAssistidos } from "../scripts/assistido.script";
export default class AssistidoDatabaseRepository implements AssistidoRepository {
    async selectAll(): Promise<IAssistido[]> {
        try {
            const index: IAssistido[] = (await pool.query(selectAllAssistidos())).rows;
            return index
        } catch (error: any) {
            throw new Error(error)
        }
    }
    // selectById(id: number): Promise<IAssistido> {
        
    // }
    // insert(input: IAssistido): Promise<IAssistido> {
        
    // }
    // update(id: number, input: IAssistido): Promise<IAssistido> {
        
    // }
    // delete(id: number): Promise<void> {
        
    // }
}