import ProdutoRepository from "core/applications/ports/produtoRepository";
import { ImagensAtributos, Produto } from "core/domain/produto";
import ProdutoModel from "../models/produtoModel";
import ImagensProdutoModel from "../models/produtoImagensModel";
import CategoriaModel from "../models/categoriaModel";


class ProdutosDataBaseRepository implements ProdutoRepository {
    async criarProduto(produto: Produto): Promise<any> {
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
            console.log('Erro ao editar Produto: ', err)
            return err.message
        }
    }

    async deletarProduto(idProduto: string) {
        try {
            ProdutoModel.destroy({ where: { id: idProduto } })
        } catch (err: any) {
            console.log('Erro em deletar Produto: ', err)
        }
    }
    async editarProduto(idProduto: string, produto: Produto): Promise<any> {
        try {
            const produtoAtualizado = await ProdutoModel.update(produto, { where: { id: idProduto }, });
            return produtoAtualizado;
        } catch (err: any) {
            console.log('Erro ao editar Produto: ', err)
            return err.message
        }
    }

    async listarProdutos(): Promise<Produto[]> {
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
            console.log('Erro ao editar Produto: ', err)
        }

        return [];
    }

    async pegarProduto(idProduto: string): Promise<any> {
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
            console.log('Erro ao editar Produto: ', err)
        }
    }
}

export default ProdutosDataBaseRepository;