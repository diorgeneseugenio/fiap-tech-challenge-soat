import { ImagemProduto, Produto } from "~core/domain/produto";

import ProdutoRepository from "../repositories/produtoRepository";

export default class ProdutoService {
  constructor(private readonly produtoRepository: ProdutoRepository) {}
  async adicionaImagens(imagens: ImagemProduto[]) {
    return this.produtoRepository.adicionaImagens(imagens);
  }

  async removeImagem(idProduto: string, idImagem: string): Promise<number> {
    return this.produtoRepository.removeImagem(idProduto, idImagem);
  }

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

  async listaProdutos(filtro: object): Promise<Produto[]> {
    const produtos = this.produtoRepository.listaProdutos(filtro);
    return produtos;
  }

  async retornaProduto(idProduto: string): Promise<Produto | null> {
    return this.produtoRepository.retornaProduto(idProduto);
  }
}