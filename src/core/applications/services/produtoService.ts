import ProdutoRepository from "core/applications/repositories/produtoRepository";
import { Produto } from "core/domain/produto";

export default class ProdutoService {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async criaProduto(produto: Produto): Promise<Produto> {
    return this.produtoRepository.criaProduto(produto);
  }

  async deletaProduto(idProduto: string): Promise<number> {
    return this.produtoRepository.deletaProduto(idProduto);
  }

  async editaProduto(
    idProduto: string,
    produto: Produto
  ): Promise<Produto | null> {
    return this.produtoRepository.editaProduto(idProduto, produto);
  }

  async listaProdutos(filtro: any): Promise<Produto[]> {
    const produtos = this.produtoRepository.listaProdutos(filtro);
    return produtos;
  }

  async retornaProduto(idProduto: string): Promise<Produto | null> {
    return this.produtoRepository.retornaProduto(idProduto);
  }
}
