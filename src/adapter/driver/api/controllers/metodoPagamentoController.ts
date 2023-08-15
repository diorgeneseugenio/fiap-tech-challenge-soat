import { Request, Response } from "express";

import MetodoPagamentoRepository from "~domain/repositories/metodoPagamentoRepository";
import MetodoPagamentoUseCase from "~domain/useCases/metodoPagamentoUseCase";

import { ListaPagamentosParams, ListaPagamentosPayload } from "../routers/schemas/pagamentoRouter.schema";

export default class MetodoPagamentoController {
  private metodoPagamentoRepository: MetodoPagamentoRepository;
  constructor(metodoPagamentoRepository: MetodoPagamentoRepository) { 
    this.metodoPagamentoRepository = metodoPagamentoRepository;
  }

  async listaPagamentos(
    req: Request<ListaPagamentosParams, ListaPagamentosPayload>, 
    res: Response
  ) {
    try {
      const pagamentos = await MetodoPagamentoUseCase.listaPagamentos(this.metodoPagamentoRepository);
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