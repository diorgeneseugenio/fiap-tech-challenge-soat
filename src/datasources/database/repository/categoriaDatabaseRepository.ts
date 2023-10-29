import { CategoriaDTO } from "~domain/entities/types/CategoriaType";
import CategoriaRepository from "~domain/repositories/categoriaRepository";

import CategoriaModel from "../models/categoriaModel";


class CategoriasDataBaseRepository implements CategoriaRepository {
  async criaCategoria(categoria: CategoriaDTO): Promise<CategoriaDTO> {
    return await CategoriaModel.create(categoria) as CategoriaDTO;
  }

  async deletaCategoria(idCategoria: string): Promise<number> {
    return CategoriaModel.destroy({ where: { id: idCategoria } });
  }
  async editaCategoria(
    idCategoria: string,
    categoria: CategoriaDTO
  ): Promise<CategoriaDTO | null> {
    const categoriaAtual = await CategoriaModel.findByPk(idCategoria);

    if (categoriaAtual) {
      Object.assign(categoriaAtual, categoria);
      await categoriaAtual.save();
    }
    return categoriaAtual as CategoriaDTO;
  }

  async listaCategorias(): Promise<CategoriaDTO[]> {
    return await CategoriaModel.findAll();
  }

  async retornaCategoria(idCategoria: string): Promise<CategoriaDTO | null> {
    return await CategoriaModel.findByPk(idCategoria);
  }
}

export default CategoriasDataBaseRepository;
