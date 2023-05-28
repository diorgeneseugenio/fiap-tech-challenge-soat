import ProdutoRepository from "core/applications/ports/produtoRepository";
import Produto from "core/domain/produto";
import Categoria from "../../core/domain/enum/categorias";


// Classe Mock do DB
export default class DBProdutosRepository implements ProdutoRepository {
    private listaProdutos: Produto[] = [
        { id: "1", nome: "Suco", categoria: Categoria.Bebida, descricao: "Suco normal", preco: 10.20, imagens: ['image.png'] },
        { id: "2", nome: "hambuerguer", categoria: Categoria.Bebida, descricao: "generico", preco: 30.20, imagens: ['hb2.png', 'hb3.png'] }
    ];

    async criarProduto(produto: Produto): Promise<any> {
        return this.listaProdutos.push(produto);
    }

    async deletarProduto(idProduto: string): Promise<void> {
        this.listaProdutos = this.listaProdutos.filter((produto) => {
            return produto.id !== idProduto;
        });
    }
    async editarProduto(idProduto: string, produto: Produto): Promise<Produto> {
        this.listaProdutos = this.listaProdutos.map((oldProduto) => {
            if (oldProduto.id === idProduto) {
                return produto;
            }
            return oldProduto;
        })

        return produto;
    }
    async listarProdutos(): Promise<Produto[]> {
        return this.listaProdutos;
    }
    async pegarProduto(idProduto: string): Promise<Produto|undefined> {
        return this.listaProdutos.find((produto) => produto.id === idProduto);
    }
}