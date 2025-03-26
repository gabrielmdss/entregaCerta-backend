"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../../../application/errors/appError"));
const sql_errors_code_1 = require("../../../constraints/sql.errors.code");
const database_1 = require("../../config/database");
const assistido_script_1 = require("../scripts/assistido.script");
class AssistidoDatabaseRepository {
    selectAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const index = (yield database_1.pool.query((0, assistido_script_1.selectAllAssistidos)())).rows;
                return index;
            }
            catch (error) {
                (0, sql_errors_code_1.getErrorMessage)(error);
                throw new appError_1.default('Erro desconhecido', error);
            }
        });
    }
    selectById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const show = (yield database_1.pool.query((0, assistido_script_1.selectAssistidoById)(), [id])).rows[0];
                return show;
            }
            catch (error) {
                (0, sql_errors_code_1.getErrorMessage)(error);
                throw new appError_1.default('Erro desconhecido', error);
            }
        });
    }
    selectByDocumento(documento) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const show = (yield database_1.pool.query((0, assistido_script_1.selectAssistidoByDocumento)(), [documento])).rows[0];
                return show;
            }
            catch (error) {
                (0, sql_errors_code_1.getErrorMessage)(error);
                throw new appError_1.default('Erro desconhecido', error);
            }
        });
    }
    insert(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield database_1.pool.connect();
            try {
                const { nome, documento } = input;
                yield client.query('BEGIN');
                const insert = (yield client.query((0, assistido_script_1.insertAssistido)(), [nome, documento])).rows[0];
                yield client.query('COMMIT');
                return insert;
            }
            catch (error) {
                yield client.query('ROLLBACK');
                (0, sql_errors_code_1.getErrorMessage)(error);
                throw new appError_1.default('Erro desconhecido', error);
            }
        });
    }
    update(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield database_1.pool.connect();
            try {
                const { nome, documento } = input;
                yield client.query('BEGIN');
                const update = (yield client.query((0, assistido_script_1.updateAssistido)(), [nome, documento, id])).rows[0];
                yield client.query('COMMIT');
                return update;
            }
            catch (error) {
                yield client.query('ROLLBACK');
                (0, sql_errors_code_1.getErrorMessage)(error);
                throw new appError_1.default('Erro desconhecido', error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield database_1.pool.connect();
            try {
                yield client.query('BEGIN');
                const deleteUser = (yield client.query((0, assistido_script_1.deleteAssistido)(), [id]));
                yield client.query('COMMIT');
                return;
            }
            catch (error) {
                yield client.query('ROLLBACK');
                (0, sql_errors_code_1.getErrorMessage)(error);
                throw new appError_1.default('Erro desconhecido', error);
            }
        });
    }
    countAllAssistidos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.pool.query((0, assistido_script_1.countAssistidos)());
                const totalAssistidos = result.rows[0].total;
                return totalAssistidos;
            }
            catch (error) {
                (0, sql_errors_code_1.getErrorMessage)(error);
                throw new appError_1.default('Erro desconhecido', error);
            }
        });
    }
}
exports.default = AssistidoDatabaseRepository;
