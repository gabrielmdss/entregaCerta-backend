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
    where id = @id
    `
}

export const insertAssistido = () => {
    return `
        insert into assistidos (
            nome,
            documento,
            )
        values (
            @nome,
            @documento
            )
        returning *
    `
}

export const updateAssistido = () => {
    return `
        update assistidos 
            set 
                nome = coalesce(@nome, nome),
                documento = coalesce(@documento, documento)
            where id = @id
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