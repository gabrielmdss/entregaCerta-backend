import AppError from "../../../application/errors/appError";
import { getErrorMessage } from "../../../constraints/sql.errors.code";
import { IAssistido } from "../../../domain/entity/assistido.entity";
import { AssistidoRepository } from "../../../domain/repository/assistido.repository";
import { pool } from "../../config/database";
import { deleteAssistido, insertAssistido, selectAllAssistidos, selectAssistidoById, updateAssistido } from "../scripts/assistido.script";
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
    async insert(input: IAssistido): Promise<IAssistido> {
        const client = await pool.connect();
        try {
            const {nome, documento} = input;
            await client.query('BEGIN');
            const insert = (await client.query(insertAssistido(), [nome, documento])).rows[0];
            await client.query('COMMIT');
            return insert
        } catch (error: any) {
            await client.query('ROLLBACK');
            getErrorMessage(error);
            throw new AppError('Erro desconhecido', error)
        }
    }
    async update(id: number, input: IAssistido): Promise<IAssistido> {
        const client = await pool.connect();
        try {
            const {nome, documento} = input;
            await client.query('BEGIN');
            const update = (await client.query(updateAssistido(), [nome, documento, id])).rows[0];
            await client.query('COMMIT');
            return update
        } catch (error: any) {
            await client.query('ROLLBACK');
            getErrorMessage(error);
            throw new AppError('Erro desconhecido', error)
        }
    }
    async delete(id: number): Promise<void> {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const deleteUser = (await client.query(deleteAssistido(), [id]));
            await client.query('COMMIT');
            return
        } catch (error: any) {
            await client.query('ROLLBACK');
            getErrorMessage(error);
            throw new AppError('Erro desconhecido', error)
        }
    }
}