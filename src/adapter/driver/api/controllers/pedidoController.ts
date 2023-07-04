import { Request, Response } from "express";

import PedidoService from "~core/applications/services/pedidoService";

import {
  AdicionarItemBody,
  AdicionarItemParams,
  IniciaPedidoPayload,
  RemoverItemParams,
} from "../routers/pedidoRouter.schema";

export default class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  async iniciaPedido(req: Request, res: Response) {
    try {
      const { body } = req as IniciaPedidoPayload;

      const pedidoCriado = await this.pedidoService.iniciaPedido(body);

      return res.status(201).json({
        status: "success",
        message: pedidoCriado,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err,
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
        message: err,
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
        message: err,
      });
    }
  }
}
