export interface IEstoque {
    id?: number;
    quantidade: number;
    descricao: string | null; 
    data_atualizacao: Date | null;
};

export default class Estoque {
    id?: number;
    quantidade: number;
    descricao: string | null; 
    data_atualizacao: Date | null;

    constructor(input: IEstoque){
        this.id = input.id;
        this.descricao = input.descricao;
        this.quantidade = input.quantidade;
        this.data_atualizacao = input.data_atualizacao
    }
}