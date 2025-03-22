import AppError from '../application/errors/appError';
import * as status from './http.status';

// Erros comuns do PostgreSQL: https://www.postgresql.org/docs/current/errcodes-appendix.html
export const sqlErrorCodes: Record<string, { message: string; statusCode: number }> = {
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

export const getErrorMessage = (error: any): never => {
    console.error('getErrorMessage error:', error);

    const errorCode: string = error.code;

    const errorSql = sqlErrorCodes[errorCode];

    const message = errorSql?.message || error.message || 'Erro desconhecido no banco de dados.';
    const statusCode = errorSql?.statusCode || status.INTERNAL_SERVER;

    throw new AppError(message, statusCode);
};
