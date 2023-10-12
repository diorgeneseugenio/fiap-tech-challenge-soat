import express from "express";
import { Request, Response } from "express";

import DBCategoriasRepository from "~datasources/database/repository/categoriaDatabaseRepository";
import { CategoriaController } from "~interfaceAdapters/controllers/categoriaController";

import {
  CriaCategoriaPayload,
  CriaCategoriaSchema,
  DeletaCategoriaParams,
  DeletaCategoriaSchema,
  EditaCategoriaParams,
  EditaCategoriaPayload,
  EditaCategoriaSchema,
  ListaCategoriaPayload,
  ListaCategoriaSchema,
  RetornaCategoriaParams,
  RetornaCategoriaSchema,
} from "./schemas/categoriaRouter.schema";
import { validaRequisicao } from "./utils";

const categoriaRouter = express.Router();

const dbCategoriasRepository = new DBCategoriasRepository();

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
  async (req: Request<unknown, CriaCategoriaPayload>, res: Response) => {
    try {
      const categoria = req.body;

      const categoriaCriado = await CategoriaController.criarCategoria(dbCategoriasRepository,
        categoria
      );
      return res.status(201).json({
        status: "success",
        message: categoriaCriado,
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
  async (req: Request<unknown, ListaCategoriaPayload>, res: Response) => {
    try {
      const categorias = await CategoriaController.listaCategorias(dbCategoriasRepository);

      return res.status(200).json({
        status: "success",
        categorias,
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
  async (req: Request<RetornaCategoriaParams, unknown>, res: Response) => {
    try {
      const { id } = req.params;

      const categoria = await CategoriaController.retornaCategoria(dbCategoriasRepository,id);

      if (categoria) {
        return res.status(200).json({
          status: "success",
          categoria,
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Categoria não encontrada!",
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
  async (req: Request<DeletaCategoriaParams, unknown>, res: Response) => {
    try {
      const { id } = req.params;

      const categoriaDeletado = await CategoriaController.deletaCategoria(dbCategoriasRepository, id);

      if (categoriaDeletado > 0) {
        return res.status(200).json({
          status: "success",
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Categoria não encontrada!",
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
  async (req: Request<EditaCategoriaParams, EditaCategoriaPayload>, res: Response) => {
    try {
      const { id } = req.params;
      const categoria = req.body;

      const categoriaAtualizada = await CategoriaController.editaCategoria(dbCategoriasRepository,
        id,
        categoria
      );

      if (categoriaAtualizada) {
        return res.status(200).json({
          status: "success",
          message: categoriaAtualizada,
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Categoria não encontrada!",
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
);


export default categoriaRouter;
