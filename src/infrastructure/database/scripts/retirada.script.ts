export const selectAllretiradas = () => {
    return `
    SELECT 
        r.id,
        r.assistido_id,
        a.nome,
        a.documento,
        r.data_retirada
    FROM retiradas r
    INNER JOIN assistidos a
    ON r.assistido_id = a.id
    ORDER BY r.data_retirada DESC;
    `
}

export const selectRetiradaById = () => {
    return `
    SELECT 
        r.id,
        r.assistido_id,
        a.nome,
        a.documento,
        r.data_retirada
    FROM retiradas r
    INNER JOIN assistidos a
    ON r.assistido_id = a.id
    where r.id = $1
    `
}
export const selectRetiradaByAssistidoId = () => {
    return `
    SELECT 
        r.id,
        r.assistido_id,
        a.nome,
        a.documento,
        r.data_retirada
    FROM retiradas r
    INNER JOIN assistidos a
    ON r.assistido_id = a.id
    where r.assistido_id = $1
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
    SELECT 
        r.id,
        r.assistido_id,
        a.nome,
        a.documento,
        r.data_retirada
    FROM retiradas r
    INNER JOIN assistidos a
    ON r.assistido_id = a.id
    where r.data_retirada = $1
    `
}

export const selectRetiradaByDataIntervalo = () => {
    return `
    SELECT 
        r.id,
        r.assistido_id,
        a.nome,
        a.documento,
        r.data_retirada
    FROM retiradas r
    INNER JOIN assistidos a
    ON r.assistido_id = a.id
    where r.data_retirada
    between $1 and $2
    order by r.data_retirada desc
    `
}

export const countRetiradasByMes = () => {
    return `
    SELECT 
    TO_CHAR(data_retirada, 'FMMonth "de" YYYY') AS mes,
    COUNT(*) AS total
FROM retiradas
WHERE EXTRACT(YEAR FROM data_retirada) = $1
GROUP BY mes
ORDER BY MIN(data_retirada);`;
};

export const selectLastFiveRetiradas = () => {
    return `
    SELECT 
        r.id,
        r.assistido_id,
        a.nome,
        a.documento,
        r.data_retirada
    FROM retiradas r
    INNER JOIN assistidos a
    ON r.assistido_id = a.id
    ORDER BY data_retirada desc
    LIMIT 5
    `
}
