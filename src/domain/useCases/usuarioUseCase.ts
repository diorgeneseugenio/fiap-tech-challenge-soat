import { UsuarioDTO } from "~domain/entities/types/UsuarioType";
import Usuario from "~domain/entities/usuario";
import CPF from "~domain/entities/valueObjects/cpf";
import Email from "~domain/entities/valueObjects/email";
import UsuarioRepository from "~domain/repositories/usuarioRepository";


export default class UsuarioUseCase {
  static async usuarioExiste(usuarioRepository: UsuarioRepository, email: string | null, cpf: string | null): Promise<boolean> {
    const usuario = await usuarioRepository.filtraUsuario(email, cpf);
    return usuario ? true : false;
  }

  static async criaUsuario(usuarioRepository: UsuarioRepository, usuario: UsuarioDTO) {
    if (usuario.cpf || usuario.email) {
      if (usuario.cpf) {
        const cpfValidado = new CPF(usuario.cpf);
        usuario.cpf = cpfValidado.retornaValor();
      }

      if (usuario.email) {
        const emailValidado = new Email(usuario.email);
        usuario.email = emailValidado.retornaValor();
      }

      const usuarioExiste = await UsuarioUseCase.usuarioExiste(usuarioRepository, usuario.email, usuario.cpf)

      if (usuarioExiste) {
        throw new Error("usuario_duplicado");
      }

    }
    const novoUsuario = new Usuario(usuario);

    return usuarioRepository.criaUsuario(novoUsuario);
  }

  static async listaUsuarios(usuarioRepository: UsuarioRepository): Promise<UsuarioDTO[]> {
    return usuarioRepository.listaUsuarios();
  }

  static async retornaUsuario(usuarioRepository: UsuarioRepository, cpf: string): Promise<UsuarioDTO | null> {
    const cpfValidado = new CPF(cpf);
    return usuarioRepository.retornaUsuario(cpfValidado.retornaValor());
  }

}