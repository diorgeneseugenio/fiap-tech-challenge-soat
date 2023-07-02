import CategoriaRepository from "~core/applications/repositories/categoriaRepository";
import Categoria from "~core/domain/categoria";

export default class CategoriaService {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  async criaCategoria(categoria: Categoria): Promise<Categoria> {
    return this.categoriaRepository.criaCategoria(categoria);
  }

  async deletaCategoria(idCategoria: string): Promise<number> {
    return this.categoriaRepository.deletaCategoria(idCategoria);
  }

  async editaCategoria(
    idCategoria: string,
    categoria: Categoria
  ): Promise<Categoria | null> {
    return this.categoriaRepository.editaCategoria(idCategoria, categoria);
  }

  async listaCategorias(): Promise<Categoria[]> {
    const categorias = this.categoriaRepository.listaCategorias();
    return categorias;
  }

  async retornaCategoria(idCategoria: string): Promise<Categoria | null> {
    return this.categoriaRepository.retornaCategoria(idCategoria);
  }
}
