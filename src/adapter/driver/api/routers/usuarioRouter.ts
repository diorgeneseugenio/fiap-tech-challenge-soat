import express from "express";

import UsuarioService from "../../../../core/applications/services/usuarioService";
import DBUsuariosRepository from "../../../driven/infra/repository/usuarioDatabaseRepository";
import UsuarioController from "../controllers/usuarioController";

import { ListaPagamentosSchema } from "./schemas/pagamentoRouter.schema";
import { CriaUsuarioSchema, RetornaUsuarioSchema } from "./schemas/usuarioRouter.schema";
import { validaRequisicao } from "./utils";

const usuarioRouter = express.Router();

const dbUsuariosRepository = new DBUsuariosRepository();
const usuarioService = new UsuarioService(dbUsuariosRepository);
const usuarioController = new UsuarioController(usuarioService);

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
 *       400:
 *         description: Body invalido ou dados de usuarios duplicados.
 *       500:
 *         description: Erro na api.
 */
usuarioRouter.post("/",
  validaRequisicao(CriaUsuarioSchema),
  usuarioController.criaUsuario.bind(usuarioController)
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
 *         description: retorna litas de usuarios.
 *       500:
 *         description: Erro na api.
 */
usuarioRouter.get("/",
  validaRequisicao(ListaPagamentosSchema),
  usuarioController.listaUsuarios.bind(usuarioController)
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
 *         description: retorna usuario.
 *       404:
 *         description: usuario nao encontrado.
 *       500:
 *         description: Erro na api.
 */
usuarioRouter.post("/query",
  validaRequisicao(RetornaUsuarioSchema),
  usuarioController.retornaUsuario.bind(usuarioController)
);

export default usuarioRouter;