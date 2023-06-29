import Usuario from "core/domain/usuarios";
import usuarioRepository from "../repositories/usuarioRepository";

export default class UsuarioService {
    constructor(private readonly usuarioRepository: usuarioRepository) { }

    async criaUsuario(usuario: Usuario) {
        return this.usuarioRepository.criaUsuario(usuario);
    }

    async listaUsuarios(): Promise<Usuario[]> {
        const usuarios = this.usuarioRepository.listaUsuarios();
        return usuarios;
    }

    async retornaUsuario(cpf: string | null): Promise<Usuario | null> {
        return this.usuarioRepository.retornaUsuario(cpf);
    }

}