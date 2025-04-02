import { Prisma } from '@prisma/client';
import AppError from '../application/errors/appError';
import * as status from './http.status';

// Erros comuns do PostgreSQL
export const sqlErrorCodes: Record<string, { message: string; statusCode: number }> = {
    '28P01': { message: 'Falha de autenticação. Usuário ou senha incorretos.', statusCode: status.UNAUTHORIZED },
    '3D000': { message: 'Banco de dados não encontrado.', statusCode: status.BAD_REQUEST },
    '08001': { message: 'Erro de conexão com o banco de dados.', statusCode: status.SERVICE_UNAVAILABLE },
    '42601': { message: 'Erro de sintaxe na consulta SQL.', statusCode: status.BAD_REQUEST },
    '42703': { message: 'Coluna não encontrada no banco de dados.', statusCode: status.BAD_REQUEST },
    '23505': { message: 'Chave única violada. Registro duplicado.', statusCode: status.CONFLICT },
    '23503': { message: 'Violação de chave estrangeira. Registro associado.', statusCode: status.CONFLICT },
    '23502': { message: 'Violação de campo obrigatório. Valor nulo não permitido.', statusCode: status.BAD_REQUEST },
    '57014': { message: 'Tempo limite de execução excedido.', statusCode: status.REQUEST_TIMEOUT },
    '53300': { message: 'Recursos insuficientes no banco de dados.', statusCode: status.SERVICE_UNAVAILABLE },
    '22003': { message: 'Valor fora do intervalo permitido para o tipo de dado.', statusCode: status.BAD_REQUEST },
    '22007': { message: 'Erro de formato de data/hora.', statusCode: status.BAD_REQUEST },
    '42P01': { message: 'Tabela não encontrada.', statusCode: status.BAD_REQUEST },
    'XX000': { message: 'Erro interno no PostgreSQL.', statusCode: status.INTERNAL_SERVER },
    '50000': { message: 'Erro genérico. Favor entrar em contato com o suporte.', statusCode: status.INTERNAL_SERVER }
};

// Tratamento de erros do Prisma e PostgreSQL
export const getErrorMessage = (error: any): never => {
    console.error('Erro capturado:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const errorCode = error.code;
        if (sqlErrorCodes[errorCode]) {
            throw new AppError(sqlErrorCodes[errorCode].message, sqlErrorCodes[errorCode].statusCode);
        }
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new AppError('Erro desconhecido no Prisma. Contate o suporte.', status.INTERNAL_SERVER);
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        throw new AppError('Erro de validação nos dados enviados.', status.BAD_REQUEST);
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
        throw new AppError('Erro ao inicializar o Prisma. Verifique a conexão com o banco.', status.SERVICE_UNAVAILABLE);
    }

    if (error instanceof Prisma.PrismaClientRustPanicError) {
        throw new AppError('Erro crítico interno no Prisma.', status.INTERNAL_SERVER);
    }

    // Caso não seja erro do Prisma, verifica os erros SQL conhecidos
    if (error.code && sqlErrorCodes[error.code]) {
        throw new AppError(sqlErrorCodes[error.code].message, sqlErrorCodes[error.code].statusCode);
    }

    // Caso contrário, erro genérico
    throw new AppError(error.message || 'Erro desconhecido.', status.INTERNAL_SERVER);
};
