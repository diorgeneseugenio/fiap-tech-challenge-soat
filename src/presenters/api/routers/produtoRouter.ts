import express from "express";
import { Request, Response } from "express";

import DBProdutosRepository from "~datasources/database/repository/produtoDatabaseRepository";
import { ImagemProdutoInput } from "~domain/entities/types/produtoType";
import { ProdutoController } from "~interfaceAdapters/controllers/produtoController";

import { AdicionarItemBody, AdicionarItemParams } from "./schemas/pedidoRouter.schema";
import {
  AdicionaImagenSchema,
  CriaProdutoBody,
  CriaProdutoSchema,
  DeletaProdutoBody,
  DeletaProdutoSchema,
  EditaProdutoBody,
  EditaProdutoParams,
  EditaProdutoSchema,
  ListaProdutoParams,
  ListaProdutoSchema,
  RemoveImagemParams,
  RemoveImagemSchema,
  RetornaProdutoParams,
  RetornaProdutoSchema
} from "./schemas/produtoRouter.schema";
import { validaRequisicao } from "./utils";

const produtoRouter = express.Router();

const dbProdutosRepository = new DBProdutosRepository();

/** 
 * @openapi
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: Produto Exemplo
 *         preco:
 *           type: number
 *           minimum: 0
 *           exclusiveMinimum: true
 *           example: 10
 *         descricao:
 *           type: string
 *           example: Descrição do produto
 *         categoriaId:
 *           type: string
 *           format: uuid
 *           example: 64ada07b-7c8e-46df-815c-c7d485595bee
 *         deletedAt:
 *           type: null
 *           example: null
 *         updatedAt:
 *           type: string
 *           example: string
 *         createdAt:
 *           type: string
 *           example: string
 *         imagens:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *       required:
 *         - nome
 *         - preco
 *         - descricao
 *         - categoriaId
 *   parameters: {} 
 */

/**
 * @openapi
 * /produto:
 *   post:
 *     summary: Criar um produto
 *     tags:
 *       - produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               descricao:
 *                 type: string
 *               categoriaId:
 *                 type: string
 *               imagens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *             required:
 *               - nome
 *               - preco
 *               - categoriaId
 *     responses:
 *       201:
 *         description: Retorna o produto criado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   $ref: "#/components/schemas/Produto"
 *               required:
 *                 - body
 *             status: success
 *       404:
 *         description: Categoria nao identificada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Categoria não encontrada!
 *       400:
 *         description: Preço abaixo do mínimo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: O preço deve ser maior que zero!
 *       500:
 *         description: Erro na criacao do produto.
 */
produtoRouter.post("/",
  validaRequisicao(CriaProdutoSchema),
  async (
    req: Request<unknown, CriaProdutoBody>,
    res: Response
  ) => {
    try {
      const produto = req.body;

      const produtoCriado = await ProdutoController.criaProduto(dbProdutosRepository, produto);
      return res.status(201).json({
        status: "success",
        message: produtoCriado,
      });
    } catch (err: any) {
      if (err.message === "categoria_inexistente") {
        return res.status(404).json({
          status: "error",
          message: "Categoria não encontrada!",
        });
      }

      if (err.message === "preco_zerado") {
        return res.status(400).json({
          status: "error",
          message: "O preço deve ser maior que zero!",
        });
      }
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
);

/**
 * @openapi
 * /produto:
 *   get:
 *     summary: Lista todos os produtos
 *     parameters:
 *       - in: query
 *         name: categoriaId
 *         schema:
 *           type: string
 *         required: false
 *         description: Id da categoria
 *     tags:
 *       - produto
 *     responses:
 *       200:
 *         description: Retorna a lista de produtos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 produtos:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Produto" 
 *               required:
 *                 - params
 *       500:
 *         description: Erro na criacao da produto.
 */
produtoRouter.get("/",
  validaRequisicao(ListaProdutoSchema),
  async (
    req: Request<ListaProdutoParams, unknown>,
    res: Response
  ) => {
    try {
      const categoriaId = req.query.categoriaId;
      const filtro: {
        categoriaId?: string;
      } = {};

      if (categoriaId) {
        filtro.categoriaId = categoriaId as string;
      }

      const produtos = await ProdutoController.listaProdutos(dbProdutosRepository, filtro);

      return res.status(200).json({
        status: "success",
        produtos,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
);

/**
 * @openapi
 * /produto/{id}:
 *   get:
 *     summary: Retorna produto por id
 *     tags:
 *       - produto
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do produto
 *     responses:
 *       200:
 *         description: Retorna um produto por id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 produto:
 *                   $ref: "#/components/schemas/Produto"
 *               required:
 *                 - params
 *       404:
 *         description: produto nao identificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Produto não encontrado!
 *       500:
 *         description: Erro na api.
 */
produtoRouter.get("/:id",
  validaRequisicao(RetornaProdutoSchema),
  async (
    req: Request<RetornaProdutoParams, unknown>,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      const produto = await ProdutoController.retornaProduto(dbProdutosRepository, id);

      if (produto) {
        return res.status(200).json({
          status: "success",
          produto,
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Produto não encontrado!",
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
);

/**
 * @openapi
 * /produto/{id}:
 *   delete:
 *     summary: Deleta uma produto
 *     tags:
 *       - produto
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do produto
 *     responses:
 *       200:
 *         description: Retorna sucesso na requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *               required:
 *                 - params
 *       404:
 *         description: produto nao identificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: produto não encontrado!
 *       500:
 *         description: Erro na api.
 */
produtoRouter.delete("/:id",
  validaRequisicao(DeletaProdutoSchema),
  async (
    req: Request<DeletaProdutoBody, unknown>,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      const produtoDeletado = await ProdutoController.deletaProduto(dbProdutosRepository, id);

      if (produtoDeletado > 0) {
        return res.status(200).json({
          status: "success",
        });
      }
      return res.status(404).json({
        status: "error",
        message: "produto não encontrado!",
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
);

/**
 * @openapi
 * /produto/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags:
 *       - produto
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               descricao:
 *                 type: string
 *               categoriaId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Retorna produto atualizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   $ref: "#/components/schemas/Produto"
 *               required:
 *                 - params
 *       404:
 *         description: produto nao identificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Produto não encontrado!
 *       500:
 *         description: Erro na api.
 */
produtoRouter.put("/:id",
  validaRequisicao(EditaProdutoSchema),
  async (
    req: Request<EditaProdutoParams, EditaProdutoBody>,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const produto = req.body;

      const produtoAtualizado = await ProdutoController.editaProduto(dbProdutosRepository,
        id,
        produto
      );

      if (produtoAtualizado) {
        return res.status(200).json({
          status: "success",
          message: produtoAtualizado,
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Produto não encontrado!",
      });
    } catch (err: any) {
      if (err.message === "categoria_inexistente") {
        return res.status(404).json({
          status: "error",
          message: "Categoria não encontrada!",
        });
      }

      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
);

/**
 * @openapi
 * /produto/{idProduto}/imagem/{idImagem}:
 *   delete:
 *     summary: Deleta imagem do produto
 *     tags:
 *       - produto
 *     parameters:
 *       - in: path
 *         name: idProduto
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do produto
 *       - in: path
 *         name: idImagem
 *         schema:
 *           type: string
 *         required: true
 *         description: Id da imagem
 *     responses:
 *       200:
 *         description: Retorna sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *               required:
 *                 - params
 *       404:
 *         description: produto ou imagem nao identificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *             examples:
 *               erroImagem:
 *                 value:
 *                   status: error
 *                   message: Imagem não encontrada!
 *               erroProduto:
 *                 value:
 *                   status: error
 *                   message: Produto não encontrado!
 *       500:
 *         description: Erro na api.
 */
produtoRouter.delete(
  "/:idProduto/imagem/:idImagem",
  validaRequisicao(RemoveImagemSchema),
  async (
    req: Request<RemoveImagemParams, unknown>,
    res: Response
  ) => {
    try {
      const { idProduto } = req.params;
      const { idImagem } = req.params;

      if (!idProduto) {
        return res.status(404).json({
          status: "error",
          message: "Produto não encontrado!",
        });
      }

      if (!idImagem) {
        return res.status(404).json({
          status: "error",
          message: "Imagem não encontrada!",
        });
      }

      const imagemDeletada = await ProdutoController.removeImagem(dbProdutosRepository,
        idProduto,
        idImagem
      );

      if (imagemDeletada > 0) {
        return res.status(200).json({
          status: "success",
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Imagem ou produto não encontrado!",
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
);

/**
 * @openapi
 * /produto/{id}/imagens:
 *   post:
 *     summary: Adiciona lista de imagens ao produto
 *     tags:
 *       - produto
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imagens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *     responses:
 *       201:
 *         description: Adiciona uma imagem a um produto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: string
 *                       url:
 *                         type: string
 *                         example: string
 *                       produtoId:
 *                         type: string
 *                         format: uuid
 *                         example: string
 *                       deletedAt:
 *                         type: null
 *                         example: null
 *                       updatedAt:
 *                         type: string
 *                         example: string
 *                       createdAt:
 *                         type: string
 *               required:
 *                 - params
 *       404:
 *         description: produto nao identificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Produto não encontrado!
 *       500:
 *         description: Erro na api.
 */
produtoRouter.post(
  "/:id/imagens",
  validaRequisicao(AdicionaImagenSchema),
  async (
    req: Request<AdicionarItemParams, AdicionarItemBody>,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const imagens = body?.imagens.map((imagem: ImagemProdutoInput) => {
        return { ...imagem, produtoId: id };
      });

      const imagensAdicionadas = await ProdutoController.adicionaImagens(dbProdutosRepository,
        imagens
      );
      return res.status(201).json({
        status: "success",
        message: imagensAdicionadas,
      });
    } catch (err: any) {
      if (err.message === "produto_inexistente") {
        return res.status(404).json({
          status: "error",
          message: "Produto não encontrado!",
        });
      }
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
);

export default produtoRouter;
