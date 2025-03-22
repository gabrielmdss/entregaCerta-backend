import AppError from "../../../application/errors/appError";
import BadRequest from "../../../application/errors/appError";
import { getErrorMessage } from "../../../constraints/sql.errors.code";
import { IAssistido } from "../../../domain/entity/assistido.entity";
import { AssistidoRepository } from "../../../domain/repository/assistido.repository";
import { pool } from "../../config/database";
import { selectAllAssistidos, selectAssistidoById } from "../scripts/assistido.script";
export default class AssistidoDatabaseRepository implements AssistidoRepository {
    async selectAll(): Promise<IAssistido[]> {
        try {
            const index: IAssistido[] = (await pool.query(selectAllAssistidos())).rows;
            return index
        } catch (error: any) {
            getErrorMessage(error);
            throw new AppError('Erro desconhecido', error)
        }
    }
    async selectById(id: number): Promise<IAssistido> {
        try {
            const show = (await  pool.query(selectAssistidoById(),[id])).rows[0];
            return show
        } catch (error: any) {
            getErrorMessage(error);
            throw new AppError('Erro desconhecido', error)
        }
    }
    // insert(input: IAssistido): Promise<IAssistido> {
        
    // }
    // update(id: number, input: IAssistido): Promise<IAssistido> {
        
    // }
    // delete(id: number): Promise<void> {
        
    // }
}