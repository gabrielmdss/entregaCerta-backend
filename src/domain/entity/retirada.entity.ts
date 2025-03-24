export interface IRetirada {
    id?: number;
    assistido_id: number;
    data_retirada: Date;
};

export interface IRetiradasPorMes {
    mes: string;
    total: number
}
export default class Retirada {
    id?: number;
    assistido_id: number;
    data_retirada: Date;

    constructor(input: IRetirada){
        this.id = input.id;
        this.assistido_id = input.assistido_id;
        this.data_retirada = input.data_retirada;
    }
}