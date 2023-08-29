import express from "express";
import { Request, Response } from "express";

import MetodoPagamentoDatabaseRepository from "~datasources/database/repository/metodoPagamentoDatabaseRepository";
import MetodoPagamentoUseCase from "~domain/useCases/metodoPagamentoUseCase";

import { ListaPagamentosParams, ListaPagamentosPayload, ListaPagamentosSchema } from "./schemas/pagamentoRouter.schema";
import { validaRequisicao } from "./utils";

const metodoPagamento = express.Router();

const dbMetodoPagamentoRepository = new MetodoPagamentoDatabaseRepository();

/**
 * @openapi
 * /metodoPagamento:
 *   get:
 *     summary: Lista metodos de pagamento
 *     tags:
 *       - MetodoPagamentos
 *     responses:
 *       200:
 *         description: lista de metodos de pagamento.
 *       500:
 *         description: Erro na api.
 */
metodoPagamento.get("/",
  validaRequisicao(ListaPagamentosSchema),
  async (
    req: Request<ListaPagamentosParams, ListaPagamentosPayload>, 
    res: Response
  ) => {
    try {
      const pagamentos = await MetodoPagamentoUseCase.listaPagamentos(dbMetodoPagamentoRepository);
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
);

export default metodoPagamento;
