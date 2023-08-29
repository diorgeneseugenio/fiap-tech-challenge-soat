import { Op } from "sequelize";

import { UsuarioDTO } from "~domain/entities/types/UsuarioType";
import usuarioRepository from "~domain/repositories/usuarioRepository";

import UsuarioModel from "../models/usuarioModel";

class UsuarioDataBaseRepository implements usuarioRepository {
    async criaUsuario(usuario: UsuarioDTO): Promise<UsuarioDTO> {
        try {
            return await UsuarioModel.create(usuario) as UsuarioDTO;
        } catch (err: any) {
            console.error('Erro ao criar Categoria: ', err);
            throw new Error(err);
        }
    }

    async filtraUsuario(cpf: string | null, email: string | null): Promise<UsuarioDTO | null> {
        try {
            const filtro = [];
            if (cpf) {
                filtro.push([{ cpf }])
            }
            if (email) {
                filtro.push([{ email }])
            }


            return await UsuarioModel.findOne({
                where: {
                    [Op.or]: filtro
                }
            }) as UsuarioDTO;
        } catch (err: any) {
            console.error('Erro ao filtrar usuario: ', err);
            throw new Error(err);
        }
    }

    async listaUsuarios(): Promise<UsuarioDTO[]> {
        try {
            return await UsuarioModel.findAll() as UsuarioDTO[];
        } catch (err: any) {
            console.error('Erro ao listar Categoria: ', err);
            throw new Error(err);
        }
    }

    async retornaUsuario(cpf: string): Promise<UsuarioDTO | null> {
        try {
            return await UsuarioModel.findOne({ where: { cpf: cpf } }) as UsuarioDTO;
        } catch (err: any) {
            console.error('Erro ao retornar Categoria: ', err);
            throw new Error(err);
        }

    }
}
export default UsuarioDataBaseRepository;