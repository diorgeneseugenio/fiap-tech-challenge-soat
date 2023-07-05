import express from "express";

import MetodoPagamentoDatabaseRepository from "~driven/infra/repository/metodoPagamentoDatabaseRepository";
import MetodoPagamentoService from "~core/applications/services/metodoPagamentoService";
import MetodoPagamentoController from "../controllers/metodoPagamentoController";

const metodoPagamento = express.Router();

const dbMetodoPagamentoRepository = new MetodoPagamentoDatabaseRepository();
const metodoPagamentoService = new MetodoPagamentoService(dbMetodoPagamentoRepository);
const metodoPagamentoController = new MetodoPagamentoController(metodoPagamentoService);

/**
 * @openapi
 * /metodoPagamento:
 *   get:
 *     description: lista metodos de pagamento
 *     tags:
 *       - MetodoPagamentos
 *     responses:
 *       200:
 *         description: lista de metodos de pagamento.
 *       500:
 *         description: Erro na api.
 */
metodoPagamento.get("/", metodoPagamentoController.listaPagamentos.bind(metodoPagamentoController));

export default metodoPagamento;
