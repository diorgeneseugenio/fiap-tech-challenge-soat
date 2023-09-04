import express from "express";
import { Request, Response } from "express";

import DBUsuariosRepository from "~datasources/database/repository/usuarioDatabaseRepository";
import { UsuarioController } from "~interfaceAdapters/controllers/usuarioController";

import { ListaPagamentosSchema } from "./schemas/metodoPagamentoRouter.schema";
import { CriaUsuarioBody, CriaUsuarioSchema, RetornaUsuarioBody, RetornaUsuarioSchema } from "./schemas/usuarioRouter.schema";
import { validaRequisicao } from "./utils";

const usuarioRouter = express.Router();

const dbUsuarioRepository = new DBUsuariosRepository();

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
  async (
    req: Request<unknown, CriaUsuarioBody>,
    res: Response
  ) => {
    try {
      const usuario = req.body;

      const usuarioCriado = await UsuarioController.criaUsuario(dbUsuarioRepository, usuario);
      return res.status(201).json({
        status: "success",
        message: usuarioCriado,
      });
    } catch (err: any) {
      if (err.message === "usuario_duplicado") {
        return res.status(400).json({
          status: "error",
          message: "Email ou CPF já em uso!"
        })
      }
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

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
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const usuarios = await UsuarioController.listaUsuarios(dbUsuarioRepository);

      return res.status(200).json({
        status: "success",
        usuarios,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
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
  async (
    req: Request<unknown, RetornaUsuarioBody>,
    res: Response
  ) => {
    try {
      const { body } = req;

      const usuario = await UsuarioController.retornaUsuario(dbUsuarioRepository, body.cpf);

      if (usuario) {
        return res.status(200).json({
          status: "success",
          usuario,
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Usuário não encontrado!",
      });

    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
);

export default usuarioRouter;