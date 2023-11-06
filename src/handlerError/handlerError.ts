export class CustomError extends Error {
    public code: string;
    constructor(message: string, code: string) {
      super(message);
      this.code = code;
    }
  }

export default function throwError(codigo: string, mensagem: string): never {
    throw new CustomError(mensagem, codigo);
}