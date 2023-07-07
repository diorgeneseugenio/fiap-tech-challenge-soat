import Usuario from "core/domain/usuarios";

import CPF from "~core/domain/valueObjects/cpf";
import Email from "~core/domain/valueObjects/email";

import usuarioRepository from "../repositories/usuarioRepository";

export default class UsuarioService {
    constructor(private readonly usuarioRepository: usuarioRepository) { }

    async criaUsuario(usuario: Usuario) {
        if (!usuario.cpf && !usuario.email) {
            if (!usuario.nome) {
                usuario.nome = 'Anonimo'
            }
        } else {
            if (usuario.cpf) {
                const cpfValidado = new CPF(usuario.cpf);
                usuario.cpf = cpfValidado.retornaValor();
            }

            if (usuario.email) {
                const emailValidado = new Email(usuario.email);
                usuario.email = emailValidado.retornaValor();
            }

            const usuarioExistente = await this.usuarioRepository.filtraUsuario(usuario.cpf ?? null, usuario.email ?? null);

            if (usuarioExistente) {
                throw new Error("usuario_duplicado");
            }
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