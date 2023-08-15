import express from "express";

import DBUsuariosRepository from "~adapter/driven/database/repository/usuarioDatabaseRepository";

import UsuarioAPIController from "../controllers/usuarioController";

import { ListaPagamentosSchema } from "./schemas/pagamentoRouter.schema";
import { CriaUsuarioSchema, RetornaUsuarioSchema } from "./schemas/usuarioRouter.schema";
import { validaRequisicao } from "./utils";

const usuarioRouter = express.Router();

const dbUsuariosRepository = new DBUsuariosRepository();
const usuarioAPIController = new UsuarioAPIController(dbUsuariosRepository);

/** 
 * @openapi
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: string
 *         cpf:
 *           type: string
 *           example: string
 *         email:
 *           type: string
 *           example: string
 *         nome:
 *           type: string
 *           example: string
 *         deletedAt:
 *           type: null
 *           example: null
 *         updatedAt:
 *           type: string
 *           example: string
 *         createdAt:
 *           type: string
 *           example: string
 *   parameters: {} 
 */

/**
 * @openapi
 * /usuario:
 *   post:
 *     summary: Cria usuario
 *     tags:
 *       - usuario
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Retorna novo usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   $ref: "#/components/schemas/Usuario"
 *               required:
 *                 - body
 *             status: success
 *       400:
 *         description: Body invalido ou dados de usuarios duplicados.
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
 *                   example: Email ou CPF já em uso!
 *       500:
 *         description: Erro na api.
 */
usuarioRouter.post("/",
  validaRequisicao(CriaUsuarioSchema),
  usuarioAPIController.criaUsuario.bind(usuarioAPIController)
);

/**
 * @openapi
 * /usuario:
 *   get:
 *     summary: Retorna lista de usuarios
 *     tags:
 *       - usuario
 *     responses:
 *       200:
 *         description: retorna listas de usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 usuarios:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Usuario" 
 *       500:
 *         description: Erro na api.
 */
usuarioRouter.get("/",
  validaRequisicao(ListaPagamentosSchema),
  usuarioAPIController.listaUsuarios.bind(usuarioAPIController)
);

/**
 * @openapi
 * /usuario/query:
 *   post:
 *     summary: Filtra usuario pelo CPF
 *     tags:
 *       - usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpf:
 *                 type: string
 *     responses:
 *       200:
 *         description: retorna usuario por id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 usuario:
 *                   $ref: "#/components/schemas/Usuario"
 *               required:
 *                 - params
 *       404:
 *         description: usuario nao encontrado.
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
 *                   example: Usuário não encontrado!
 *       500:
 *         description: Erro na api.
 */
usuarioRouter.post("/query",
  validaRequisicao(RetornaUsuarioSchema),
  usuarioAPIController.retornaUsuario.bind(usuarioAPIController)
);

export default usuarioRouter;