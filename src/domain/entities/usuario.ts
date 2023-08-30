import { v4 as uuidv4 } from "uuid";

import UsuarioInput from "./types/UsuarioType";

export default class Usuario {
  public id: string;
  public cpf: string | null;
  public email: string | null;
  public nome: string;
  public createdAt: Date;
  public deletedAt: Date | null;
  public updatedAt: Date | null;

  constructor(usuarioInput: UsuarioInput) {
    this.id = usuarioInput.id ?? uuidv4();
    this.email = usuarioInput.email ?? null;
    this.cpf = usuarioInput.cpf ?? null;
    this.nome = !this.cpf && !this.email && usuarioInput.nome ? 'Anonimo' : usuarioInput.nome as string
    this.createdAt = usuarioInput.createdAt ?? new Date();
    this.deletedAt = usuarioInput.deletedAt ?? null;
    this.updatedAt = usuarioInput.updatedAt ?? null;

  }
}