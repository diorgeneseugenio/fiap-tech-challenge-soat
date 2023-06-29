import express from "express";

import UsuarioController from "../controllers/usuarioController";
import DBUsuariosRepository from "../../../driven/infra/repository/usuarioDatabaseRepository";
import UsuarioService from "../../../../core/applications/services/usuarioService";

const usuarioRouter = express.Router();

const dbUsuariosRepository = new DBUsuariosRepository();
const usuarioService = new UsuarioService(dbUsuariosRepository);
const usuarioController = new UsuarioController(usuarioService);

usuarioRouter.post("/", usuarioController.criaUsuario.bind(usuarioController));
usuarioRouter.get("/", usuarioController.listaUsuarios.bind(usuarioController));
usuarioRouter.get("/:cpf", usuarioController.retornaUsuario.bind(usuarioController));








export default usuarioRouter;