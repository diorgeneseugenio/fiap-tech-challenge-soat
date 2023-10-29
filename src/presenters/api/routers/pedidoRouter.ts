import express, { NextFunction } from "express";
import { Request, Response } from "express";
import throwError from "handlerError/handlerError";

import FaturaDataBaseRepository from "~datasources/database/repository/faturaDatabaseRepository";
import PedidoDataBaseRepository from "~datasources/database/repository/pedidoDatabaseRepository";
import ProdutosDataBaseRepository from "~datasources/database/repository/produtoDatabaseRepository";
import CheckoutProvider from "~datasources/paymentProvider/checkoutRepository";
import { TipoUsuario } from "~domain/repositories/authenticationRepository";
import { queryStatusPagamentoInput } from "~domain/repositories/pedidoRepository";
import { PedidoController } from "~interfaceAdapters/controllers/pedidoController";

import authenticate from "../middleware/auth";

import {
  AdicionarItemBody,
  AdicionarItemParams,
  adicionarItemSchema,
  EntregarPedidoParams,
  entregarPedidoSchema,
  FinalizarPreparoParams,
  finalizarPreparoSchema,
  IniciaPedidoPayload,
  iniciaPedidoSchema,
  IniciarPreparoParams,
  iniciarPreparoSchema,
  ListaPedidosQuery,
  listarPedidosSchema,
  RealizarPedidoBody,
  RealizarPedidoParams,
  realizarPedidoSchema,
  RemoverItemParams,
  removerItemSchema,
  statusPagamentoSchema,
  StatusPedidoParams,
} from "./schemas/pedidoRouter.schema";
import { validaRequisicao } from "./utils";

const pedidoRouter = express.Router({});

const checkoutRepository = new CheckoutProvider();
const dbPedidosRepository = new PedidoDataBaseRepository();
const dbProdutoRepository = new ProdutosDataBaseRepository();
const dbFaturaRepository = new FaturaDataBaseRepository();

/**
 * @openapi
 * /pedido/{id}/adicionar-item:
 *   post:
 *     summary: Adiciona um produto ao pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do pedido
 *     tags:
 *       - pedido
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               produtoId:
 *                 type: string
 *               quantidade:
 *                 type: number
 *               observacao:
 *                 type: string
 *     responses:
 *       201:
 *         description: produto adicionado.
 *       404:
 *         description: pedido ou produto nao encontrado.
 *       500:
 *         description: Erro na api.
 */
pedidoRouter.post(
  "/:id/adicionar-item",
  authenticate(TipoUsuario.CLIENT),
  validaRequisicao(adicionarItemSchema),
  async (
    req: Request<AdicionarItemParams, AdicionarItemBody>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { body, params } = req;
      const { clienteId } = req

      const pedido = await PedidoController.adicionaItem(
        dbPedidosRepository,
        dbProdutoRepository,
        {
          ...body,
          pedidoId: params.id,
          clienteId
        }
      );

      return res.status(201).json({
        status: "success",
        message: pedido,
      });
    } catch (err: unknown) {
      console.log(`Erro ao adicionar item ao pedido: ${err}`);
      return next(err);
    }
  }
);

/**
 * @openapi
 * /pedido/{id}/remover-item/{idItem}:
 *   delete:
 *     summary: Remove um produto ao pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do pedido
 *       - in: path
 *         name: idItem
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do item do pedido
 *     tags:
 *       - pedido
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: retorna pedido.
 *       404:
 *         description: pedido nao encontrado.
 *       500:
 *         description: Erro na api.
 */
pedidoRouter.delete(
  "/:id/remover-item/:idItem",
  authenticate(TipoUsuario.CLIENT),
  validaRequisicao(removerItemSchema),
  async (req: Request<RemoverItemParams>, res: Response, next: NextFunction) => {
    try {
      const { params } = req;
      const { clienteId } = req


      const pedido = await PedidoController.removeItem(
        dbPedidosRepository,
        dbProdutoRepository,
        {
          pedidoId: params.id,
          itemId: params.idItem,
          clienteId
        }
      );

      return res.status(201).json({
        status: "success",
        message: pedido,
      });
    } catch (err: unknown) {
      console.log(`Erro ao deletar item ao pedido: ${err}`);
      return next(err);
    }
  }
);

/**
 * @openapi
 * /pedido/iniciar-pedido:
 *   get:
 *     summary: Cria um rascunho de pedido
 *     tags:
 *       - pedido
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: pedido criado.
 *       404:
 *         description: pedido ou produto nao encontrado.
 *       500:
 *         description: Erro na api.
 */
pedidoRouter.get(
  "/iniciar-pedido",
  authenticate(TipoUsuario.CLIENT),
  validaRequisicao(iniciaPedidoSchema),
  async (req: Request<unknown, IniciaPedidoPayload>, res: Response, next: NextFunction) => {
    try {
      const { clienteId } = req;

      if (!clienteId) {
        throwError("NOT_FOUND","ClienteId Nao encontrado!");
      }

      const pedidoCriado = await PedidoController.iniciaPedido(
        dbPedidosRepository,
        clienteId
      );

      return res.status(201).json({
        status: "success",
        message: pedidoCriado,
      });
    } catch (err: unknown) {
      console.log(`Erro ao inciar pedido: ${err}`);
      return next(err);
    }
  }
);

/**
 * @openapi
 * /pedido/realizar-pedido/{id}:
 *   patch:
 *     summary: Finaliza a customizacao do pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do pedido
 *     tags:
 *       - pedido
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               metodoDePagamentoId:
 *                 type: string
 *     responses:
 *       201:
 *         description: atualizacao do pedido.
 *       404:
 *         description: pedido ou produto nao encontrado.
 *       500:
 *         description: Erro na api.
 */
pedidoRouter.patch(
  "/realizar-pedido/:id",
  authenticate(TipoUsuario.CLIENT),
  validaRequisicao(realizarPedidoSchema),
  async (
    req: Request<RealizarPedidoParams, RealizarPedidoBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { params, body } = req;
      const { clienteId } = req;

      const pedidoCriado = await PedidoController.realizaPedido(
        checkoutRepository,
        dbFaturaRepository,
        dbPedidosRepository,
        dbProdutoRepository,
        {
          pedidoId: params.id,
          metodoDePagamentoId: body.metodoDePagamentoId,
          clienteId
        }
      );

      return res.status(201).json({
        status: "success",
        message: pedidoCriado,
      });
    } catch (err: unknown) {
      console.log(`Erro ao realizar pedido: ${err}`);
      return next(err);
    }
  }
);

/**
 * @openapi
 * /pedido/iniciar-preparo/:
 *   patch:
 *     summary: Muda status do proximo pedido da fila para "Em preparo" ou um pedido especifico
 *     tags:
 *       - pedido
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pedidoId
 *         schema:
 *           type: string
 *         required: false
 *         description: Id do pedido
 *     responses:
 *       201:
 *         description: atualizacao do pedido.
 *       404:
 *         description: pedido ou produto nao encontrado.
 *       500:
 *         description: Erro na api.
 */
pedidoRouter.patch(
  "/iniciar-preparo/",
  authenticate(TipoUsuario.ADMIN),
  validaRequisicao(iniciarPreparoSchema),
  async (req: Request<IniciarPreparoParams>, res: Response, next: NextFunction) => {
    try {
      const { pedidoId } = req.query;

      const pedido = await PedidoController.iniciaPreparo(
        dbPedidosRepository,
        dbProdutoRepository,
        pedidoId as string
      );

      if (pedido) {
        return res.status(201).json({
          status: "success",
          message: pedido,
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Nenhum pedido na fila",
      });
    } catch (err: unknown) {
      console.log(`Erro ao iniciar preparo do pedido: ${err}`);
      return next(err);
    }
  }
);

/**
 * @openapi
 * /pedido/finalizar-preparo/{id}:
 *   patch:
 *     summary: Muda status para "Pronto"
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do pedido
 *     tags:
 *       - pedido
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: atualizacao do pedido.
 *       404:
 *         description: pedido ou produto nao encontrado.
 *       500:
 *         description: Erro na api.
 */
pedidoRouter.patch(
  "/finalizar-preparo/:id",
  authenticate(TipoUsuario.ADMIN),
  validaRequisicao(finalizarPreparoSchema),
  async (req: Request<FinalizarPreparoParams>, res: Response, next: NextFunction) => {
    try {
      const { params } = req;

      const pedido = await PedidoController.finalizaPreparo(
        dbPedidosRepository,
        dbProdutoRepository,
        params.id
      );

      return res.status(201).json({
        status: "success",
        message: pedido,
      });
    } catch (err: unknown) {
      console.log(`Erro ao finalizar preparo do pedido: ${err}`);
      return next(err);
    }
  }
);

/**
 * @openapi
 * /pedido/entregar-pedido/{id}:
 *   patch:
 *     summary: Muda status para "Finalizado"
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do pedido
 *     tags:
 *       - pedido
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: atualizacao do pedido.
 *       404:
 *         description: pedido ou produto nao encontrado.
 *       500:
 *         description: Erro na api.
 */
pedidoRouter.patch(
  "/entregar-pedido/:id",
  authenticate(TipoUsuario.ADMIN),
  validaRequisicao(entregarPedidoSchema),
  async (req: Request<EntregarPedidoParams>, res: Response, next: NextFunction) => {
    try {
      const { params } = req;

      const pedido = await PedidoController.entregaPedido(
        dbPedidosRepository,
        dbProdutoRepository,
        params.id
      );

      return res.status(201).json({
        status: "success",
        message: pedido,
      });
    } catch (err: unknown) {
      console.log(`Erro ao entregar  pedido: ${err}`);
      return next(err);
    }
  }
);

/**
 * @openapi
 * /pedido/:
 *   get:
 *     summary: Lista os pedidos e filtra a fila por status
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Rascunho,Aguardando pagamento,Falha em gerar pedido,Aguardando preparo,Em preparo,Pronto,Entregue]
 *         required: false
 *         description: Status do pedido que deseja filtrar
 *       - in: query
 *         name: clienteId
 *         schema:
 *           type: string
 *         required: false
 *         description: Retorna os pedidos do cliente(Apenas usuários admin. Cliente já filtra pelo usuario logado)
 *     tags:
 *       - pedido
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: lista de pedidos.
 *       404:
 *         description: pedido ou produto nao encontrado.
 *       500:
 *         description: Erro na api.
 */
pedidoRouter.get(
  "/",
  authenticate(TipoUsuario.CLIENT),
  validaRequisicao(listarPedidosSchema),
  async (req: Request<unknown, unknown, ListaPedidosQuery>, res: Response, next: NextFunction) => {
    try {
      const { query } = req;
      const { clienteId } = req;
      const { tipoUsuario } = req

      let status: Array<string> = [];

      if (query.clienteId && tipoUsuario === TipoUsuario.CLIENT && query.clienteId !== clienteId) {
        return res.status(401).json({
          error: "Sem permissao para consultar pedidos de outros usuários",
        });
      }

      if (query?.status && typeof query.status === "string") {
        status = query.status.split(",");
      }

      const queryClienteId = query.clienteId as string ?? clienteId;
      const pedidos = await PedidoController.listaPedidos(
        dbPedidosRepository,
        status,
        queryClienteId
      );

      return res.status(200).json({
        status: "success",
        message: pedidos,
      });
    } catch (err: unknown) {
      console.log(`Erro ao buscar pedido: ${err}`);
      return next(err);
    }
  }
);

/**
 * @openapi
 * /pedido/{id}/status-pagamento:
 *   get:
 *     summary: Consulta status de pagamento do pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do pedido
 *     tags:
 *       - pedido
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: retorna status de pagamento.
 *       404:
 *         description: pedido ou fatura nao encontrado.
 *       500:
 *         description: Erro na api.
 */
pedidoRouter.get(
  "/:id/status-pagamento",
  authenticate(TipoUsuario.CLIENT),
  validaRequisicao(statusPagamentoSchema),
  async (req: Request<StatusPedidoParams>, res: Response, next: NextFunction) => {
    try {
      const { params } = req;
      const { clienteId } = req;
      const { tipoUsuario } = req;
      const { id: pedidoId } = params;

      const queryStatusPagamento: queryStatusPagamentoInput = {
        pedidoId,
      }

      if (tipoUsuario === TipoUsuario.CLIENT) {
        queryStatusPagamento.clienteId = clienteId
      }

      const statusPagamentoPedido = await PedidoController.statusDePagamento(
        dbPedidosRepository,
        dbFaturaRepository,
        queryStatusPagamento
      );

      if (statusPagamentoPedido) {
        return res.status(200).json({
          status: "success",
          message: statusPagamentoPedido,
        });
      }

      throwError("NOT_FOUND", "Pedido ou fatura não encontrado");

    } catch (err: unknown) {
      console.log(`Erro ao buscar status pagamento do pedido: ${err}`);
      return next(err);
    }
  }
);

export default pedidoRouter;
