export const selectAllretiradas = () => {
    return `
    select 
        id,
        assistido_id,
        data_retirada
    from retiradas
    `
}

export const selectRetiradaById = () => {
    return `
    select 
        id,
        assistido_id,
        data_retirada
    from retiradas
    where id = $1
    `
}
export const selectRetiradaByAssistidoId = () => {
    return `
    select 
        id,
        assistido_id,
        data_retirada
    from retiradas
    where assistido_id = $1
    `
}

export const insertRetirada = () => {
    return `
        insert into retiradas (
            assistido_id
            )
        values (
            $1
            )
        returning *
    `
}

export const updateRetirada = () => {
    return `
        update retiradas 
            set 
                assistido_id = coalesce($1, assistido_id),
                data_retirada = coalesce($2, data_retirada)
            where id = $3
            returning *
    `
}

export const deleteRetirada = () => {
    return `delete from retiradas
        where id = $1
    `
}

export const countRetiradasByAssistidoId = () => {
    return `
        select 
            count(id)::int as total 
        from retiradas 
        where assistido_id = $1
    `
}