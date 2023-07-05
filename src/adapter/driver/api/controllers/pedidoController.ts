import { Request, Response } from "express";

import PedidoService from "~core/applications/services/pedidoService";

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
} from "../routers/pedidoRouter.schema";

export default class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  async iniciaPedido(
    req: Request<unknown, IniciaPedidoPayload>,
    res: Response
  ) {
    try {
      const { body } = req;

      const pedidoCriado = await this.pedidoService.iniciaPedido(body);

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

      const pedidoCriado = await this.pedidoService.realizaPedido({
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
      const { params } = req;

      const pedido = await this.pedidoService.iniciaPreparo(params.id);

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

  async finalizaPreparo(req: Request<FinalizarPreparoParams>, res: Response) {
    try {
      const { params } = req;

      const pedido = await this.pedidoService.finalizaPreparo(params.id);

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

      const pedido = await this.pedidoService.entregaPedido(params.id);

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

      const pedido = await this.pedidoService.adicionaItem({
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

      const pedido = await this.pedidoService.removeItem({
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

      const pedidos = await this.pedidoService.listaPedidos(status, clienteId);

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
