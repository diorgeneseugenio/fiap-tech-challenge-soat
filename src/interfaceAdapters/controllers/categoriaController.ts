import { CategoriaDTO, CategoriaInput } from "~domain/entities/types/CategoriaType";
import CategoriaRepository from "~domain/repositories/categoriaRepository";
import CategoriaUseCase from "~domain/useCases/categoriaUseCase";

export class CategoriaController {
  static async criarCategoria(
    categoriaRepository: CategoriaRepository,
    categoria: CategoriaInput
  ): Promise<CategoriaDTO | null> {
    const categoriaCriada = await CategoriaUseCase.criaCategoria(
      categoriaRepository, categoria
    );
    return categoriaCriada;
  }

  static async deletaCategoria(
    categoriaRepository: CategoriaRepository,
    id: string
  ): Promise<number> {
    return await CategoriaUseCase.deletaCategoria(
      categoriaRepository, id
    );
  }

  static async editaCategoria(
    categoriaRepository: CategoriaRepository,
    id: string,
    categoria: CategoriaInput
  ): Promise<CategoriaDTO | null> {
    return await CategoriaUseCase.editaCategoria(
      categoriaRepository, id, categoria
    );
  }

  static async listaCategorias(
    categoriaRepository: CategoriaRepository
  ): Promise<CategoriaDTO[]> {
    return await CategoriaUseCase.listaCategorias(categoriaRepository);
  }

  static async retornaCategoria(
    categoriaRepository: CategoriaRepository,
    id: string
  ): Promise<CategoriaDTO | null> {
    return await CategoriaUseCase.retornaCategoria(categoriaRepository, id);
  }
}