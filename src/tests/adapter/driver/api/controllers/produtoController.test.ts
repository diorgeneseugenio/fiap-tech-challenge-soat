import { jest } from "@jest/globals";
import { Request, Response } from "express";

//TODO: criar alias dos módulos
import ProdutoController from "../../../../../adapter/driver/api/controllers/produtoController";
import ProdutoService from "../../../../../core/applications/services/produtoService";
jest.mock("../../../../../core/applications/services/produtoService");

describe("ProdutoController", () => {
  let req: Request;
  let res: Response;

  const produtoTeste = {
    nome: "Produto",
    categoriaId: "1",
    preco: 10,
    descricao: "Descrição produto",
    imagens: [{
      id: "1",
      url: "https://api.com/img.jpg"
    }]
  };

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("criar produto", () => {
    it("deve criar um novo produto com sucesso", async () => {
      req = {
        body: produtoTeste,
      } as unknown as Request;

      const produtoServiceMock = {
        criaProduto: jest.fn().mockReturnValueOnce({ id: "1", ...produtoTeste }),
      } as unknown as ProdutoService;

      const produtoController = new ProdutoController(produtoServiceMock);

      await produtoController.criaProduto(req, res);

      expect(produtoServiceMock.criaProduto).toBeCalledWith(produtoTeste)
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: { id: "1", ...produtoTeste },
      });
    });

    it('deve retornar um erro em caso de categoria inexistente', async () => {
      req = {
        body: { nome: 'Produto', categoriaId: 'a' }
      } as unknown as Request;

      const produtoServiceMock = {
        criaProduto: jest.fn().mockImplementationOnce(() => {
          throw new Error('categoria_inexistente')
        }),
      } as unknown as ProdutoService;

      const controller = new ProdutoController(produtoServiceMock);

      await controller.criaProduto(req, res);

      expect(produtoServiceMock.criaProduto).toBeCalledWith({ nome: 'Produto', categoriaId: 'a' });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Category not found!',
      });
    });
  });

  describe("deletar produto", () => {
    it("deve deletar um produto", async () => {
      req = {
        params: { id: "1" },
      } as unknown as Request;

      const produtoServiceMock = {
        deletaProduto: jest.fn().mockReturnValueOnce(1),
      } as unknown as ProdutoService;

      const produtoController = new ProdutoController(produtoServiceMock);

      await produtoController.deletaProduto(req, res)
      expect(produtoServiceMock.deletaProduto).toBeCalledWith("1")
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
      });
    });

    it("deve retornar erro em caso de produto não encontrado", async () => {
      req = {
        params: { id: "a" },
      } as unknown as Request;

      const produtoServiceMock = {
        deletaProduto: jest.fn().mockReturnValueOnce(0),
      } as unknown as ProdutoService;

      const produtoController = new ProdutoController(produtoServiceMock);

      await produtoController.deletaProduto(req, res);

      expect(produtoServiceMock.deletaProduto).toBeCalledWith("a");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: "product not found!",
      });
    });
  });

  describe("editar produto", () => {
    it("deve atualizar um produto", async () => {
      req = {
        params: { id: "1" },
        body: produtoTeste,
      } as unknown as Request;

      const produtoServiceMock = {
        editaProduto: jest.fn().mockReturnValueOnce({ id: "1", ...produtoTeste }),
      } as unknown as ProdutoService;

      const produtoController = new ProdutoController(produtoServiceMock);

      await produtoController.editaProduto(req, res);

      expect(produtoServiceMock.editaProduto).toBeCalledWith("1", produtoTeste)
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: { id: "1", ...produtoTeste },
      });
    });

    it("deve retornar erro em caso de produto não encontrado", async () => {
      req = {
        params: { id: "a" },
        body: { nome: "Produto não atualizado" },
      } as unknown as Request;

      const produtoServiceMock = {
        editaProduto: jest.fn().mockReturnValueOnce(null),
      } as unknown as ProdutoService;

      const produtoController = new ProdutoController(produtoServiceMock);

      await produtoController.editaProduto(req, res);

      expect(produtoServiceMock.editaProduto).toBeCalledWith("a", {
        nome: "Produto não atualizado",
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: "product not found!",
      });
    });

    it('deve retornar um erro em caso de categoria inexistente', async () => {
      req = {
        params: { id: '1' },
        body: { categoriaId: 'a' }
      } as unknown as Request;

      const produtoServiceMock = {
        editaProduto: jest.fn().mockImplementationOnce(() => {
          throw new Error('categoria_inexistente')
        }),
      } as unknown as ProdutoService;

      const controller = new ProdutoController(produtoServiceMock);

      await controller.editaProduto(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Category not found!',
      });
    });
  });

  describe("listar produtos", () => {
    it("deve retornar lista de produtos", async () => {
      req = {
        query: { categoriaId: '1' },
      } as unknown as Request;

      const produtoServiceMock = {
        listaProdutos: jest.fn().mockReturnValueOnce([
          { id: "1", ...produtoTeste },
          { id: "2", ...produtoTeste },
        ]),
      } as unknown as ProdutoService;

      const produtoController = new ProdutoController(produtoServiceMock);

      await produtoController.listaProdutos(req, res);

      expect(produtoServiceMock.listaProdutos).toBeCalledWith({ categoriaId: '1' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        produtos: [
          { id: "1", ...produtoTeste },
          { id: "2", ...produtoTeste },
        ],
      });
    });

    it('deve retornar uma lista vazia de produtos', async () => {
      req = {
        query: { categoriaId: '1' },
      } as unknown as Request;

      const produtoServiceMock = {
        listaProdutos: jest.fn().mockReturnValueOnce([]),
      } as unknown as ProdutoService;

      const produtoController = new ProdutoController(produtoServiceMock);

      await produtoController.listaProdutos(req, res);

      expect(produtoServiceMock.listaProdutos).toBeCalledWith({ categoriaId: '1' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        produtos: [],
      });
    });

    // TODO: caso de erro
  });

  describe('listar um produto', () => {
    it('deve retornar um produto', async () => {
      req = {
        params: { id: '1' },
      } as unknown as Request;

      const produtoServiceMock = {
        retornaProduto: jest.fn().mockReturnValueOnce({ id: "1", ...produtoTeste }),
      } as unknown as ProdutoService;

      const produtoController = new ProdutoController(produtoServiceMock);

      await produtoController.retornaProduto(req, res);

      expect(produtoServiceMock.retornaProduto).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        produto: { id: "1", ...produtoTeste },
      });
    });

    it('deve retornar erro em caso de categoria não encontrado', async () => {
      req = {
        params: { id: 'a' },
      } as unknown as Request;

      const produtoServiceMock = {
        retornaProduto: jest.fn().mockReturnValueOnce(null),
      } as unknown as ProdutoService;

      const produtoController = new ProdutoController(produtoServiceMock);

      await produtoController.retornaProduto(req, res);

      expect(produtoServiceMock.retornaProduto).toHaveBeenCalledWith("a");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Product not found!',
      });
    });
  })

  describe('Deletar uma imagem', () => {
    it('deve remover uma imagem do produto', async () => {
      req = {
        params: { idProduto: '1', idImagem: '2' },
      } as unknown as Request;

      const produtoServiceMock = {
        removeImagem: jest.fn().mockReturnValueOnce(1),
      } as unknown as ProdutoService;

      const produtoController = new ProdutoController(produtoServiceMock);

      await produtoController.removeImagem(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success'
      });
    });

    it('deve retornar erro caso nao forneca o id da imagem', async () => {
      req = {
        params: { idProduto: 'a' },
      } as unknown as Request;

      const produtoServiceMock = {
        removeImagem: jest.fn().mockReturnValueOnce(null),
      } as unknown as ProdutoService;

      const produtoController = new ProdutoController(produtoServiceMock);

      await produtoController.removeImagem(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: "productId not found!",
      });
    });

    it('deve retornar erro caso nao forneca o id do produto', async () => {
      req = {
        params: { idImagem: 'a' },
      } as unknown as Request;

      const produtoServiceMock = {
        removeImagem: jest.fn().mockReturnValueOnce(null),
      } as unknown as ProdutoService;

      const produtoController = new ProdutoController(produtoServiceMock);

      await produtoController.removeImagem(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: "productId not found!",
      });
    });

    it('deve retornar erro caso imagem ou produto nao é localizada', async () => {
      req = {
        params: { idProduto: 'a', idImagem: 'b' },
      } as unknown as Request;

      const produtoServiceMock = {
        removeImagem: jest.fn().mockReturnValueOnce(null),
      } as unknown as ProdutoService;

      const produtoController = new ProdutoController(produtoServiceMock);

      await produtoController.removeImagem(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: "images or product not found!",
      });
    });
  });

  describe('Adicionar imagens ao produto', () => {
    it('deve adicionar imagens', async () => {
      req = {
        params: { id: '1' },
      } as unknown as Request;

      const produtoServiceMock = {
        adicionaImagens: jest.fn().mockReturnValueOnce([{
          "id": "3",
          "deletedAt": null,
          "url": "mockimg1.com",
          "produtoId": "1",
        },
        {
          "id": "4",
          "deletedAt": null,
          "url": "mockimg2.com",
          "produtoId": "1",
        }]),
      } as unknown as ProdutoService;

      const produtoController = new ProdutoController(produtoServiceMock);

      await produtoController.adicionaImagens(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: [{
          "id": "3",
          "deletedAt": null,
          "url": "mockimg1.com",
          "produtoId": "1",
        },
        {
          "id": "4",
          "deletedAt": null,
          "url": "mockimg2.com",
          "produtoId": "1",
        }]
      });
    });

    it('deve retornar erro caso nao encontre o produto', async () => {
      req = {
        params: { idProduto: 'a' },
      } as unknown as Request;

      const produtoServiceMock = {
        adicionaImagens: jest.fn().mockImplementation(() => {throw new Error('produto_inexistente')})
      } as unknown as ProdutoService;

      const produtoController = new ProdutoController(produtoServiceMock);

      await produtoController.adicionaImagens(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: "Product not found!",
      });
    });
  })

});
