import { CategoriaGateway } from "interfaces/gateways/categoriaGateway";

import Categoria from "~domain/entities/categoria";
import { CategoriaDTO, CategoriaInput } from "~domain/entities/types/CategoriaType";

export default class CategoriaUseCase {
  static async criaCategoria(categoriaGateway: CategoriaGateway, categoriaInput: CategoriaInput): Promise<CategoriaDTO> {
    const categoria = new Categoria(categoriaInput);
    return await categoriaGateway.criaCategoria(categoria);
  }

  static async deletaCategoria(categoriaGateway: CategoriaGateway, id: string): Promise<number> {
    return await categoriaGateway.deletaCategoria(id);
  }

  static async editaCategoria(categoriaGateway: CategoriaGateway, id: string, categoriaInput: CategoriaInput): Promise<CategoriaDTO | null> {
    const categoria = new Categoria(categoriaInput);
    return await categoriaGateway.editaCategoria(id, categoria);
  }

  static async listaCategorias(categoriaGateway: CategoriaGateway): Promise<CategoriaDTO[]> {
    return await categoriaGateway.listaCategorias();
  }

  static async retornaCategoria(categoriaGateway: CategoriaGateway, id: string): Promise<CategoriaDTO | null> {
    return await categoriaGateway.retornaCategoria(id);
  }
}
