import ProdutoRepository from "../../../src/domain/repositories/produtoRepository";

export default class ProdutoRepositoryMock {
    createdAt: Date
    deletedAt: null | Date
    updatedAt: null | Date
    
    constructor(createdAt: Date) {
        this.createdAt = createdAt
        this.deletedAt = null
        this.updatedAt = null
    }

    repository() {
        const produtoRepositoryMock: ProdutoRepository = {
            adicionaImagens: jest.fn().mockResolvedValue(null),
            removeImagem: jest.fn().mockResolvedValue(null),
            criaProduto: jest.fn().mockResolvedValue({
              id: "1",
              nome: "mock_1",
              preco: 10,
              descricao: null,
              createdAt: this.createdAt,
              deletedAt: this.deletedAt,
              updatedAt: this.updatedAt
            }),
            deletaProduto: jest.fn().mockResolvedValue(1),
            editaProduto: jest.fn().mockResolvedValue({
              id: "1",
              nome: "mock_1_editado",
              preco: 1.1,
              descricao: "test",
              createdAt: this.createdAt,
              deletedAt: this.deletedAt,
              updatedAt: this.updatedAt
            }),
            listaProdutos: jest.fn().mockResolvedValue([
              {
                id: "1",
                nome: "mock_1",
                preco: 10,
                descricao: null,
                createdAt: this.createdAt,
                deletedAt: this.deletedAt,
                updatedAt: this.updatedAt
              },
              {
                id: "2",
                nome: "mock_2",
                preco: 101,
                descricao: null,
                createdAt: this.createdAt,
                deletedAt: this.deletedAt,
                updatedAt: this.updatedAt
              },
              {
                id: "3",
                nome: "mock_4",
                preco: 10,
                descricao: null,
                createdAt: this.createdAt,
                deletedAt: this.deletedAt,
                updatedAt: this.updatedAt
              }
            ]),
            retornaProduto: jest.fn().mockResolvedValue({
              id: "1",
              nome: "mock_1",
              preco: 10,
              descricao: null,
              createdAt: this.createdAt,
              deletedAt: this.deletedAt,
              updatedAt: this.updatedAt
            }),
          };

          return produtoRepositoryMock;
    }
}
