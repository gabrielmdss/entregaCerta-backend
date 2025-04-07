export interface IAssistido {
  id?: number;
  nome: string;
  documento: string;
  data_nascimento?: Date | string | null;
  imagem?: string | null;
}

export default class Assistido {
  id?: number;
  nome: string;
  documento: string;
  data_nascimento?: Date | string | null;
  imagem?: string | null;

  constructor(input: IAssistido) {
    this.id = input.id;
    this.nome = input.nome;
    this.documento = input.documento;
    this.data_nascimento = input.data_nascimento;
    this.imagem = input.imagem
  }
}
