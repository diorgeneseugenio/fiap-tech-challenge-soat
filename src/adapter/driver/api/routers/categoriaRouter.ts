import express from "express";

import CategoriaService from "~core/applications/services/categoriaService";
import DBCategoriasRepository from "~driven/infra/repository/categoriaDatabaseRepository";

import CategoriaController from "../controllers/categoriaController";

const categoriaRouter = express.Router();

const dbCategoriasRepository = new DBCategoriasRepository();
const categoriaService = new CategoriaService(dbCategoriasRepository);
const categoriaController = new CategoriaController(categoriaService);

/**
 * @openapi
 * /categoria:
 *   post:
 *     summary: Criar uma categoria
 *     tags:
 *       - categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *             required:
 *               - nome
 *     responses:
 *       201:
 *         description: Retorna a categoria criada.
 *       500:
 *         description: Erro na criacao da categoria.
 */
categoriaRouter.post("/", categoriaController.criaCategoria.bind(categoriaController));
/**
 * @openapi
 * /categoria:
 *   get:
 *     summary: Lista todas as categorias
 *     tags:
 *       - categoria
 *     responses:
 *       200:
 *         description: Retorna a lista de categorias.
 *       500:
 *         description: Erro na criacao da categoria.
 */
categoriaRouter.get("/", categoriaController.listaCategorias.bind(categoriaController));
/**
 * @openapi
 * /categoria/{id}:
 *   get:
 *     summary: Retorna categoria por id
 *     tags:
 *       - categoria
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id da categoria
 *     responses:
 *       200:
 *         description: Retorna categorias.
 *       404:
 *         description: Categoria nao identificada.
 *       500:
 *         description: Erro na api.
 */
categoriaRouter.get("/:id", categoriaController.retornaCategoria.bind(categoriaController));
/**
 * @openapi
 * /categoria/{id}:
 *   delete:
 *     summary: Deleta uma categoria
 *     tags:
 *       - categoria
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id da categoria
 *     responses:
 *       200:
 *         description: Retorna status de sucesso.
 *       404:
 *         description: Categoria nao identificada.
 *       500:
 *         description: Erro na api.
 */
categoriaRouter.delete("/:id", categoriaController.deletaCategoria.bind(categoriaController));
/**
 * @openapi
 * /categoria/{id}:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags:
 *       - categoria
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id da categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *             required:
 *               - nome
 *     responses:
 *       200:
 *         description: Retorna categoria atualizada.
 *       404:
 *         description: Categoria nao identificada.
 *       500:
 *         description: Erro na api.
 */
categoriaRouter.put("/:id", categoriaController.editaCategoria.bind(categoriaController));


export default categoriaRouter;
