import { jest } from "@jest/globals";
import { Request, Response } from "express";

import CategoriaController from "../../../../../adapter/driver/api/controllers/categoriaController";
import CategoriaService from "../../../../../core/applications/services/categoriaService";
jest.mock("../../../../../core/applications/services/categoriaService");

describe("CategoriaController", () => {
  let req: Request;
  let res: Response;

  const categoriaServiceMock = {
    criaCategoria: jest.fn().mockReturnValueOnce({ id: 1, nome: "Categoria teste" }),
    deletaCategoria: jest.fn().mockReturnValueOnce(1),
    editaCategoria: jest.fn().mockReturnValueOnce({ id: "1", nome: "Categoria atualizada" }),
    listaCategorias: jest.fn().mockReturnValueOnce([
      { id: "1", nome: "Categoria 1" },
      { id: "2", nome: "Categoria 2" },
    ]),
    retornaCategoria: jest.fn().mockReturnValueOnce({ id: 1, nome: 'Uma categoria' }),
  } as unknown as CategoriaService;

  const categoriaController = new CategoriaController(categoriaServiceMock);

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

  describe("criar categoria", () => {
    it("deve criar uma nova Categoria com sucesso", async () => {
      await categoriaController.criaCategoria(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: { id: 1, nome: "Categoria teste" },
      });
    });
  });

  describe("deletar categoria", () => {
    it("deve deletar uma Categoria", async () => {
      req = {
        params: { id: "1" },
      } as unknown as Request;

      await categoriaController.deletaCategoria(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
      });
    });

    it("deve retornar erro em caso de categoria não encontrada", async () => {
      req = {
        params: { id: "a" },
      } as unknown as Request;

      await categoriaController.deletaCategoria(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: "Category not found!",
      });
    });
  });

  describe("editar categoria", () => {
    it("deve atualizar uma categoria", async () => {
      req = {
        params: { id: "1" },
        body: { nome: "Categoria atualizada" },
      } as unknown as Request;

      await categoriaController.editaCategoria(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: { id: "1", nome: "Categoria atualizada" },
      });
    });

    it("deve retornar erro em caso de categoria não encontrada", async () => {
      req = {
        params: { id: "a" },
        body: { nome: "Categoria não atualizada" },
      } as unknown as Request;

      await categoriaController.editaCategoria(req, res);

      expect(categoriaServiceMock.editaCategoria).toHaveBeenCalledWith("a", {
        nome: "Categoria não atualizada",
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: "Category not found!",
      });
    });
  });

  describe("listar categorias", () => {
    it("deve retornar lista de categorias", async () => {
      await categoriaController.listaCategorias(req, res);

      expect(categoriaServiceMock.listaCategorias).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        categorias: [
          { id: "1", nome: "Categoria 1" },
          { id: "2", nome: "Categoria 2" },
        ],
      });      
    });

    // TODO: caso de erro
    // TODO: caso para lista vazia
  });

  describe('listar uma categoria', () => {
    it('deve retornar uma categoria', async () => {
      req = {
        params: { id: '1' },
      } as unknown as Request;
      
      await categoriaController.retornaCategoria(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        categoria: { id: 1, nome: 'Uma categoria' },
      });
    });

    it('deve retornar erro em caso de categoria não encontrada', async () => {
      req = {
        params: { id: 'a' },
      } as unknown as Request;
      
      await categoriaController.retornaCategoria(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Category not found!',
      });
    });
  })

});
