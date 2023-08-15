import { Request, Response } from "express";
import { UsuarioController } from "interfaces/controllers/usuarioController";

import UsuarioRepository from "~domain/repositories/usuarioRepository";

import { CriaUsuarioBody, RetornaUsuarioBody } from "../routers/schemas/usuarioRouter.schema";

export default class UsuarioAPIController {
  private dbUsuarioRepository: UsuarioRepository;

  constructor(dbUsuarioRepository: UsuarioRepository) {
    this.dbUsuarioRepository = dbUsuarioRepository;
   }

  async criaUsuario(
    req: Request<unknown, CriaUsuarioBody>,
    res: Response
  ) {
    try {
      const usuario = req.body;

      const usuarioCriado = await UsuarioController.criaUsuario(this.dbUsuarioRepository, usuario);
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

  async listaUsuarios(
    req: Request,
    res: Response
  ) {
    try {
      const usuarios = await UsuarioController.listaUsuarios(this.dbUsuarioRepository);

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

  async retornaUsuario(
    req: Request<unknown, RetornaUsuarioBody>,
    res: Response
  ) {
    try {
      const { body } = req;

      const usuario = await UsuarioController.retornaUsuario(this.dbUsuarioRepository, body.cpf);

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

}