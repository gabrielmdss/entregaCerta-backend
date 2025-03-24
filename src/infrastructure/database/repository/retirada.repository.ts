import AppError from "../../../application/errors/appError";
import { getErrorMessage } from "../../../constraints/sql.errors.code";
import { IRetirada } from "../../../domain/entity/retirada.entity";
import { RetiradaRepository } from "../../../domain/repository/retirada.repository";
import { pool } from "../../config/database";
import { deleteRetirada, insertRetirada, selectAllretiradas, selectRetiradaByAssistidoId, selectRetiradaById, updateRetirada } from "../scripts/retirada.script";

export default class RetiradaDatabaseRepository implements RetiradaRepository {
    async selectAll(): Promise<IRetirada[]> {
        try {
            const index: IRetirada[] = (await pool.query(selectAllretiradas())).rows;
            return index
        } catch (error: any) {
            getErrorMessage(error);
            throw new AppError('Erro desconhecido', error)
        }
    }
    async selectById(id: number): Promise<IRetirada> {
        try {
            const show = (await  pool.query(selectRetiradaById(),[id])).rows[0];
            return show
        } catch (error: any) {
            getErrorMessage(error);
            throw new AppError('Erro desconhecido', error)
        }
    }
    async selectByAssistidoId(id: number): Promise<IRetirada[]> {
        try {
            const show = (await  pool.query(selectRetiradaByAssistidoId(),[id])).rows;
            return show
        } catch (error: any) {
            getErrorMessage(error);
            throw new AppError('Erro desconhecido', error)
        }
    }
    async insert(input: IRetirada): Promise<IRetirada> {
        const client = await pool.connect();
        try {
            const {assistido_id} = input;
            await client.query('BEGIN');
            const insert = (await client.query(insertRetirada(), [assistido_id])).rows[0];
            await client.query('COMMIT');
            return insert
        } catch (error: any) {
            await client.query('ROLLBACK');
            getErrorMessage(error);
            throw new AppError('Erro desconhecido', error)
        }
    }
    async update(id: number, input: IRetirada): Promise<IRetirada> {
        const client = await pool.connect();
        try {
            const {assistido_id, data_retirada} = input;
            await client.query('BEGIN');
            const update = (await client.query(updateRetirada(), [assistido_id, data_retirada, id])).rows[0];
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
            const deleteUser = (await client.query(deleteRetirada(), [id]));
            await client.query('COMMIT');
            return
        } catch (error: any) {
            await client.query('ROLLBACK');
            getErrorMessage(error);
            throw new AppError('Erro desconhecido', error)
        }
    }
}