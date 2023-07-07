import express from "express";

import PedidoService from "~core/applications/services/pedidoService";
import FakeCheckout from "~driven/checkout/repository/checkoutRepository";
import FaturaDataBaseRepository from "~driven/infra/repository/faturaDatabaseRepository";
import PedidoDataBaseRepository from "~driven/infra/repository/pedidoDatabaseRepository";
import ProdutosDataBaseRepository from "~driven/infra/repository/produtoDatabaseRepository";

import PedidoController from "../controllers/pedidoController";

import {
  adicionarItemSchema,
  entregarPedidoSchema,
  finalizarPreparoSchema,
  iniciaPedidoSchema,
  iniciarPreparoSchema,
  listarPedidosSchema,
  realizarPedidoSchema,
  removerItemSchema,
} from "./schemas/pedidoRouter.schema";
import { validaRequisicao } from "./utils";

const pedidoRouter = express.Router({});

const dbPedidosRepository = new PedidoDataBaseRepository();
const dbProdutoRepository = new ProdutosDataBaseRepository();
const dbFaturaRepository = new FaturaDataBaseRepository();
const checkoutRepository = new FakeCheckout(dbFaturaRepository);

const pedidoService = new PedidoService(
  dbPedidosRepository,
  dbProdutoRepository,
  checkoutRepository
);

const pedidoController = new PedidoController(pedidoService);

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
  pedidoController.adicionaItem.bind(pedidoController)
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
  pedidoController.removeItem.bind(pedidoController)
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
  pedidoController.iniciaPedido.bind(pedidoController)
);

/**
 * @openapi
 * /pedido/realizar-pedido/{id}:
 *   patch:
 *     summary: Finaliza a customizacao do pedido e envia para checkout (fake checkou já aprova)
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
  pedidoController.realizaPedido.bind(pedidoController)
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
  pedidoController.iniciaPreparo.bind(pedidoController)
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
  pedidoController.finalizaPreparo.bind(pedidoController)
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
  pedidoController.entregaPedido.bind(pedidoController)
);

/**
 * @openapi
 * /pedido/:
 *   get:
 *     summary: Lista os pedidos
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
  pedidoController.listaPedidos.bind(pedidoController)
);

export default pedidoRouter;
