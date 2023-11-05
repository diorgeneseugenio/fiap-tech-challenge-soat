import { ImagemProdutoInput, ProdutoDTO, ProdutoInput } from "~domain/entities/types/produtoType";
import ProdutoRepository from "~domain/repositories/produtoRepository";
import ProdutoUseCase from "~domain/useCases/produtoUseCase";

export class ProdutoController {
  static async adicionaImagens(produtoRepository: ProdutoRepository, imagens: ImagemProdutoInput[]) {
    return await ProdutoUseCase.adicionaImagens(produtoRepository, imagens);
  }

  static async removeImagem(produtoRepository: ProdutoRepository, idProduto: string, idImagem: string) {
    return await ProdutoUseCase.removeImagem(produtoRepository, idProduto, idImagem);
  }

  static async criaProduto(
    produtoRepository: ProdutoRepository,
    produto: ProdutoInput
  ): Promise<ProdutoDTO | null> {
    const produtoCriada = await ProdutoUseCase.criaProduto(
      produtoRepository, produto
    );
    return produtoCriada;
  }

  static async deletaProduto(
    produtoRepository: ProdutoRepository,
    id: string
  ): Promise<number> {
    const produtoDeletada = await ProdutoUseCase.deletaProduto(
      produtoRepository, id
    );
    return produtoDeletada;
  }

  static async editaProduto(
    produtoRepository: ProdutoRepository,
    id: string,
    produto: ProdutoInput
  ): Promise<ProdutoDTO | null> {
    const produtoDeletada = await ProdutoUseCase.editaProduto(
      produtoRepository, id, produto
    );
    return produtoDeletada;
  }

  static async listaProdutos(
    produtoRepository: ProdutoRepository,
    filtro: object,
  ): Promise<ProdutoDTO[]> {
    return await ProdutoUseCase.listaProdutos(produtoRepository, filtro);
  }

  static async retornaProduto(
    produtoRepository: ProdutoRepository,
    id: string
  ): Promise<ProdutoDTO | null> {
    return await ProdutoUseCase.retornaProduto(produtoRepository, id);
  }
}