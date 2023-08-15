import ImagemProduto from "entities/ImagemProduto";
import Produto from "entities/produto";
import { ImagemProdutoInput, ProdutoDTO, ProdutoInput } from "entities/types/produtoType";
import { ProdutoGateway } from "interfaces/gateways/produtoGateway";


export default class ProdutoUseCase {
  // constructor(private readonly produtoRepository: ProdutoRepository) {}
  static async adicionaImagens(produtoGateway: ProdutoGateway, imagens: ImagemProdutoInput[]) {
    const novasImagens = imagens.map(i => new ImagemProduto(i));
    return produtoGateway.adicionaImagens(novasImagens);
  }

  static async removeImagem(produtoGateway: ProdutoGateway, idProduto: string, idImagem: string) {
    return produtoGateway.removeImagem(idProduto, idImagem);

  }

  static async criaProduto(produtoGateway: ProdutoGateway, produtoInput: ProdutoInput): Promise<ProdutoDTO> {
    const images = produtoInput?.imagens?.map((image: ImagemProdutoInput) => new ImagemProduto(image));
    const produto = new Produto(produtoInput, images);

    return produtoGateway.criaProduto(produto);

  }

  static async deletaProduto(produtoGateway: ProdutoGateway, idProduto: string): Promise<number> {
    return produtoGateway.deletaProduto(idProduto);
  }

  static async editaProduto(
    produtoGateway: ProdutoGateway,
    idProduto: string,
    produtoInput: ProdutoInput
  ): Promise<ProdutoDTO | null> {
    const produto = await ProdutoUseCase.retornaProduto(produtoGateway, idProduto);

    if (produto) {
      produto.nome = produtoInput.nome ?? produto.nome;
      produto.categoriaId = produtoInput.categoriaId ?? produto.categoriaId;
      produto.preco = produtoInput.preco ?? produto.preco;
      produto.descricao = produtoInput.descricao ?? produto.descricao;

      return produtoGateway.editaProduto(idProduto, produto);
    }

    return null;

  }

  static async listaProdutos(produtoGateway: ProdutoGateway, filtro: object): Promise<ProdutoDTO[]> {
    const produtos = produtoGateway.listaProdutos(filtro);
    return produtos;
  }

  static async retornaProduto(produtoGateway: ProdutoGateway, idProduto: string): Promise<ProdutoDTO | null> {
    return produtoGateway.retornaProduto(idProduto);
  }
}
