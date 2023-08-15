import express from "express";

import MetodoPagamentoDatabaseRepository from "~adapter/driven/infra/repository/metodoPagamentoDatabaseRepository";

import MetodoPagamentoController from "../controllers/metodoPagamentoController";

import { ListaPagamentosSchema } from "./schemas/pagamentoRouter.schema";
import { validaRequisicao } from "./utils";

const metodoPagamento = express.Router();

const dbMetodoPagamentoRepository = new MetodoPagamentoDatabaseRepository();
const metodoPagamentoController = new MetodoPagamentoController(dbMetodoPagamentoRepository);

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
  metodoPagamentoController.listaPagamentos.bind(metodoPagamentoController)
);

export default metodoPagamento;
