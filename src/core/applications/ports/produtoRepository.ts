import Produto from "core/domain/produto";

export default interface ProdutoRepository {
    criarProduto(produto: Produto): Promise<Produto>;
    deletarProduto(idProduto: string): void;
    editarProduto(idProduto: string, produto: Produto): Promise<Produto|undefined>;
    listarProdutos(): Promise<Produto[]>;
    pegarProduto(idProduto: string): Promise<Produto|undefined>;
}
