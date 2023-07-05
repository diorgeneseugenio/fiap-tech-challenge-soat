import express from "express";

import FakeCheckout from "~driven/checkout/repository/checkoutRepository";
import PedidoService from "~core/applications/services/pedidoService";
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
} from "./pedidoRouter.schema";
import { validaRequisicao } from "./utils";

const pedidoRouter = express.Router({});

const checkout = new FakeCheckout();
const dbPedidosRepository = new PedidoDataBaseRepository();
const dbProdutoRepository = new ProdutosDataBaseRepository();
const dbFaturaRepository = new FaturaDataBaseRepository();

const pedidoService = new PedidoService(
  dbPedidosRepository,
  dbProdutoRepository,
  dbFaturaRepository,
  checkout
);

const pedidoController = new PedidoController(pedidoService);

pedidoRouter.post(
  "/:id/adicionar-item",
  validaRequisicao(adicionarItemSchema),
  pedidoController.adicionaItem.bind(pedidoController)
);

pedidoRouter.delete(
  "/:id/remover-item/:idItem",
  validaRequisicao(removerItemSchema),
  pedidoController.removeItem.bind(pedidoController)
);

pedidoRouter.post(
  "/iniciar-pedido",
  validaRequisicao(iniciaPedidoSchema),
  pedidoController.iniciaPedido.bind(pedidoController)
);

pedidoRouter.patch(
  "/realizar-pedido/:id",
  validaRequisicao(realizarPedidoSchema),
  pedidoController.realizaPedido.bind(pedidoController)
);

pedidoRouter.patch(
  "/iniciar-preparo/:id",
  validaRequisicao(iniciarPreparoSchema),
  pedidoController.iniciaPreparo.bind(pedidoController)
);

pedidoRouter.patch(
  "/finalizar-preparo/:id",
  validaRequisicao(finalizarPreparoSchema),
  pedidoController.finalizaPreparo.bind(pedidoController)
);

pedidoRouter.patch(
  "/entregar-pedido/:id",
  validaRequisicao(entregarPedidoSchema),
  pedidoController.entregaPedido.bind(pedidoController)
);

pedidoRouter.get(
  "/",
  validaRequisicao(listarPedidosSchema),
  pedidoController.listaPedidos.bind(pedidoController)
);

export default pedidoRouter;
