import usuarioRepository from "core/applications/repositories/usuarioRepository";
import Usuario from "core/domain/usuarios";

import UsuarioModel from "../models/usuarioModel";
import { Op } from "sequelize";

class UsuarioDataBaseRepository implements usuarioRepository {
    async criaUsuario(usuario: Usuario): Promise<Usuario> {
        try {
            return await UsuarioModel.create(usuario);
        } catch (err: any) {
            console.error('Erro ao criar Categoria: ', err);
            throw new Error(err);
        }
    }

    async filtraUsuario(cpf: string | null, email: string | null): Promise<Usuario | null> {
        try {
            return await UsuarioModel.findOne({
                where: {
                    [Op.or]: [
                        { cpf },
                        { email }
                    ]
                }
            });
        } catch (err: any) {
            console.error('Erro ao filtrar usuario: ', err);
            throw new Error(err);
        }
    }

    async listaUsuarios(): Promise<Usuario[]> {
        try {
            return await UsuarioModel.findAll();
        } catch (err: any) {
            console.error('Erro ao listar Categoria: ', err);
            throw new Error(err);
        }
    }

    async retornaUsuario(cpf: string): Promise<Usuario | null> {
        try {
            return await UsuarioModel.findOne({ where: { cpf: cpf } });
        } catch (err: any) {
            console.error('Erro ao retornar Categoria: ', err);
            throw new Error(err);
        }

    }
}
export default UsuarioDataBaseRepository;