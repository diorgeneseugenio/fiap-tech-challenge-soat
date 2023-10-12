import { ProdutoInput } from "../../src/domain/entities/types/produtoType";
import ProdutoRepository from "../../src/domain/repositories/produtoRepository";
// import ProdutoRepository from "../../src/domain/repositories/produtoRepository";
import ProdutoUseCase from "../../src/domain/useCases/produtoUseCase";
import ProdutoRepositoryMock from "../mock/repositories/produtoRepositoryMock";


describe('ProdutoUseCase', () => {
  let produtoRepositoryMock: ProdutoRepository;
  const createdAt = new Date();
  const updatedAt = null;
  beforeEach(() => {
    produtoRepositoryMock = new ProdutoRepositoryMock(createdAt).repository();
    // produtoRepositoryMock = {
    //   adicionaImagens: jest.fn().mockResolvedValue(null),
    //   removeImagem: jest.fn().mockResolvedValue(null),
    //   criaProduto: jest.fn().mockResolvedValue({
    //     id: "1",
    //     nome: "mock_1",
    //     preco: 10,
    //     descricao: null,
    //     createdAt,
    //     deletedAt: null,
    //     updatedAt: null
    //   }),
    //   deletaProduto: jest.fn().mockResolvedValue(1),
    //   editaProduto: jest.fn().mockResolvedValue({
    //     id: "1",
    //     nome: "mock_1_editado",
    //     preco: 1.1,
    //     descricao: "test",
    //     createdAt,
    //     deletedAt: null,
    //     updatedAt
    //   }),
    //   listaProdutos: jest.fn().mockResolvedValue([
    //     {
    //       id: "1",
    //       nome: "mock_1",
    //       preco: 10,
    //       descricao: null,
    //       createdAt,
    //       deletedAt: null,
    //       updatedAt: null
    //     },
    //     {
    //       id: "2",
    //       nome: "mock_2",
    //       preco: 101,
    //       descricao: null,
    //       createdAt,
    //       deletedAt: null,
    //       updatedAt: null
    //     },
    //     {
    //       id: "3",
    //       nome: "mock_4",
    //       preco: 10,
    //       descricao: null,
    //       createdAt,
    //       deletedAt: null,
    //       updatedAt: null
    //     }
    //   ]),
    //   retornaProduto: jest.fn().mockResolvedValue({
    //     id: "1",
    //     nome: "mock_1",
    //     preco: 10,
    //     descricao: null,
    //     createdAt,
    //     deletedAt: null,
    //     updatedAt: null
    //   }),
    // };
  })


  it('Testa a criacao do produto', async () => {

    const produtoInput: ProdutoInput = {
      id: "1",
      nome: "mock_1",
      preco: 10,
      descricao: 'test',
      createdAt,
      deletedAt: null,
      updatedAt: null
    }

    const novoProduto = await ProdutoUseCase.criaProduto(produtoRepositoryMock, produtoInput)

    expect(novoProduto.id).toBe(produtoInput.id);
    expect(novoProduto.nome).toBe(produtoInput.nome);
  });

  it('Testa a validacao do valor do produto > 0', async () => {

    const produtoInput: ProdutoInput = {
      id: "1",
      nome: "mock_1",
      preco: 0,
      descricao: 'test',
      createdAt: new Date(),
      deletedAt: null,
      updatedAt: null
    }

    expect(async () => {
      await ProdutoUseCase.criaProduto(produtoRepositoryMock, produtoInput)
    }).rejects.toThrow()
  });

  it('Testa deletar um produto', async () => {
    const produtoDeletado = await ProdutoUseCase.deletaProduto(produtoRepositoryMock, "1")

    expect(produtoDeletado).toBe(1);

  });

  it('Testa atualizar uma produto', async () => {

    const produtoAtt: ProdutoInput = {
      id: "1",
      nome: "mock_1_editado",
      preco: 1.1,
      descricao: "test",
      createdAt,
      deletedAt: null,
      updatedAt
    }

    const produtoAtualizado = await ProdutoUseCase.editaProduto(produtoRepositoryMock, "1", produtoAtt)

    expect(produtoAtualizado?.id).toBe(produtoAtt.id);
    expect(produtoAtualizado?.nome).toBe("mock_1_editado");
    expect(produtoAtualizado?.preco).toBe(1.1);
    expect(produtoAtualizado?.descricao).toBe("test");

  });

  it('Testa retornar uma produto', async () => {

    const expected = {
      id: "1",
      nome: "mock_1",
      preco: 10,
      descricao: null,
      createdAt,
      deletedAt: null,
      updatedAt: null
    }
    const retornaProduto = await ProdutoUseCase.retornaProduto(produtoRepositoryMock, "1")
    expect(retornaProduto).toStrictEqual(expected)

  });

  it('Testa lista de produtos', async () => {
    const listaProduto = await ProdutoUseCase.listaProdutos(produtoRepositoryMock, {})

    expect(listaProduto).toHaveLength(3)
  });
});
