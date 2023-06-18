import { ImagemProduto, Produto } from "~core/domain/produto";

export default interface ProdutoRepository {
    adicionaImagens(imagens: ImagemProduto[]): Promise<ImagemProduto[]>;
    removeImagem(idProduto: string, idImagem: string): Promise<number>;
    criaProduto(produto: Produto): Promise<Produto>;
    deletaProduto(idProduto: string): Promise<number>;
    editaProduto(idProduto: string, produto: Produto): Promise<Produto | null>;
    listaProdutos(filtro: any): Promise<Produto[]>;
    retornaProduto(idProduto: string): Promise<Produto | null>;
}
