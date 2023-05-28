import ProdutoRepository from "core/applications/ports/produtoRepository";
import Produto from "core/domain/produto";
import Categoria from "../../../../core/domain/enum/categorias";

// APENAS PARA DESENVOLVIMENTO
class DBProdutosRepository implements ProdutoRepository {
    private listaProdutos: Produto[] = [
        {id: "1", nome: "Suco", categoria: Categoria.Bebida, descricao: "Suco normal", preco: 10.20, imagens: ['image.png']}
    ];

    criarProduto(produto: Produto): Promise<Produto> {
        throw new Error("Method not implemented.");
    }

    deletarProduto(idProduto: string): void {
        throw new Error("Method not implemented.");
    }
    editarProduto(idProduto: string, produto: string): Promise<Produto> {
        throw new Error("Method not implemented.");
    }
    async listarProdutos(): Promise<Produto[]> {
        return this.listaProdutos;
    }
    pegarProduto(idProduto: string): Promise<Produto> {
        throw new Error("Method not implemented.");
    }
}

export default DBProdutosRepository;