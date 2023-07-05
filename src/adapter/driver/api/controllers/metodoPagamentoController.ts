import { Request, Response } from "express";

import MetodoPagamentoService from "~core/applications/services/metodoPagamentoService";

export default class MetodoPagamentoController {
    constructor(private readonly metodoPagamentoService: MetodoPagamentoService) { }

    async listaPagamentos(req: Request, res: Response) {
        try {
            const pagamentos = await this.metodoPagamentoService.listaPagamentos();
            return res.status(201).json({
                status: "success",
                message: pagamentos,
            });
        } catch (err: any) {
            return res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
}