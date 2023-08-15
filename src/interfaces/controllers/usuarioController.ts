
import UsuarioInput, { UsuarioDTO } from "entities/types/UsuarioType";
import { UsuarioGateway } from "interfaces/gateways/usuarioGateway";
import UsuarioRepository from "interfaces/repositories/usuarioRepository";

import UsuarioUseCase from "useCases/usuarioUseCase";

export class UsuarioController {
  static async criaUsuario(
    dbUsuario: UsuarioRepository,
    usuario: UsuarioInput
  ): Promise<UsuarioDTO | null> {
    const usuarioGateway = new UsuarioGateway(dbUsuario);
    return await UsuarioUseCase.criaUsuario(
      usuarioGateway, usuario
    );
  }

  static async listaUsuarios(
    dbUsuario: UsuarioRepository
  ): Promise<UsuarioDTO[]> {
    const usuarioGateway = new UsuarioGateway(dbUsuario);
    return await UsuarioUseCase.listaUsuarios(usuarioGateway);
  }

  static async retornaUsuario(
    dbUsuario: UsuarioRepository,
    id: string
  ): Promise<UsuarioDTO | null> {
    const usuarioGateway = new UsuarioGateway(dbUsuario);
    return await UsuarioUseCase.retornaUsuario(usuarioGateway, id);
  }
}