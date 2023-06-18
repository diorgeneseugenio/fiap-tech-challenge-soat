import CategoriaService from "core/applications/services/categoriaService";
import { Request, Response } from "express";

export default class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) { }

    async criaCategoria(req: Request, res: Response) {
        try {
            const categoria = req.body;

            const categoriaCriado = await this.categoriaService.criaCategoria(categoria);
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

    async deletaCategoria(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const categoriaDeletado = await this.categoriaService.deletaCategoria(id);

            if (categoriaDeletado > 0) {
                return res.status(200).json({
                    status: "success",
                });
            }
            return res.status(404).json({
                status: "error",
                message: 'Category not found!',
            });
        } catch (err: unknown) {
            return res.status(500).json({
                status: "error",
                message: err,
            });
        }
    }

    async editaCategoria(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const categoria = req.body;

            const categoriarAtualizado = await this.categoriaService.editaCategoria(id, categoria);

            if (categoriarAtualizado) {
                return res.status(200).json({
                    status: "success",
                    message: categoriarAtualizado,
                });
            }
            return res.status(404).json({
                status: "error",
                message: 'Category not found!',
            });
        } catch (err: unknown) {
            return res.status(500).json({
                status: "error",
                message: err,
            });
        }
    }

    async listaCategorias(req: Request, res: Response) {
        try {
            const categorias = await this.categoriaService.listaCategorias();

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

    async retornaCategoria(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const categoria = await this.categoriaService.retornaCategoria(id);

            if (categoria) {
                return res.status(200).json({
                    status: "success",
                    categoria,
                });
            }
            return res.status(404).json({
                status: "error",
                message: "Category not found!",
            });

        } catch (err: unknown) {
            return res.status(500).json({
                status: "error",
                message: err,
            });
        }
    }
}