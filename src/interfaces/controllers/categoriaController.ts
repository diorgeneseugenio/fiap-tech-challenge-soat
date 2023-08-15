import { CategoriaDTO, CategoriaInput } from "entities/types/CategoriaType";
import { CategoriaGateway } from "interfaces/gateways/categoriaGateway";
import CategoriaRepository from "interfaces/repositories/categoriaRepository";
import CategoriaUseCase from "useCases/categoriaUseCase";

export class CategoriaController {
  static async criarCategoria(
    dbCategoria: CategoriaRepository,
    categoria: CategoriaInput
  ): Promise<CategoriaDTO | null> {
    const categoriaGateway = new CategoriaGateway(dbCategoria);
    const categoriaCriada = await CategoriaUseCase.criaCategoria(
      categoriaGateway, categoria
    );
    return categoriaCriada;
  }

  static async deletaCategoria(
    dbCategoria: CategoriaRepository,
    id: string
  ): Promise<number> {
    const categoriaGateway = new CategoriaGateway(dbCategoria);
    return await CategoriaUseCase.deletaCategoria(
      categoriaGateway, id
    );
  }

  static async editaCategoria(
    dbCategoria: CategoriaRepository,
    id: string,
    categoria: CategoriaInput
  ): Promise<CategoriaDTO | null> {
    const categoriaGateway = new CategoriaGateway(dbCategoria);
    return await CategoriaUseCase.editaCategoria(
      categoriaGateway, id, categoria
    );
  }

  static async listaCategorias(
    dbCategoria: CategoriaRepository
  ): Promise<CategoriaDTO[]> {
    const categoriaGateway = new CategoriaGateway(dbCategoria);
    return await CategoriaUseCase.listaCategorias(categoriaGateway);
  }

  static async retornaCategoria(
    dbCategoria: CategoriaRepository,
    id: string
  ): Promise<CategoriaDTO | null> {
    const categoriaGateway = new CategoriaGateway(dbCategoria);
    return await CategoriaUseCase.retornaCategoria(categoriaGateway, id);
  }
}