import Usuario from "core/domain/usuarios";
import usuarioRepository from "../repositories/usuarioRepository";
import CPF from "~core/domain/valueObjects/cpf";

export default class UsuarioService {
    constructor(private readonly usuarioRepository: usuarioRepository) { }

    async criaUsuario(usuario: Usuario) {
        if (usuario.cpf) {
            const cpfValidado = new CPF(usuario.cpf);
            usuario.cpf = cpfValidado.retornaValor();
        }
        return this.usuarioRepository.criaUsuario(usuario);
    }

    async listaUsuarios(): Promise<Usuario[]> {
        const usuarios = this.usuarioRepository.listaUsuarios();
        return usuarios;
    }

    async retornaUsuario(cpf: string): Promise<Usuario | null> {
        const cpfValidado = new CPF(cpf);
        return this.usuarioRepository.retornaUsuario(cpfValidado.retornaValor());
    }

}