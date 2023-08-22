export interface ImagemProdutoInput {
    id: string;
    url: string;
    produtoId: string | null
    createdAt: Date;
    deletedAt: Date | null;
    updatedAt: Date | null;
  }
  
export interface ImagemProdutoDTO {
    id: string;
    url: string;
    produtoId?: string | null;
    createdAt: Date;
    deletedAt: Date | null;
    updatedAt: Date | null;
  }
  
  export interface ProdutoInput {
    id: string;
    nome: string;
    categoriaId?: string | null;
    preco: number;
    descricao: string | null;
    imagens?: ImagemProdutoInput[];
    createdAt: Date;
    deletedAt: Date | null;
    updatedAt: Date | null;
  }

  
  export interface ProdutoDTO {
    id: string;
    nome: string;
    categoriaId?: string | null;
    preco: number;
    descricao: string | null;
    imagens?: ImagemProdutoInput[];
    createdAt: Date;
    deletedAt: Date | null;
    updatedAt: Date | null;
  }
  