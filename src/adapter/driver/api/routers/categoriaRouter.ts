import express from "express";

import CategoriaService from "~core/applications/services/categoriaService";
import DBCategoriasRepository from "~driven/infra/repository/categoriaDatabaseRepository";

import CategoriaController from "../controllers/categoriaController";

import {
  CriaCategoriaSchema,
  DeletaCategoriaSchema,
  EditaCategoriaSchema,
  ListaCategoriaSchema,
  RetornaCategoriaSchema,
} from "./schemas/categoriaRouter.schema";
import { validaRequisicao } from "./utils";

const categoriaRouter = express.Router();

const dbCategoriasRepository = new DBCategoriasRepository();
const categoriaService = new CategoriaService(dbCategoriasRepository);
const categoriaController = new CategoriaController(categoriaService);

/** 
 * @openapi
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: string
 *         nome:
 *           type: string
 *           example: Categoria Exemplo
 *         deletedAt:
 *           type: null
 *           example: null
 *         updatedAt:
 *           type: string
 *           example: string
 *         createdAt:
 *           type: string
 *           example: string
 *       required:
 *         - nome
 *   parameters: {} 
 */

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   $ref: "#/components/schemas/Categoria"
 *               required:
 *                 - body
 *             status: success
 *       500:
 *         description: Erro na criacao da categoria.
 */
categoriaRouter.post("/",
  validaRequisicao(CriaCategoriaSchema),
  categoriaController.criaCategoria.bind(categoriaController)
);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 categorias:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Categoria" 
 *       500:
 *         description: Erro.
 */
categoriaRouter.get("/",
  validaRequisicao(ListaCategoriaSchema),
  categoriaController.listaCategorias.bind(categoriaController)
);
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
 *         description: Retorna uma categoria.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 categoria:
 *                   $ref: "#/components/schemas/Categoria"
 *               required:
 *                 - params
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
 *       500:
 *         description: Erro na api.
 */
categoriaRouter.get("/:id",
  validaRequisicao(RetornaCategoriaSchema),
  categoriaController.retornaCategoria.bind(categoriaController)
);
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
 *       500:
 *         description: Erro na api.
 */
categoriaRouter.delete("/:id", 
  validaRequisicao(DeletaCategoriaSchema),
  categoriaController.deletaCategoria.bind(categoriaController)
);
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   $ref: "#/components/schemas/Categoria"
 *               required:
 *                 - params
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
 *       500:
 *         description: Erro na api.
 */
categoriaRouter.put("/:id",
  validaRequisicao(EditaCategoriaSchema), 
  categoriaController.editaCategoria.bind(categoriaController)
);


export default categoriaRouter;
