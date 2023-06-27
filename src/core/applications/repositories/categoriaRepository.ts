import Categoria from "~core/domain/categorias";

export default interface CategoriaRepository {
  criaCategoria(Categoria: Categoria): Promise<Categoria>;
  deletaCategoria(idCategoria: string): Promise<number>;
  editaCategoria(
    idCategoria: string,
    Categoria: Categoria
  ): Promise<Categoria | null>;
  listaCategorias(): Promise<Categoria[]>;
  retornaCategoria(idCategoria: string): Promise<Categoria | null>;
}
