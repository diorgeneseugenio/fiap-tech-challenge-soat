import { v4 as uuidv4 } from "uuid";

import { ImagemProdutoInput } from "./types/produtoType";

export default class ImagemProduto {
  public id: string;
  public produtoId: string | null;
  public url: string;
  public createdAt: Date;
  public deletedAt: Date | null;
  public updatedAt: Date | null;


  constructor(imageProdutoInput: ImagemProdutoInput) {
    this.id = imageProdutoInput.id ?? uuidv4();
    this.produtoId = imageProdutoInput.produtoId ?? null;
    this.url = imageProdutoInput.url;
    this.createdAt = imageProdutoInput.createdAt ?? new Date();
    this.deletedAt = imageProdutoInput.deletedAt ?? null;
    this.updatedAt = imageProdutoInput.updatedAt ?? null;

    this.validar();
  }

  validar() {
    if (this.url.length <= 0) {
      throw new Error('Url da imagem nao fornecida');
    }
  }
}

