import {jest} from '@jest/globals'
import { Request, Response } from 'express';

import CategoriaController from "../../../../../adapter/driver/api/controllers/categoriaController";
import CategoriaService from "../../../../../core/applications/services/categoriaService";
jest.mock("../../../../../core/applications/services/categoriaService");

afterEach(() => {
  jest.clearAllMocks();
});

describe('CategoriaController', () => {
  it('deve criar uma nova Categoria', async () => {
    const categoriaServiceMock = {
      criaCategoria: jest.fn().mockReturnValueOnce({ id: 1, nome: 'Categoria teste' }),
    } as unknown as CategoriaService;
    const categoriaController = new CategoriaController(categoriaServiceMock);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await categoriaController.criaCategoria(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: { id: 1, nome: 'Categoria teste' },
    });
  });
  

});
