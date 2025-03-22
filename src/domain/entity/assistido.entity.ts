export interface IAssistido {
    id?: number;
    nome: string;
    documento: string;
    imagem_documento: string;
};

export default class Assistido {
    id?: number;
    nome: string;
    documento: string;
    imagem_documento: string;

    constructor(input: IAssistido){
        this.id = input.id;
        this.nome = input.nome;
        this.documento = input.documento;
        this.imagem_documento = input.imagem_documento
    }
}