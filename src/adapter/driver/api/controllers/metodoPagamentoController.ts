import { Request, Response } from "express";

import MetodoPagamentoService from "useCases/metodoPagamentoService";

import { ListaPagamentosParams, ListaPagamentosPayload } from "../routers/schemas/pagamentoRouter.schema";

export default class MetodoPagamentoController {
  constructor(private readonly metodoPagamentoService: MetodoPagamentoService) { }

  async listaPagamentos(
    req: Request<ListaPagamentosParams, ListaPagamentosPayload>, 
    res: Response
  ) {
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