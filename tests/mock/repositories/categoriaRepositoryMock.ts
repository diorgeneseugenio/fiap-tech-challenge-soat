import CategoriaRepository from "../../../src/domain/repositories/categoriaRepository"

export default class CategoriaRepositoryMock {
    createdAt: Date
    
    constructor(createdAt: Date) {
        this.createdAt = createdAt
    }

    repository() {
        const categoriaRepositoryMock: CategoriaRepository = {
            criaCategoria: jest.fn().mockResolvedValue({
              id: "1",
              nome: "categoria_mock_1",
              createdAt: this.createdAt,
              updatedAt: null,
              deletedAt: null,
            }),
            deletaCategoria: jest.fn().mockResolvedValue(1),
            editaCategoria: jest.fn().mockResolvedValue({
              id: "1",
              nome: "categoria_mock_att",
              createdAt: this.createdAt,
              updatedAt: null,
              deletedAt: null,
            }),
            listaCategorias: jest.fn().mockResolvedValue([{
              id: "1",
              nome: "categoria_mock_1",
              createdAt: this.createdAt,
              updatedAt: null,
              deletedAt: null,
            }, {
              id: "2",
              nome: "categoria_mock_2",
              createdAt: this.createdAt,
              updatedAt: null,
              deletedAt: null,
            }, {
              id: "3",
              nome: "categoria_mock_3",
              createdAt: this.createdAt,
              updatedAt: null,
              deletedAt: null,
            }]),
            retornaCategoria: jest.fn().mockResolvedValue({
              id: "1",
              nome: "categoria_mock_1",
              createdAt: this.createdAt,
              updatedAt: null,
              deletedAt: null,
            }),
          }

          return categoriaRepositoryMock;
    }
}