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
            assistido_id,
            data_retirada
            )
        values (
            $1,
            coalesce($2, CURRENT_DATE)
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

export const selectRetiradaByData = () => {
    return `
    select 
        id,
        assistido_id,
        data_retirada
    from retiradas
    where data_retirada = $1
    `
}

export const selectRetiradaByDataIntervalo = () => {
    return `
    select 
        id,
        assistido_id,
        data_retirada
    from retiradas
    where data_retirada between $1 and $2
    order by
    data_retirada desc
    `
}
