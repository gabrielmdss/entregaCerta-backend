export const selectAllAssistidos = () => {
    return `
    select 
        id,
        nome,
        documento,
        imagem_documento
    from assistidos
    `
}

export const selectAssistidoById = () => {
    return `
    select 
        id,
        nome,
        documento,
        imagem_documento
    where id = @id
    `
}

export const insertAssistido = () => {
    return `
        insert into assistidos (
            nome,
            documento,
            imagem_documento
            )
        values (
            @nome,
            @documento,
            @imagem_documento
            )
        returning *
    `
}

export const updateAssistido = () => {
    return `
        update assistidos 
            set 
                nome = coalesce(@nome, nome),
                documento = coalesce(@documento, documento),
                imagem_documento = coalesce(@imagem_documento, imagem_documento)
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