import { ImagemProdutoDTO, ProdutoDTO } from "~domain/entities/types/produtoType";
import ProdutoRepository from "~domain/repositories/produtoRepository";

export class ProdutoGateway implements ProdutoRepository {
  private produtoRepository: ProdutoRepository;

  constructor(produtoRepository: ProdutoRepository) {
    this.produtoRepository = produtoRepository;
  }
  editaProduto(idProduto: string, produto: ProdutoDTO): Promise<any> {
    return this.produtoRepository.editaProduto(idProduto, produto);
  }
  adicionaImagens(imagens: ImagemProdutoDTO[]): Promise<ImagemProdutoDTO[]> {
    return this.produtoRepository.adicionaImagens(imagens);
  }
  removeImagem(idProduto: string, idImagem: string): Promise<number> {
    return this.produtoRepository.removeImagem(idProduto, idImagem);
  }
  listaProdutos(filtro: object): Promise<ProdutoDTO[]> {
    return this.produtoRepository.listaProdutos(filtro);
  }
  retornaProduto(idProduto: string): Promise<ProdutoDTO | null> {
    return this.produtoRepository.retornaProduto(idProduto);
  }
  criaProduto(Produto: ProdutoDTO): Promise<ProdutoDTO> {
    return this.produtoRepository.criaProduto(Produto);
  }
  deletaProduto(idProduto: string): Promise<number> {
    return this.produtoRepository.deletaProduto(idProduto);
  }

}
