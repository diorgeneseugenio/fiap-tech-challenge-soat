export interface ImagensAtributos {
    id?: number;
    url: string;
    produtoId?: number;
}

export interface Produto {
    id?: string;
    nome: string;
    categoriaId?: string;
    preco: number;
    descricao: string;
    imagens?: ImagensAtributos[];
    createdAt?: Date;
    updatedAt?: Date;
}