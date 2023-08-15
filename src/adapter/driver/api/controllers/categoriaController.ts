import { Request, Response } from "express";
import { CategoriaController } from "interfaces/controllers/categoriaController";
import CategoriaRepository from "interfaces/repositories/categoriaRepository";

import { 
  CriaCategoriaPayload,
  DeletaCategoriaParams,
  EditaCategoriaParams,
  EditaCategoriaPayload,
  ListaCategoriaPayload,
  RetornaCategoriaParams 
} from "../routers/schemas/categoriaRouter.schema";

export default class CategoriaAPIController {
  private dbCategoriasRepository: CategoriaRepository;

  constructor(dbCategoriasRepository: CategoriaRepository) { 
    this.dbCategoriasRepository = dbCategoriasRepository;
  }

  async criaCategoria(req: Request<unknown, CriaCategoriaPayload>, res: Response) {
    try {
      const categoria = req.body;

      const categoriaCriado = await CategoriaController.criarCategoria(this.dbCategoriasRepository,
        categoria
      );
      return res.status(201).json({
        status: "success",
        message: categoriaCriado,
      });
    } catch (err: unknown) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }

  async deletaCategoria(req: Request<DeletaCategoriaParams, unknown>, res: Response) {
    try {
      const { id } = req.params;

      const categoriaDeletado = await CategoriaController.deletaCategoria(this.dbCategoriasRepository, id);

      if (categoriaDeletado > 0) {
        return res.status(200).json({
          status: "success",
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Categoria não encontrada!",
      });
    } catch (err: unknown) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }

  async editaCategoria(req: Request<EditaCategoriaParams, EditaCategoriaPayload>, res: Response) {
    try {
      const { id } = req.params;
      const categoria = req.body;

      const categoriaAtualizada = await CategoriaController.editaCategoria(this.dbCategoriasRepository,
        id,
        categoria
      );

      if (categoriaAtualizada) {
        return res.status(200).json({
          status: "success",
          message: categoriaAtualizada,
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Categoria não encontrada!",
      });
    } catch (err: unknown) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }

  async listaCategorias(req: Request<unknown, ListaCategoriaPayload>, res: Response) {
    try {
      const categorias = await CategoriaController.listaCategorias(this.dbCategoriasRepository);

      return res.status(200).json({
        status: "success",
        categorias,
      });
    } catch (err: unknown) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }

  async retornaCategoria(req: Request<RetornaCategoriaParams, unknown>, res: Response) {
    try {
      const { id } = req.params;

      const categoria = await CategoriaController.retornaCategoria(this.dbCategoriasRepository,id);

      if (categoria) {
        return res.status(200).json({
          status: "success",
          categoria,
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Categoria não encontrada!",
      });
    } catch (err: unknown) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
}
