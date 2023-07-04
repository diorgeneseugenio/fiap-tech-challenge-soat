import express from "express";

import PedidoService from "~core/applications/services/pedidoService";
import PedidoDataBaseRepository from "~driven/infra/repository/pedidoDatabaseRepository";
import ProdutosDataBaseRepository from "~driven/infra/repository/produtoDatabaseRepository";

import PedidoController from "../controllers/pedidoController";

import {
  adicionarItemSchema,
  iniciaPedidoSchema,
  removerItemSchema,
} from "./pedidoRouter.schema";
import { validaRequisicao } from "./utils";

const pedidoRouter = express.Router({});

const dbPedidosRepository = new PedidoDataBaseRepository();
const dbProdutoRepository = new ProdutosDataBaseRepository();

const pedidoService = new PedidoService(
  dbPedidosRepository,
  dbProdutoRepository
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

export default pedidoRouter;
