"use strict";
/*
    --------------------------------------------------------------------
    |    Documentação Status HTTP: https://www.httpstatus.com.br/      |
    --------------------------------------------------------------------
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOT_EXTENDED = exports.INSUFFICIENT_STORAGE = exports.HTTP_VERSION_NOT_SUPPORTED = exports.GATEWAY_TIMEOUT = exports.SERVICE_UNAVAILABLE = exports.BAD_GATEWAY = exports.NOT_IMPLEMENTED = exports.INTERNAL_SERVER = exports.PRECONDITION_REQUIRED = exports.UPGRADE_REQUIRED = exports.FAILED_DEPENDENCY = exports.LOCKED = exports.UNPROCESSABLE_ENTITY = exports.CONFLICT = exports.REQUEST_TIMEOUT = exports.NOT_ALLOWED = exports.NOT_FOUND = exports.FORBIDDEN = exports.UNAUTHORIZED = exports.BAD_REQUEST = exports.MOVED = exports.MOVED_PERMANENTLY = exports.NO_CONTENT = exports.ACCEPTED = exports.CREATED = exports.SUCCESS = void 0;
// SUCESSO
exports.SUCCESS = 200;
exports.CREATED = 201;
exports.ACCEPTED = 202;
exports.NO_CONTENT = 204;
// REDIRECIONAMENTO
exports.MOVED_PERMANENTLY = 301;
exports.MOVED = 302;
// ERRO AO CLIENTE
exports.BAD_REQUEST = 400;
exports.UNAUTHORIZED = 401;
exports.FORBIDDEN = 403;
exports.NOT_FOUND = 404;
exports.NOT_ALLOWED = 405;
exports.REQUEST_TIMEOUT = 408;
exports.CONFLICT = 409;
exports.UNPROCESSABLE_ENTITY = 422;
exports.LOCKED = 423;
exports.FAILED_DEPENDENCY = 424;
exports.UPGRADE_REQUIRED = 426;
exports.PRECONDITION_REQUIRED = 428;
// ERRO AO SERVIDOR
exports.INTERNAL_SERVER = 500;
exports.NOT_IMPLEMENTED = 501;
exports.BAD_GATEWAY = 502;
exports.SERVICE_UNAVAILABLE = 503;
exports.GATEWAY_TIMEOUT = 504;
exports.HTTP_VERSION_NOT_SUPPORTED = 505;
exports.INSUFFICIENT_STORAGE = 507;
exports.NOT_EXTENDED = 510;
