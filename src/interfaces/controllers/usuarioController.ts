import UsuarioInput, { UsuarioDTO } from "~domain/entities/types/UsuarioType";
import UsuarioRepository from "~domain/repositories/usuarioRepository";
import UsuarioUseCase from "~domain/useCases/usuarioUseCase";

export class UsuarioController {
  static async criaUsuario(
    usuarioRepository: UsuarioRepository,
    usuario: UsuarioInput
  ): Promise<UsuarioDTO | null> {
    return await UsuarioUseCase.criaUsuario(
      usuarioRepository, usuario
    );
  }

  static async listaUsuarios(
    usuarioRepository: UsuarioRepository
  ): Promise<UsuarioDTO[]> {
    return await UsuarioUseCase.listaUsuarios(usuarioRepository);
  }

  static async retornaUsuario(
    usuarioRepository: UsuarioRepository,
    id: string
  ): Promise<UsuarioDTO | null> {
    return await UsuarioUseCase.retornaUsuario(usuarioRepository, id);
  }
}