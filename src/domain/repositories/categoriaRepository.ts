import { CategoriaDTO } from "~domain/entities/types/CategoriaType";

export default interface CategoriaRepository {
  criaCategoria(Categoria: CategoriaDTO): Promise<CategoriaDTO>;
  deletaCategoria(idCategoria: string): Promise<number>;
  editaCategoria(
    idCategoria: string,
    Categoria: CategoriaDTO
  ): Promise<CategoriaDTO | null>;
  listaCategorias(): Promise<CategoriaDTO[]>;
  retornaCategoria(idCategoria: string): Promise<CategoriaDTO | null>;
}
