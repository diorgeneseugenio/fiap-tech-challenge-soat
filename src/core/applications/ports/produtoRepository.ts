import { Produto } from "core/domain/produto";

export default interface ProdutoRepository {
    criaProduto(produto: Produto): Promise<Produto>;
    deletaProduto(idProduto: string): Promise<any>;
    editaProduto(idProduto: string, produto: Produto): Promise<Produto|undefined>;
    listaProdutos(): Promise<Produto[]>;
    retornaProduto(idProduto: string): Promise<any>;
}
