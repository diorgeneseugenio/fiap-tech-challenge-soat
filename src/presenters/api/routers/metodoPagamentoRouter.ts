import express, { NextFunction } from "express";
import { Request, Response } from "express";
import throwError from "handlerError/handlerError";

import MetodoPagamentoDatabaseRepository from "~datasources/database/repository/metodoPagamentoDatabaseRepository";
import { TipoUsuario } from "~domain/repositories/authenticationRepository";
import MetodoPagamentoUseCase from "~domain/useCases/metodoPagamentoUseCase";

import authenticate from "../middleware/auth";

import { ListaPagamentosParams, ListaPagamentosPayload, ListaPagamentosSchema } from "./schemas/metodoPagamentoRouter.schema";
import { validaRequisicao } from "./utils";

const metodoPagamentoRouter = express.Router();

const dbMetodoPagamentoRepository = new MetodoPagamentoDatabaseRepository();

/**
 * @openapi
 * /metodo-pagamento:
 *   get:
 *     summary: Lista metodos de pagamento
 *     tags:
 *       - MetodoPagamentos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: lista de metodos de pagamento.
 *       500:
 *         description: Erro na api.
 */
metodoPagamentoRouter.get("/",
  authenticate(TipoUsuario.CLIENT),
  validaRequisicao(ListaPagamentosSchema),
  async (
    req: Request<ListaPagamentosParams, ListaPagamentosPayload>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const pagamentos = await MetodoPagamentoUseCase.listaPagamentos(dbMetodoPagamentoRepository);

      if (!pagamentos) {
        throwError('NOT_FOUND', 'Pagamentos nao Encontrado');
      }


      return res.status(201).json({
        status: "success",
        message: pagamentos,
      });
    } catch (err: unknown) {
      console.log(`Erro ao buscar pagamento: ${err}`)
      return next(err);
    }
  },
);

export default metodoPagamentoRouter;
