import ProdutoRepository from "~core/applications/repositories/produtoRepository";
import { ImagemProduto, Produto } from "~core/domain/produto";

import CategoriaModel from "../models/categoriaModel";
import ImagensProdutoModel from "../models/produtoImagensModel";
import ProdutoModel from "../models/produtoModel";

class ProdutosDataBaseRepository implements ProdutoRepository {
  async adicionaImagens(
    imagensProduto: ImagemProduto[]
  ): Promise<ImagemProduto[]> {
    try {
      const produtoExiste = ProdutoModel.findByPk(imagensProduto[0]?.produtoId);
      if (!produtoExiste) {
        throw new Error("produto_inexistente");
      }
      return await ImagensProdutoModel.bulkCreate(imagensProduto);
    } catch (err: any) {
      console.error("Erro ao adicionar imagens ao produto: ", err);
      throw new Error(err);
    }
  }
  async removeImagem(produtoId: string, imagemId: string): Promise<number> {
    try {
      return ImagensProdutoModel.destroy({
        where: { id: imagemId, produtoId },
      });
    } catch (err: any) {
      console.error("Erro ao remover imagem do produto: ", err);
      throw new Error(err);
    }
  }

  async criaProduto(produto: Produto): Promise<Produto> {
    try {
      const categoriaExiste = await CategoriaModel.findByPk(
        produto.categoriaId
      );

      if (!categoriaExiste) {
        throw new Error("categoria_inexistente");
      }

      const produtoCriado = await ProdutoModel.create(
        {
          ...produto,
          ...{
            imagens: produto.imagens,
          },
        },
        {
          include: [
            {
              model: ImagensProdutoModel,
              as: "imagens",
            },
          ],
        }
      );
      return produtoCriado;
    } catch (err: any) {
      console.error("Erro ao criar Produto: ", err);
      throw new Error(err);
    }
  }

  async deletaProduto(idProduto: string): Promise<number> {
    try {
      return ProdutoModel.destroy({ where: { id: idProduto } });
    } catch (err: any) {
      console.error("Erro ao deletar produto: ", err);
      throw new Error(err);
    }
  }

  async editaProduto(
    idProduto: string,
    produto: Produto
  ): Promise<Produto | null> {
    try {
      const categoriaExiste = await CategoriaModel.findByPk(
        produto.categoriaId
      );

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
      console.error("Erro ao editar Produto: ", err);
      throw new Error(err);
    }
  }

  async listaProdutos(filtro: object): Promise<Produto[]> {
    try {
      const produtos = await ProdutoModel.findAll({
        attributes: {
          exclude: ["categoriaId"],
        },
        include: [
          {
            model: ImagensProdutoModel,
            as: "imagens",
          },
          {
            model: CategoriaModel,
            as: "categoria",
          },
        ],
        where: { ...filtro },
      });
      return produtos;
    } catch (err: any) {
      console.error("Erro ao listar Produto: ", err);
      throw new Error(err);
    }
  }

  async retornaProduto(idProduto: string): Promise<Produto | null> {
    try {
      const produto = await ProdutoModel.findOne({
        attributes: {
          exclude: ["categoriaId"],
        },
        include: [
          {
            model: ImagensProdutoModel,
            as: "imagens",
          },
          {
            model: CategoriaModel,
            as: "categoria",
          },
        ],
        where: { id: idProduto },
      });
      return produto;
    } catch (err: any) {
      console.error("Erro ao retornar Produto: ", err);
      throw new Error(err);
    }
  }
}

export default ProdutosDataBaseRepository;
