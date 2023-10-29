import throwError from "handlerError/handlerError";

export default class CPF {
  private readonly valor: string;

  constructor(valor: string) {
    if (!this.validacao(valor)) {
      throwError("BAD_REQUEST", 'CPF inválido');
    }

    this.valor = valor;
  }

  retornaValor(): string {
    return this.valor.replace(/\D/g, '');
  }

  private validacao(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    let resto: number;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }
    return true;
  }
}