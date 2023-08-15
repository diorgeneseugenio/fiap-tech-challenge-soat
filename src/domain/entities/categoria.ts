import { CategoriaInput } from "./types/CategoriaType";

export default class Categoria {
  public id: string;
  public nome: string;
  public createdAt: Date;
  public deletedAt: Date | null;
  public updatedAt: Date | null;

  constructor(categoriaInput: CategoriaInput) {
    this.id = categoriaInput.id;
    this.nome = categoriaInput.nome;
    this.createdAt = categoriaInput.createdAt ?? new Date();
    this.deletedAt = categoriaInput.deletedAt ?? null;
    this.updatedAt = categoriaInput.updatedAt ?? null;
  }

}