export const mapRetiradaToDTO = (item: any) => ({
    id: item.id,
    assistido_id: item.assistido_id,
    data_retirada: item.data_retirada,
    nome: item.assistidos.nome,
    documento: item.assistidos.documento,
  });
  