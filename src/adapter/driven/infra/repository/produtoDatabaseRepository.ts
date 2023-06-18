import ProdutoRepository from "core/applications/repositories/produtoRepository";
import { Produto } from "core/domain/produto";
import ProdutoModel from "../models/produtoModel";
import ImagensProdutoModel from "../models/produtoImagensModel";
import CategoriaModel from "../models/categoriaModel";

class ProdutosDataBaseRepository implements ProdutoRepository {
    async criaProduto(produto: Produto): Promise<Produto> {
        try {
            const produtoCriado = await ProdutoModel.create({
                ...produto,
                ...{
                    imagens: produto.imagens
                }
            }, {
                include: [
                    {
                        model: ImagensProdutoModel, as: "imagens"
                    }
                ]
            });
            return produtoCriado;
        } catch (err: any) {
            console.error('Erro ao criar Produto: ', err)
            throw new Error(err);
        }
    }

    async deletaProduto(idProduto: string): Promise<number> {
        try {
            return ProdutoModel.destroy({ where: { id: idProduto } })
        } catch (err: any) {
            console.error('Erro ao deletar produto: ', err)
            throw new Error(err);
        }

    }
    async editaProduto(idProduto: string, produto: Produto): Promise<Produto | null> {
        try {
            const categoriaExiste = await CategoriaModel.findByPk(produto.categoriaId);

            if (!categoriaExiste) {
                throw new Error("categoria_inexistente");
            }

            const produtoAtual = await ProdutoModel.findByPk(idProduto);

            if (produtoAtual) {
                Object.assign(produtoAtual, produto);
                await produtoAtual.save();
            }
            return produtoAtual;
        } catch (err: any) {
            console.error('Erro ao editar Produto: ', err);
            throw new Error(err);
        }
    }

    async listaProdutos(): Promise<Produto[]> {
        try {
            const produtos = await ProdutoModel.findAll({
                attributes: {
                    exclude: ['categoriaId'],
                },
                include: [
                    {
                        model: ImagensProdutoModel, as: "imagens",
                    },
                    {
                        model: CategoriaModel, as: 'categoria',
                    },
                ]
            });
            return produtos;
        } catch (err: any) {
            console.error('Erro ao listar Produto: ', err);
            throw new Error(err);
        }
    }

    async retornaProduto(idProduto: string): Promise<Produto | null> {
        try {
            const produto = await ProdutoModel.findOne({
                attributes: {
                    exclude: ['categoriaId'],
                },
                include: [
                    {
                        model: ImagensProdutoModel, as: "imagens"
                    },
                    {
                        model: CategoriaModel, as: 'categoria',
                    },
                ], where: { id: idProduto }
            });
            return produto;
        } catch (err: any) {
            console.error('Erro ao retornar Produto: ', err);
            throw new Error(err);
        }
    }
}

export default ProdutosDataBaseRepository;