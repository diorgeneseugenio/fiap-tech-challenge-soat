import throwError from "handlerError/handlerError";

import { ImagemProdutoDTO, ProdutoDTO } from "~domain/entities/types/produtoType";
import ProdutoRepository from "~domain/repositories/produtoRepository";

import CategoriaModel from "../models/categoriaModel";
import ImagensProdutoModel from "../models/produtoImagensModel";
import ProdutoModel from "../models/produtoModel";

class ProdutosDataBaseRepository implements ProdutoRepository {
  async adicionaImagens(
    imagensProduto: ImagemProdutoDTO[]
  ): Promise<ImagemProdutoDTO[]> {
      const produtoExiste = ProdutoModel.findByPk(imagensProduto[0]?.produtoId as string);
      if (!produtoExiste) {
        throwError("NOT_FOUND", "Produto não encontrado");
      }
      return await ImagensProdutoModel.bulkCreate(imagensProduto);
  }
  async removeImagem(produtoId: string, imagemId: string): Promise<number> {
      return ImagensProdutoModel.destroy({
        where: { id: imagemId, produtoId },
      });
  }

  async criaProduto(produto: ProdutoDTO): Promise<ProdutoDTO> {
      const categoriaExiste = await CategoriaModel.findByPk(
        produto?.categoriaId as string
      );

      if (!categoriaExiste) {
        throwError("NOT_FOUND", "Categoria não encontrado");
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
  }

  async deletaProduto(idProduto: string): Promise<number> {
      return ProdutoModel.destroy({ where: { id: idProduto } });
  }

  async editaProduto(
    idProduto: string,
    produto: ProdutoDTO
  ): Promise<ProdutoDTO | null> {
      const categoriaExiste = await CategoriaModel.findByPk(
        produto?.categoriaId as string
      );

      if (!categoriaExiste) {
        throwError("NOT_FOUND", "Categoria não encontrado");
      }

      const produtoAtual = await ProdutoModel.findByPk(idProduto);

      if (produtoAtual) {
        Object.assign(produtoAtual, produto);
        await produtoAtual.save();
      }
      return produtoAtual;
  }

  async listaProdutos(filtro: object): Promise<ProdutoDTO[]> {
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
  }

  async retornaProduto(idProduto: string): Promise<ProdutoDTO | null> {
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
  }
}

export default ProdutosDataBaseRepository;
