import ProdutoService from "core/applications/services/produtoService";
import { Request, Response } from "express";

export default class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) { }

    async criarProduto(req: Request, res: Response) {
        try {
            const produto = req.body;

            const produtoCriado = await this.produtoService.criarProduto(produto);
            return res.status(201).json({
                status: "success",
                message: produtoCriado,
            });
        } catch (err: unknown) {
            return res.status(500).json({
                status: "error",
                message: err,
            });
        }
    }

    async deletarProduto(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const produtoDeletado = await this.produtoService.deletarProduto(id);
            return res.status(200).json({
                status: "success",
                message: produtoDeletado,
            });
        } catch (err: unknown) {
            return res.status(500).json({
                status: "error",
                message: err,
            });
        }
    }

    async editarProduto(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const produto = req.body;

            const produtorAtualizado = await this.produtoService.editarProduto(id, produto);
            return res.status(200).json({
                status: "success",
                message: produtorAtualizado,
            });
        } catch (err: unknown) {
            return res.status(500).json({
                status: "error",
                message: err,
            });
        }
    }

    async listarProdutos(req: Request, res: Response) {
        try {
            const produtos = await this.produtoService.listarProdutos();
            console.log(produtos)
            return res.status(200).json({
                status: "success",
                produtos,
            });
        } catch (err: unknown) {
            return res.status(500).json({
                status: "error",
                message: err,
            });
        }
    }

    async pegarProduto(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const produto = await this.produtoService.pegarProduto(id);
            return res.status(200).json({
                status: "success",
                produto,
            });
        } catch (err: unknown) {
            return res.status(500).json({
                status: "error",
                message: err,
            });
        }
    }
}