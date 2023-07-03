import { error } from "console";
import UsuarioService from "core/applications/services/usuarioService";
import  Usuario  from "core/domain/usuarios";
import { Request, Response } from "express";

export default class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    async criaUsuario(req: Request, res: Response) {
        try {
            const usuario = req.body;
      
            const usuarioCriado = await this.usuarioService.criaUsuario(usuario);
            return res.status(201).json({
              status: "success",
              message: usuarioCriado,
            });
          } catch (err: any) {
            if (err.message === "Usuario já existe") {
              return res.status(400).json({
                status:"error",
                message: err.message
              })
            }
            return res.status(500).json({
              status: "error",
              message: err.message,
            });
          }
      }

      async listaUsuarios(req: Request, res: Response) {
        try {
          const usuarios = await this.usuarioService.listaUsuarios();
    
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

      async retornaUsuario(req: Request, res: Response) {
        try {
          const { body } = req;

          if (!body?.cpf) {
            return res.status(400).json({
              status: "error",
              message: "Faltando cpf no body",
            });
          }
    
          const usuario = await this.usuarioService.retornaUsuario(body.cpf);
    
          if (usuario) {
            return res.status(200).json({
              status: "success",
              usuario,
            });
          }
          return res.status(404).json({
            status: "error",
            message: "User not found!",
          });
    
        } catch (err: any) {
          return res.status(500).json({
            status: "error",
            message: err.message,
          });
        }
      }

}