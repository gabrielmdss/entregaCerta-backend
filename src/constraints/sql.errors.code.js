"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = exports.sqlErrorCodes = void 0;
const appError_1 = __importDefault(require("../application/errors/appError"));
const status = __importStar(require("./http.status"));
// Erros comuns do PostgreSQL: https://www.postgresql.org/docs/current/errcodes-appendix.html
exports.sqlErrorCodes = {
    '28P01': {
        message: 'Falha de autenticação. Usuário ou senha incorretos.',
        statusCode: status.UNAUTHORIZED
    },
    '3D000': {
        message: 'Banco de dados não encontrado.',
        statusCode: status.BAD_REQUEST
    },
    '08001': {
        message: 'Erro de conexão com o banco de dados.',
        statusCode: status.SERVICE_UNAVAILABLE
    },
    '42601': {
        message: 'Erro de sintaxe na consulta SQL.',
        statusCode: status.BAD_REQUEST
    },
    '42703': {
        message: 'Coluna não encontrada no banco de dados.',
        statusCode: status.BAD_REQUEST
    },
    '23505': {
        message: 'Chave única violada. Registro duplicado.',
        statusCode: status.CONFLICT
    },
    '23503': {
        message: 'Violação de chave estrangeira. Registro associado.',
        statusCode: status.CONFLICT
    },
    '23502': {
        message: 'Violação de campo obrigatório. Valor nulo não permitido.',
        statusCode: status.BAD_REQUEST
    },
    '57014': {
        message: 'Tempo limite de execução excedido.',
        statusCode: status.REQUEST_TIMEOUT
    },
    '53300': {
        message: 'Recursos insuficientes no banco de dados.',
        statusCode: status.SERVICE_UNAVAILABLE
    },
    '22003': {
        message: 'Valor fora do intervalo permitido para o tipo de dado.',
        statusCode: status.BAD_REQUEST
    },
    '22007': {
        message: 'Erro de formato de data/hora.',
        statusCode: status.BAD_REQUEST
    },
    '42P01': {
        message: 'Tabela não encontrada.',
        statusCode: status.BAD_REQUEST
    },
    'XX000': {
        message: 'Erro interno no PostgreSQL.',
        statusCode: status.INTERNAL_SERVER
    },
    '50000': {
        message: 'Erro genérico. Favor entrar em contato com o suporte.',
        statusCode: status.INTERNAL_SERVER
    }
};
const getErrorMessage = (error) => {
    console.error('getErrorMessage error:', error);
    const errorCode = error.code;
    const errorSql = exports.sqlErrorCodes[errorCode];
    const message = (errorSql === null || errorSql === void 0 ? void 0 : errorSql.message) || error.message || 'Erro desconhecido no banco de dados.';
    const statusCode = (errorSql === null || errorSql === void 0 ? void 0 : errorSql.statusCode) || status.INTERNAL_SERVER;
    throw new appError_1.default(message, statusCode);
};
exports.getErrorMessage = getErrorMessage;
