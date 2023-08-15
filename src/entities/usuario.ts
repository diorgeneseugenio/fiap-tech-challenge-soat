import { v4 as uuidv4 } from "uuid";

import UsuarioInput from "./types/UsuarioType";

export default class Usuario {
  private _id: string;
  private _cpf: string | null;
  private _email: string | null;
  private _nome: string;
  private _createdAt: Date;
  private _deletedAt: Date | null;
  private _updatedAt: Date | null;

  constructor(usuarioInput: UsuarioInput) {
    this._id = usuarioInput.id ?? uuidv4();
    this._email = usuarioInput.email ?? null;
    this._cpf = usuarioInput.cpf ?? null;
    this._nome = !this._cpf && !this._email && usuarioInput.nome ? 'Anonimo' : usuarioInput.nome as string
    this._createdAt = usuarioInput.createdAt ?? new Date();
    this._deletedAt = usuarioInput.deletedAt ?? null;
    this._updatedAt = usuarioInput.updatedAt ?? null;

  }

  get id(): string | undefined {
    return this._id;
  }
  get cpf(): string | null  {
    return this._cpf;
  }
  get email(): string | null   {
    return this._email;
  }
  get nome(): string  {
    return this._nome;
  }
  get createdAt(): Date{
    return this._createdAt;
  }
  get deletedAt(): Date | null{
    return this._deletedAt;
  }
  get updatedAt(): Date | null {
    return this._updatedAt;
  }
}