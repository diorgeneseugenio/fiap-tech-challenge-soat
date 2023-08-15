import { v4 as uuidv4 } from "uuid";

import { ProdutoInput } from "./types/produtoType";
import ImagemProduto from "./ImagemProduto";

export default class Produto {
  public id: string;
  public nome: string;
  public categoriaId: string | null;
  public preco: number;
  public descricao: string | null;
  public imagens?: ImagemProduto[] | undefined;
  public createdAt: Date;
  public deletedAt: Date | null;
  public updatedAt: Date | null;


  constructor(produtoInput: ProdutoInput, imageProduto?: ImagemProduto[] | undefined) {
    this.id = produtoInput.id ?? uuidv4();
    this.nome = produtoInput.nome;
    this.categoriaId = produtoInput.categoriaId ?? null;
    this.preco = produtoInput.preco;
    this.imagens = imageProduto;
    this.descricao = produtoInput.descricao ?? null;
    this.createdAt = produtoInput.createdAt ?? new Date();
    this.deletedAt = produtoInput.deletedAt ?? null;
    this.updatedAt = produtoInput.updatedAt ?? null;

    this.validar();
  }

  validar() {
    if (this.preco <= 0) {
      throw new Error('Preco nao pode ser menor igual a zero');
    }
  }

  retornaPreco() {
    return this.preco;
  }
}