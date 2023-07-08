import express from "express";

import ProdutoService from "~core/applications/services/produtoService";
import DBProdutosRepository from "~driven/infra/repository/produtoDatabaseRepository";

import ProdutoController from "../controllers/produtoController";

import {
  AdicionaImagenSchema,
  CriaProdutoSchema,
  DeletaProdutoSchema,
  EditaProdutoSchema,
  ListaProdutoSchema,
  RemoveImagemSchema,
  RetornaProdutoSchema
} from "./schemas/produtoRouter.schema";
import { validaRequisicao } from "./utils";

const produtoRouter = express.Router();

const dbProdutosRepository = new DBProdutosRepository();
const produtoService = new ProdutoService(dbProdutosRepository);
const produtoController = new ProdutoController(produtoService);

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
  produtoController.criaProduto.bind(produtoController)
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
 *         required: true
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
  produtoController.listaProdutos.bind(produtoController)
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
  produtoController.retornaProduto.bind(produtoController)
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
  produtoController.deletaProduto.bind(produtoController)
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
  produtoController.editaProduto.bind(produtoController)
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
  produtoController.removeImagem.bind(produtoController)
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
  produtoController.adicionaImagens.bind(produtoController)
);

export default produtoRouter;
