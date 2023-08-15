import { UsuarioDTO } from "entities/types/UsuarioType";
import Usuario from "entities/usuario";
import CPF from "entities/valueObjects/cpf";
import Email from "entities/valueObjects/email";
import { UsuarioGateway } from "interfaces/gateways/usuarioGateway";


export default class UsuarioUseCase {
  static async usuarioExiste(usuarioGateway: UsuarioGateway, email: string | null, cpf: string | null): Promise<boolean> {
    return usuarioGateway.filtraUsuario(email, cpf);
  }

  static async criaUsuario(usuarioGateway: UsuarioGateway, usuario: UsuarioDTO) {
    if (usuario.cpf || usuario.email) {
      if (usuario.cpf) {
        const cpfValidado = new CPF(usuario.cpf);
        usuario.cpf = cpfValidado.retornaValor();
      }

      if (usuario.email) {
        const emailValidado = new Email(usuario.email);
        usuario.email = emailValidado.retornaValor();
      }

      const usuarioExiste = await UsuarioUseCase.usuarioExiste(usuarioGateway, usuario.email, usuario.cpf)

      if (usuarioExiste) {
        throw new Error("usuario_duplicado");
      }

    }
    const novoUsuario = new Usuario(usuario);

    return usuarioGateway.criaUsuario(novoUsuario);
  }

  static async listaUsuarios(usuarioGateway: UsuarioGateway): Promise<UsuarioDTO[]> {
    return usuarioGateway.listaUsuarios();
  }

  static async retornaUsuario(usuarioGateway: UsuarioGateway, cpf: string): Promise<UsuarioDTO | null> {
    const cpfValidado = new CPF(cpf);
    return usuarioGateway.retornaUsuario(cpfValidado.retornaValor());
  }

}