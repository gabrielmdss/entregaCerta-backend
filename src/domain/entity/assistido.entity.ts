export interface IAssistido {
    id?: number;
    nome: string;
    documento: string;
};

export default class Assistido {
    id?: number;
    nome: string;
    documento: string;

    constructor(input: IAssistido){
        this.id = input.id;
        this.nome = input.nome;
        this.documento = input.documento;
    }
}