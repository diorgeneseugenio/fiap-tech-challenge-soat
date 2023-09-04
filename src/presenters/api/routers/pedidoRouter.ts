import express from "express";
import { Request, Response } from "express";

import FaturaDataBaseRepository from "~datasources/database/repository/faturaDatabaseRepository";
import PedidoDataBaseRepository from "~datasources/database/repository/pedidoDatabaseRepository";
import ProdutosDataBaseRepository from "~datasources/database/repository/produtoDatabaseRepository";
import CheckoutProvider from "~datasources/paymentProvider/checkoutRepository";
import { PedidoController } from "~interfaceAdapters/controllers/pedidoController";

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
} from "./schemas/pedidoRouter.schema";
import { validaRequisicao } from "./utils";

const pedidoRouter = express.Router({});

const checkoutRepository = new CheckoutProvider();
const dbPedidosRepository = new PedidoDataBaseRepository();
const dbProdutoRepository = new ProdutosDataBaseRepository();
const dbfaturaRepository = new FaturaDataBaseRepository();

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
  validaRequisicao(adicionarItemSchema),
  async (
    req: Request<AdicionarItemParams, AdicionarItemBody>,
    res: Response
  ) => {
    try {
      const { body, params } = req;

      const pedido = await PedidoController.adicionaItem(dbPedidosRepository, dbProdutoRepository, {
        ...body,
        pedidoId: params.id,
      });

      return res.status(201).json({
        status: "success",
        message: pedido,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
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
  validaRequisicao(removerItemSchema),
  async (req: Request<RemoverItemParams>, res: Response) => {
    try {
      const { params } = req;

      const pedido = await PedidoController.removeItem(dbPedidosRepository, dbProdutoRepository, {
        pedidoId: params.id,
        itemId: params.idItem,
      });

      return res.status(201).json({
        status: "success",
        message: pedido,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
);

/**
 * @openapi
 * /pedido/iniciar-pedido:
 *   post:
 *     summary: Cria um rascunho de pedido
 *     tags:
 *       - pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteId:
 *                 type: string
 *     responses:
 *       201:
 *         description: pedido criado.
 *       404:
 *         description: pedido ou produto nao encontrado.
 *       500:
 *         description: Erro na api.
 */
pedidoRouter.post(
  "/iniciar-pedido",
  validaRequisicao(iniciaPedidoSchema),
  async (
    req: Request<unknown, IniciaPedidoPayload>,
    res: Response
  ) => {
    try {
      const { body } = req;

      const pedidoCriado = await PedidoController.iniciaPedido(dbPedidosRepository, body);

      return res.status(201).json({
        status: "success",
        message: pedidoCriado,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
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
  validaRequisicao(realizarPedidoSchema),
  async (
    req: Request<RealizarPedidoParams, RealizarPedidoBody>,
    res: Response
  ) => {
    try {
      const { params, body } = req;

      const pedidoCriado = await PedidoController.realizaPedido(checkoutRepository, dbfaturaRepository, dbPedidosRepository, dbProdutoRepository, {
        pedidoId: params.id,
        metodoDePagamentoId: body.metodoDePagamentoId,
      });

      return res.status(201).json({
        status: "success",
        message: pedidoCriado,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
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
  validaRequisicao(iniciarPreparoSchema),
  async (req: Request<IniciarPreparoParams>, res: Response) => {
    try {
      const { pedidoId } = req.query;

      const pedido = await PedidoController.iniciaPreparo(dbPedidosRepository, dbProdutoRepository, pedidoId as string);

      if (pedido) {
        return res.status(201).json({
          status: "success",
          message: pedido,
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Nenhum pedido na fila",
      })

    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
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
  validaRequisicao(finalizarPreparoSchema),
  async (req: Request<FinalizarPreparoParams>, res: Response) => {
    try {
      const { params } = req;

      const pedido = await PedidoController.finalizaPreparo(dbPedidosRepository, dbProdutoRepository, params.id);

      return res.status(201).json({
        status: "success",
        message: pedido,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
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
  validaRequisicao(entregarPedidoSchema),
  async (req: Request<EntregarPedidoParams>, res: Response) => {
    try {
      const { params } = req;

      const pedido = await PedidoController.entregaPedido(dbPedidosRepository, dbProdutoRepository, params.id);

      return res.status(201).json({
        status: "success",
        message: pedido,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
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
 *         required: false
 *         description: Status do pedido que deseja filtrar
 *       - in: query
 *         name: clienteId
 *         schema:
 *           type: string
 *         required: false
 *         description: Retorna os pedidos do cliente
 *     tags:
 *       - pedido
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
  validaRequisicao(listarPedidosSchema),
  async (
    req: Request<unknown, unknown, ListaPedidosQuery>,
    res: Response
  ) => {
    try {
      const { query } = req;

      let status: Array<string> = [];
      const clienteId = query.clienteId as string;
      if (query?.status && typeof query.status === "string") {
        status = query.status.split(",");
      }

      const pedidos = await PedidoController.listaPedidos(dbPedidosRepository, status, clienteId);

      return res.status(200).json({
        status: "success",
        message: pedidos,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
);

export default pedidoRouter;
