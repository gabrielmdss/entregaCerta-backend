import { Prisma } from '@prisma/client';
import AppError from '../errors/appError';
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

// Erros conhecidos do Prisma (PrismaClientKnownRequestError.code)
export const prismaErrorCodes: Record<string, { message: string; statusCode: number }> = {
    P2000: { message: 'Valor muito longo para o campo informado.', statusCode: status.BAD_REQUEST },
    P2002: { message: 'Registro duplicado. Já existe um cadastro com esses dados.', statusCode: status.CONFLICT },
    P2003: { message: 'Operação não permitida: existem registros associados.', statusCode: status.CONFLICT },
    P2011: { message: 'Campo obrigatório não informado.', statusCode: status.BAD_REQUEST },
    P2025: { message: 'Registro não encontrado.', statusCode: status.NOT_FOUND },
};

export const GENERIC_ERROR_MESSAGE = 'Erro interno do servidor.';

/**
 * Converte qualquer erro (Prisma, PostgreSQL ou genérico) em AppError,
 * sem expor detalhes internos ao cliente. O erro original fica em `cause`
 * para ser registrado no servidor pelo middleware de erros.
 */
export const toAppError = (error: any): AppError => {
    if (error instanceof AppError) return error;

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const known = prismaErrorCodes[error.code] ?? sqlErrorCodes[error.code];
        if (known) return new AppError(known.message, known.statusCode, error);
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        return new AppError('Erro de validação nos dados enviados.', status.BAD_REQUEST, error);
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
        return new AppError('Serviço de banco de dados indisponível.', status.SERVICE_UNAVAILABLE, error);
    }

    // Erros SQL conhecidos (ex.: driver pg)
    if (error && typeof error.code === 'string' && sqlErrorCodes[error.code]) {
        const known = sqlErrorCodes[error.code];
        return new AppError(known.message, known.statusCode, error);
    }

    // Body JSON malformado (express.json)
    if (error && error.type === 'entity.parse.failed') {
        return new AppError('JSON inválido no corpo da requisição.', status.BAD_REQUEST, error);
    }

    return new AppError(GENERIC_ERROR_MESSAGE, status.INTERNAL_SERVER, error);
};

// Usado pelos repositórios: relança o erro já convertido em AppError.
export const getErrorMessage = (error: any): never => {
    throw toAppError(error);
};
