import { UsuarioDTO } from "~domain/entities/types/UsuarioType";
import UsuarioRepository from "~domain/repositories/usuarioRepository";

export class UsuarioGateway implements UsuarioRepository {
  private usuarioRepository: UsuarioRepository;

  constructor(usuarioRepository: UsuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }
  filtraUsuario(cpf: string | null, email: string | null): Promise<any> {
    return this.usuarioRepository.filtraUsuario(cpf, email);
  }
  criaUsuario(Usuario: UsuarioDTO): Promise<UsuarioDTO> {
    return this.usuarioRepository.criaUsuario(Usuario);
  }
  listaUsuarios(): Promise<UsuarioDTO[]> {
    return this.usuarioRepository.listaUsuarios();
  }
  retornaUsuario(idUsuario: string): Promise<UsuarioDTO | null> {
    return this.usuarioRepository.retornaUsuario(idUsuario);
  }

}
