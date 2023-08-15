import { ProdutoGateway } from "interfaces/gateways/produtoGateway";

import { ImagemProdutoInput, ProdutoDTO, ProdutoInput } from "~domain/entities/types/produtoType";
import ProdutoRepository from "~domain/repositories/produtoRepository";
import ProdutoUseCase from "~domain/useCases/produtoUseCase";

export class ProdutoController {
  static async adicionaImagens(dbProduto: ProdutoRepository, imagens: ImagemProdutoInput[]) {
    const produtoGateway = new ProdutoGateway(dbProduto);
    return await ProdutoUseCase.adicionaImagens(produtoGateway, imagens);
  }

  static async removeImagem(dbProduto: ProdutoRepository, idProduto: string, idImagem: string) {
    const produtoGateway = new ProdutoGateway(dbProduto);
    return await ProdutoUseCase.removeImagem(produtoGateway, idProduto, idImagem);
  }

  static async criaProduto(
    dbProduto: ProdutoRepository,
    produto: ProdutoInput
  ): Promise<ProdutoDTO | null> {
    const produtoGateway = new ProdutoGateway(dbProduto);
    const produtoCriada = await ProdutoUseCase.criaProduto(
      produtoGateway, produto
    );
    return produtoCriada;
  }

  static async deletaProduto(
    dbProduto: ProdutoRepository,
    id: string
  ): Promise<number> {
    const produtoGateway = new ProdutoGateway(dbProduto);
    const produtoDeletada = await ProdutoUseCase.deletaProduto(
      produtoGateway, id
    );
    return produtoDeletada;
  }

  static async editaProduto(
    dbProduto: ProdutoRepository,
    id: string,
    produto: ProdutoInput
  ): Promise<ProdutoDTO | null> {
    const produtoGateway = new ProdutoGateway(dbProduto);
    const produtoDeletada = await ProdutoUseCase.editaProduto(
      produtoGateway, id, produto
    );
    return produtoDeletada;
  }

  static async listaProdutos(
    dbProduto: ProdutoRepository,
    filtro: any,
  ): Promise<ProdutoDTO[]> {
    const produtoGateway = new ProdutoGateway(dbProduto);
    return await ProdutoUseCase.listaProdutos(produtoGateway, filtro);
  }

  static async retornaProduto(
    dbProduto: ProdutoRepository,
    id: string
  ): Promise<ProdutoDTO | null> {
    const produtoGateway = new ProdutoGateway(dbProduto);
    return await ProdutoUseCase.retornaProduto(produtoGateway, id);
  }
}