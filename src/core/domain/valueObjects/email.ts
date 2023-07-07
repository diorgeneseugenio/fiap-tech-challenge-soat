export default class Email {
  private readonly valor: string;

  constructor(valor: string) {
    if (!this.validacao(valor)) {
      throw new Error('Endereço de e-mail inválido');
    }

    this.valor = valor;
  }

  retornaValor(): string {
    return this.valor;
  }

  private validacao(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}