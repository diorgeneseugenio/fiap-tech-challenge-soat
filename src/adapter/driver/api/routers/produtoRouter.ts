import express from "express";

import ProdutoService from "~core/applications/services/produtoService";
import DBProdutosRepository from "~driven/infra/repository/produtoDatabaseRepository";

import ProdutoController from "../controllers/produtoController";

import { adicionaImagenSchema, criaProdutoSchema, deletaProdutoSchema, editaProdutoSchema, listaProdutoSchema, removeImagemSchema, retornaProdutoSchema } from "./produtoRouter.schema";
import { validaRequisicao } from "./utils";

const produtoRouter = express.Router();

const dbProdutosRepository = new DBProdutosRepository();
const produtoService = new ProdutoService(dbProdutosRepository);
const produtoController = new ProdutoController(produtoService);

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
 *         description: Retorna a produto criada.
 *       500:
 *         description: Erro na criacao da produto.
 */
produtoRouter.post("/",
  validaRequisicao(criaProdutoSchema),
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
 *         required: false
 *         description: Id da categoria
 *     tags:
 *       - produto
 *     responses:
 *       200:
 *         description: Retorna a lista de produtos.
 *       500:
 *         description: Erro na criacao da produto.
 */
produtoRouter.get("/",
  validaRequisicao(listaProdutoSchema),
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
 *         description: Id da produto
 *     responses:
 *       200:
 *         description: Retorna produtos.
 *       404:
 *         description: produto nao identificado.
 *       500:
 *         description: Erro na api.
 */
produtoRouter.get("/:id",
  validaRequisicao(retornaProdutoSchema),
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
 *         description: Id da produto
 *     responses:
 *       200:
 *         description: Retorna status de sucesso.
 *       404:
 *         description: produto nao identificado.
 *       500:
 *         description: Erro na api.
 */
produtoRouter.delete("/:id",
  validaRequisicao(deletaProdutoSchema),
  produtoController.deletaProduto.bind(produtoController)
);

/**
 * @openapi
 * /produto/{id}:
 *   put:
 *     summary: Atualiza uma produto
 *     tags:
 *       - produto
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id da produto
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
 *     responses:
 *       200:
 *         description: Retorna produto atualizada.
 *       404:
 *         description: produto nao identificado.
 *       500:
 *         description: Erro na api.
 */
produtoRouter.put("/:id",
  validaRequisicao(editaProdutoSchema),
  produtoController.editaProduto.bind(produtoController)
);
produtoRouter.get("/:id", produtoController.retornaProduto.bind(produtoController));
produtoRouter.delete("/:id", produtoController.deletaProduto.bind(produtoController));
produtoRouter.put("/:id", produtoController.editaProduto.bind(produtoController));
produtoRouter.delete("/:idProduto/imagem/:idImagem", produtoController.removeImagem.bind(produtoController));
produtoRouter.post("/:id/imagens", produtoController.adicionaImagens.bind(produtoController));

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
 *       404:
 *         description: produto ou imagem nao identificado.
 *       500:
 *         description: Erro na api.
 */
produtoRouter.delete(
  "/:idProduto/imagem/:idImagem",
  validaRequisicao(removeImagemSchema),
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
 *       200:
 *         description: Retorna produto atualizada com as novas imagens.
 *       404:
 *         description: produto nao identificado.
 *       500:
 *         description: Erro na api.
 */
produtoRouter.post(
  "/:id/imagens",
  validaRequisicao(adicionaImagenSchema),
  produtoController.adicionaImagens.bind(produtoController)
);

export default produtoRouter;