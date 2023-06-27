export interface ImagemAtributos {
  id?: string;
  url: string;
  produtoId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface Produto {
  id?: string;
  nome: string;
  categoriaId?: string;
  preco: number;
  descricao: string;
  imagens?: ImagemAtributos[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
