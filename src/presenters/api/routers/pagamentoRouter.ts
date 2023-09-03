import express from "express";
import { Request, Response } from "express";

import PagamentoDatabaseRepository from "~datasources/database/repository/pagamentoDatabaseRepository";
import { PagamentoController } from "~interfaceAdapters/controllers/pagamentoController";

import { RecebimentoDePagamentosPayload, RecebimentoDePagamentosSchema } from "./schemas/pagamentoRouter.schema";
import { validaRequisicao } from "./utils";

const pagamentoRouter = express.Router();

const dbPagamentoRepository = new PagamentoDatabaseRepository();


/**
 * @openapi
 * /pagamento:
 *   post:
 *     summary: WebHook - Recebe confirmação ou negação de pagamento
 *     tags:
 *       - Pagamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pagamentoId:
 *                 type: string
 *               faturaId:
 *                 type: string
 *               isPago:
 *                 type: boolean
 *               valorPagamento:
 *                 type: number
 *               tipoDePagamento:
 *                 type: string
 *     responses:
 *       200:
 *         description: lista de metodos de pagamento.
 *       500:
 *         description: Erro na api.
 */
  pagamentoRouter.post("/",
  validaRequisicao(RecebimentoDePagamentosSchema),
  async (
    req: Request<unknown, RecebimentoDePagamentosPayload>, 
    res: Response
  ) => {
    try {
      const { body } = req;
      const pagamentoCriado = await PagamentoController.recebePagamento(dbPagamentoRepository, body);
      return res.status(201).json({
        status: "success",
        message: pagamentoCriado,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  })

  export default pagamentoRouter;
  