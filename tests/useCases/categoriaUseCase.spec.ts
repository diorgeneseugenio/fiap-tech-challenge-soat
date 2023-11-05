import { CategoriaInput } from "../../src/domain/entities/types/CategoriaType";
import CategoriaRepository from "../../src/domain/repositories/categoriaRepository";
import CategoriaUseCase from "../../src/domain/useCases/categoriaUseCase";
import CategoriaRepositoryMock from "../mock/repositories/categoriaRepositoryMock";


describe('CategoriaUseCase', () => {
  let categoriaRepositoryMock: CategoriaRepository;
  const createdAt = new Date();
  const updatedAt = null;

  beforeEach(() => {
    categoriaRepositoryMock = new CategoriaRepositoryMock(createdAt).repository();
  })

  it('Testa a criacao de categoria', async () => {

    const categoriaInput: CategoriaInput = {
      id: "1",
      nome: "categoria_mock_1"
    }

    const novaCategoria = await CategoriaUseCase.criaCategoria(categoriaRepositoryMock, categoriaInput)

    expect(novaCategoria.id).toBe(categoriaInput.id);
    expect(novaCategoria.nome).toBe(categoriaInput.nome);
    expect(novaCategoria.createdAt).toBeTruthy();
  });

  it('Testa deletar uma categoria', async () => {

    const categoriaDeletada = await CategoriaUseCase.deletaCategoria(categoriaRepositoryMock, "1")

    expect(categoriaDeletada).toBe(1);

  });


  it('Testa atualizar uma categoria', async () => {

    const categoriaAtualizada = await CategoriaUseCase.editaCategoria(categoriaRepositoryMock, "1", {
      id: "1",
      nome: "categoria_mock_att"
    })

    expect(categoriaAtualizada?.id).toBe("1");
    expect(categoriaAtualizada?.nome).toBe("categoria_mock_att");
    expect(categoriaAtualizada?.updatedAt).toBe(updatedAt);

  });

  it('Testa retornar uma categoria', async () => {

    const categoriaInput = {
      id: "1",
      nome: "categoria_mock_1",
      createdAt,
      deletedAt: null,
      updatedAt: null
    }
    const retornaCategoria = await CategoriaUseCase.retornaCategoria(categoriaRepositoryMock, categoriaInput.id)
    expect(retornaCategoria).toEqual(categoriaInput)

  });

  it('Testa lista de categorias', async () => {


    const categoriaInput1: CategoriaInput = {
      id: "1",
      nome: "categoria_mock_1"
    }
    const categoriaInput2: CategoriaInput = {
      id: "2",
      nome: "categoria_mock_2"
    }
    const categoriaInput3: CategoriaInput = {
      id: "3",
      nome: "categoria_mock_3"
    }


    await CategoriaUseCase.criaCategoria(categoriaRepositoryMock, categoriaInput1)
    await CategoriaUseCase.criaCategoria(categoriaRepositoryMock, categoriaInput2)
    await CategoriaUseCase.criaCategoria(categoriaRepositoryMock, categoriaInput3)


    const pegaCategoria1 = await CategoriaUseCase.listaCategorias(categoriaRepositoryMock)

    expect(pegaCategoria1).toHaveLength(3)
  });
});
