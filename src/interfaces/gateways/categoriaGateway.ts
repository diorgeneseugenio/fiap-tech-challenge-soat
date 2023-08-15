import { CategoriaDTO } from "~domain/entities/types/CategoriaType";
import CategoriaRepository from "~domain/repositories/categoriaRepository";

export class CategoriaGateway implements CategoriaRepository {
  private categoriaRepository: CategoriaRepository;

  constructor(categoriaRepository: CategoriaRepository) {
    this.categoriaRepository = categoriaRepository;
  }
  criaCategoria(Categoria: CategoriaDTO): Promise<CategoriaDTO> {
    return this.categoriaRepository.criaCategoria(Categoria);
  }
  deletaCategoria(idCategoria: string): Promise<number> {
    return this.categoriaRepository.deletaCategoria(idCategoria);
  }
  editaCategoria(idCategoria: string, Categoria: CategoriaDTO): Promise<CategoriaDTO | null> {
    return this.categoriaRepository.editaCategoria(idCategoria, Categoria);
  }
  listaCategorias(): Promise<CategoriaDTO[]> {
    return this.categoriaRepository.listaCategorias();
  }
  retornaCategoria(idCategoria: string): Promise<CategoriaDTO | null> {
    return this.categoriaRepository.retornaCategoria(idCategoria);
  }

}
