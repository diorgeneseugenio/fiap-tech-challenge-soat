import Produto from "core/domain/produto";
import ProdutoRepository from "../ports/produtoRepository";

export default class ProdutoService {
    constructor(private readonly produtoRepository: ProdutoRepository) { }

    async criarProduto(produto: Produto): Promise<Produto> {
        const produtoCriado = await this.produtoRepository.criarProduto(produto);
        return produtoCriado;
    }

    async deletarProduto(idProduto: string) {
        this.produtoRepository.deletarProduto(idProduto);
    }

    async editarProduto(idProduto: string, produto: string): Promise<Produto> {
        const produtoEditado = this.produtoRepository.editarProduto(idProduto, produto);
        return produtoEditado;
    }

    async listarProdutos(): Promise<Produto[]> {
        const produtos = this.produtoRepository.listarProdutos();
        return produtos;
    }

    async pegarProduto(idProduto: string): Promise<Produto> {
        const produto = this.produtoRepository.pegarProduto(idProduto);
        return produto
    }
}