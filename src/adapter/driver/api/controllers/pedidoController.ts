import { Request, Response } from "express";
import { PedidoController } from "interfaces/controllers/pedidoController";
import CheckoutRepository from "interfaces/repositories/checkoutRepository";
import FaturaRepository from "interfaces/repositories/faturaRepository";
import PedidoRepository from "interfaces/repositories/pedidoRepository";
import ProdutoRepository from "interfaces/repositories/produtoRepository";

import {
  AdicionarItemBody,
  AdicionarItemParams,
  EntregarPedidoParams,
  FinalizarPreparoParams,
  IniciaPedidoPayload,
  IniciarPreparoParams,
  ListaPedidosQuery,
  RealizarPedidoBody,
  RealizarPedidoParams,
  RemoverItemParams,
} from "../routers/schemas/pedidoRouter.schema";

export default class PedidoAPIController {
  private dbFaturaRepository: FaturaRepository;
  private dbPedidosRepository: PedidoRepository;
  private dbProdutoRepository: ProdutoRepository;
  private checkoutRepository: CheckoutRepository;

  constructor(
    dbFaturaRepository: FaturaRepository,
    dbPedidosRepository: PedidoRepository,
    dbProdutoRepository: ProdutoRepository,
    checkoutRepository: CheckoutRepository) { 
      this.dbFaturaRepository = dbFaturaRepository;
      this.dbPedidosRepository = dbPedidosRepository;
      this.dbProdutoRepository = dbProdutoRepository;
      this.checkoutRepository = checkoutRepository;
    }

  async iniciaPedido(
    req: Request<unknown, IniciaPedidoPayload>,
    res: Response
  ) {
    try {
      const { body } = req;

      const pedidoCriado = await PedidoController.iniciaPedido(this.dbPedidosRepository, body);

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

  async realizaPedido(
    req: Request<RealizarPedidoParams, RealizarPedidoBody>,
    res: Response
  ) {
    try {
      const { params, body } = req;

      const pedidoCriado = await PedidoController.realizaPedido(this.checkoutRepository, this.dbPedidosRepository, this.dbProdutoRepository, {
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

  async iniciaPreparo(req: Request<IniciarPreparoParams>, res: Response) {
    try {
      const { pedidoId } = req.query;

      const pedido = await PedidoController.iniciaPreparo(this.dbPedidosRepository, this.dbProdutoRepository, pedidoId as string);

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

  async finalizaPreparo(req: Request<FinalizarPreparoParams>, res: Response) {
    try {
      const { params } = req;

      const pedido = await PedidoController.finalizaPreparo(this.dbPedidosRepository, this.dbProdutoRepository, params.id);

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

  async entregaPedido(req: Request<EntregarPedidoParams>, res: Response) {
    try {
      const { params } = req;

      const pedido = await PedidoController.entregaPedido(this.dbPedidosRepository, this.dbProdutoRepository, params.id);

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

  async adicionaItem(
    req: Request<AdicionarItemParams, AdicionarItemBody>,
    res: Response
  ) {
    try {
      const { body, params } = req;

      const pedido = await PedidoController.adicionaItem(this.dbPedidosRepository, this.dbProdutoRepository, {
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

  async removeItem(req: Request<RemoverItemParams>, res: Response) {
    try {
      const { params } = req;

      const pedido = await PedidoController.removeItem(this.dbPedidosRepository,this.dbProdutoRepository, {
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

  async listaPedidos(
    req: Request<unknown, unknown, ListaPedidosQuery>,
    res: Response
  ) {
    try {
      const { query } = req;

      let status: Array<string> = [];
      const clienteId = query.clienteId as string;
      if (query?.status && typeof query.status === "string") {
        status = query.status.split(",");
      }

      const pedidos = await PedidoController.listaPedidos(this.dbPedidosRepository, status, clienteId);

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
}
