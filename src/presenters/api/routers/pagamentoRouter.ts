import express, { NextFunction } from "express";
import { Request, Response } from "express";

import FaturaDataBaseRepository from "~datasources/database/repository/faturaDatabaseRepository";
import PagamentoDatabaseRepository from "~datasources/database/repository/pagamentoDatabaseRepository";
import PedidoDataBaseRepository from "~datasources/database/repository/pedidoDatabaseRepository";
import { TipoUsuario } from "~domain/repositories/authenticationRepository";
import { PagamentoController } from "~interfaceAdapters/controllers/pagamentoController";

import authenticate from "../middleware/auth";

import { RecebimentoDePagamentosPayload, RecebimentoDePagamentosSchema } from "./schemas/pagamentoRouter.schema";
import { validaRequisicao } from "./utils";

const pagamentoRouter = express.Router();

const dbPagamentoRepository = new PagamentoDatabaseRepository();
const pedidoRepository = new PedidoDataBaseRepository()
const faturaRepository = new FaturaDataBaseRepository()


/**
 * @openapi
 * /pagamento:
 *   post:
 *     summary: Recebe confirmação ou negação de pagamento (Para teste pagamentoId=7ef6e15a-9f11-40fe-9d19-342505377600 )
 *     tags:
 *       - Pagamento
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pagamentoId:
 *                 type: string
 *                 default: 7ef6e15a-9f11-40fe-9d19-342505377600 
 *               faturaId:
 *                 type: string
 *               isPago:
 *                 type: boolean
 *               valorPagamento:
 *                 type: number
 *               tipoDePagamento:
 *                 type: string
 *                 default: "QRCode"
 *     responses:
 *       200:
 *         description: lista de metodos de pagamento.
 *       500:
 *         description: Erro na api.
 */
pagamentoRouter.post("/",
  authenticate(TipoUsuario.ADMIN),
  validaRequisicao(RecebimentoDePagamentosSchema),
  async (
    req: Request<unknown, RecebimentoDePagamentosPayload>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { body } = req;
      const pagamentoCriado = await PagamentoController.recebePagamento(
        faturaRepository,
        pedidoRepository,
        dbPagamentoRepository,
        body);

      return res.status(201).json({
        status: "success",
        message: pagamentoCriado,
      });
    } catch (err: unknown) {
      console.log(`Erro ao criar  pagamento: ${err}`)
      return next(err);
    }
  })

export default pagamentoRouter;
