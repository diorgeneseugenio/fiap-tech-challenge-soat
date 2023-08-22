import { ImagemProdutoDTO, ProdutoDTO } from "~domain/entities/types/produtoType";
import ProdutoRepository from "~domain/repositories/produtoRepository";

import CategoriaModel from "../models/categoriaModel";
import ImagensProdutoModel from "../models/produtoImagensModel";
import ProdutoModel from "../models/produtoModel";

class ProdutosDataBaseRepository implements ProdutoRepository {
  async adicionaImagens(
    imagensProduto: ImagemProdutoDTO[]
  ): Promise<ImagemProdutoDTO[]> {
    try {
      const produtoExiste = ProdutoModel.findByPk(imagensProduto[0]?.produtoId as string);
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

  async criaProduto(produto: ProdutoDTO): Promise<ProdutoDTO> {
    try {
      const categoriaExiste = await CategoriaModel.findByPk(
        produto?.categoriaId as string
      );

      if (!categoriaExiste) {
        throw new Error("categoria_inexistente");
      }

      const produtoCriado = await ProdutoModel.create(
        {
          ...produto,
          ...{
            imagens: produto?.imagens ?? [],
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
    produto: ProdutoDTO
  ): Promise<ProdutoDTO | null> {
    try {
      const categoriaExiste = await CategoriaModel.findByPk(
        produto?.categoriaId as string
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

  async listaProdutos(filtro: object): Promise<ProdutoDTO[]> {
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

  async retornaProduto(idProduto: string): Promise<ProdutoDTO | null> {
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
