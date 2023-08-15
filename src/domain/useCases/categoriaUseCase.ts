import Categoria from "~domain/entities/categoria";
import { CategoriaDTO, CategoriaInput } from "~domain/entities/types/CategoriaType";
import CategoriaRepository from "~domain/repositories/categoriaRepository";

export default class CategoriaUseCase {
  static async criaCategoria(categoriaRepository: CategoriaRepository, categoriaInput: CategoriaInput): Promise<CategoriaDTO> {
    const categoria = new Categoria(categoriaInput);
    return await categoriaRepository.criaCategoria(categoria);
  }

  static async deletaCategoria(categoriaRepository: CategoriaRepository, id: string): Promise<number> {
    return await categoriaRepository.deletaCategoria(id);
  }

  static async editaCategoria(categoriaRepository: CategoriaRepository, id: string, categoriaInput: CategoriaInput): Promise<CategoriaDTO | null> {
    const categoria = new Categoria(categoriaInput);
    return await categoriaRepository.editaCategoria(id, categoria);
  }

  static async listaCategorias(categoriaRepository: CategoriaRepository): Promise<CategoriaDTO[]> {
    return await categoriaRepository.listaCategorias();
  }

  static async retornaCategoria(categoriaRepository: CategoriaRepository, id: string): Promise<CategoriaDTO | null> {
    return await categoriaRepository.retornaCategoria(id);
  }
}
