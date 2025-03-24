export const selectAllAssistidos = () => {
    return `
    select 
        id,
        nome,
        documento
    from assistidos
    `
}

export const selectAssistidoById = () => {
    return `
    select 
        id,
        nome,
        documento
    from assistidos
    where id = $1
    `
}

export const insertAssistido = () => {
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
    `
}

export const updateAssistido = () => {
    return `
        update assistidos 
            set 
                nome = coalesce($1, nome),
                documento = coalesce($2, documento)
            where id = $3
            returning *
    `
}

export const deleteAssistido = () => {
    return `
        delete *
        from assistidos
        where id = @id
        returning *
    `
}