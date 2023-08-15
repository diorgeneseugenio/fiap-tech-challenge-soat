import { ImagemProdutoDTO, ProdutoDTO } from "~domain/entities/types/produtoType";

export default interface ProdutoRepository {
  adicionaImagens(imagens: ImagemProdutoDTO[]): Promise<ImagemProdutoDTO[]>; // TODO
  removeImagem(idProduto: string, idImagem: string): Promise<number>;
  criaProduto(produto: ProdutoDTO): Promise<ProdutoDTO>;
  deletaProduto(idProduto: string): Promise<number>;
  editaProduto(idProduto: string, produto: ProdutoDTO): Promise<ProdutoDTO | null>;
  listaProdutos(filtro: object): Promise<ProdutoDTO[]>;
  retornaProduto(idProduto: string): Promise<ProdutoDTO | null>;
}
