import Categoria from "core/domain/categorias";
import CategoriaModel from "../models/categoriaModel";
import CategoriaRepository from "core/applications/repositories/categoriaRepository";


class CategoriasDataBaseRepository implements CategoriaRepository {
    async criaCategoria(categoria: Categoria): Promise<Categoria> {
        try {
            return await CategoriaModel.create(categoria);
        } catch (err: any) {
            console.error('Erro ao criar Categoria: ', err);
            throw new Error(err);
        }
    }

    async deletaCategoria(idCategoria: string): Promise<number> {
        try {
            return CategoriaModel.destroy({ where: { id: idCategoria } });
        } catch (err: any) {
            throw new Error(err);
        }

    }
    async editaCategoria(idCategoria: string, categoria: Categoria): Promise<Categoria | null> {
        try {
            const categoriaAtual = await CategoriaModel.findByPk(idCategoria);

            if (categoriaAtual) {
                Object.assign(categoriaAtual, categoria);
                await categoriaAtual.save();
            }
            return categoriaAtual;
        } catch (err: any) {
            console.error('Erro ao editar Categoria: ', err);
            throw new Error(err);
        }
    }

    async listaCategorias(): Promise<Categoria[]> {
        try {
            return await CategoriaModel.findAll();
        } catch (err: any) {
            console.error('Erro ao listar Categoria: ', err);
            throw new Error(err);
        }
    }

    async retornaCategoria(idCategoria: string): Promise<Categoria | null> {
        try {
            return await CategoriaModel.findByPk(idCategoria);
        } catch (err: any) {
            console.error('Erro ao retornar Categoria: ', err);
            throw new Error(err);
        }
    }
}

export default CategoriasDataBaseRepository;