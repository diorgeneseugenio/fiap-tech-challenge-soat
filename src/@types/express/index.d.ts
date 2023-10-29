import { TipoUsuario } from "~domain/repositories/authenticationRepository";

export {}

declare global {
  namespace Express {
    export interface Request {
        tipoUsuario?: TipoUsuario
        clienteId: string;
    }
  }
}