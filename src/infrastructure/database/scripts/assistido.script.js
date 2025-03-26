"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countAssistidos = exports.deleteAssistido = exports.updateAssistido = exports.insertAssistido = exports.selectAssistidoByDocumento = exports.selectAssistidoById = exports.selectAllAssistidos = void 0;
const selectAllAssistidos = () => {
    return `
    select 
        id,
        nome,
        documento
    from assistidos
    `;
};
exports.selectAllAssistidos = selectAllAssistidos;
const selectAssistidoById = () => {
    return `
    select 
        id,
        nome,
        documento
    from assistidos
    where id = $1
    `;
};
exports.selectAssistidoById = selectAssistidoById;
const selectAssistidoByDocumento = () => {
    return `
    select 
        id,
        nome,
        documento
    from assistidos
    where documento = $1
    `;
};
exports.selectAssistidoByDocumento = selectAssistidoByDocumento;
const insertAssistido = () => {
    return `
        insert into assistidos (
            nome,
            documento
            )
        values (
            $1,
            $2
            )
        returning *
    `;
};
exports.insertAssistido = insertAssistido;
const updateAssistido = () => {
    return `
        update assistidos 
            set 
                nome = coalesce($1, nome),
                documento = coalesce($2, documento)
            where id = $3
            returning *
    `;
};
exports.updateAssistido = updateAssistido;
const deleteAssistido = () => {
    return `delete from assistidos
        where id = $1
    `;
};
exports.deleteAssistido = deleteAssistido;
const countAssistidos = () => {
    return `
        select count(id)::int as total from assistidos
    `;
};
exports.countAssistidos = countAssistidos;
