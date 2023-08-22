import ImagemProduto from "~domain/entities/ImagemProduto";
import Produto from "~domain/entities/produto";
import { ImagemProdutoInput, ProdutoDTO, ProdutoInput } from "~domain/entities/types/produtoType";
import ProdutoRepository from "~domain/repositories/produtoRepository";


export default class ProdutoUseCase {
  static async adicionaImagens(produtoRepository: ProdutoRepository, imagens: ImagemProdutoInput[]) {
    const novasImagens = imagens.map(i => new ImagemProduto(i));
    return produtoRepository.adicionaImagens(novasImagens);
  }

  static async removeImagem(produtoRepository: ProdutoRepository, idProduto: string, idImagem: string) {
    return produtoRepository.removeImagem(idProduto, idImagem);

  }

  static async criaProduto(produtoRepository: ProdutoRepository, produtoInput: ProdutoInput): Promise<ProdutoDTO> {
    const images = produtoInput?.imagens?.map((image: ImagemProdutoInput) => new ImagemProduto(image));
    const produto = new Produto(produtoInput, images);

    return produtoRepository.criaProduto(produto);

  }

  static async deletaProduto(produtoRepository: ProdutoRepository, idProduto: string): Promise<number> {
    return produtoRepository.deletaProduto(idProduto);
  }

  static async editaProduto(
    produtoRepository: ProdutoRepository,
    idProduto: string,
    produtoInput: ProdutoInput
  ): Promise<ProdutoDTO | null> {
    const produto = await ProdutoUseCase.retornaProduto(produtoRepository, idProduto);

    if (produto) {
      produto.nome = produtoInput.nome ?? produto.nome;
      produto.categoriaId = produtoInput.categoriaId ?? produto.categoriaId;
      produto.preco = produtoInput.preco ?? produto.preco;
      produto.descricao = produtoInput.descricao ?? produto.descricao;

      return produtoRepository.editaProduto(idProduto, produto);
    }

    return null;

  }

  static async listaProdutos(produtoRepository: ProdutoRepository, filtro: object): Promise<ProdutoDTO[]> {
    const produtos = produtoRepository.listaProdutos(filtro);
    return produtos;
  }

  static async retornaProduto(produtoRepository: ProdutoRepository, idProduto: string): Promise<ProdutoDTO | null> {
    return produtoRepository.retornaProduto(idProduto);
  }
}
