import { WhereOptions } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import PedidoRepository, {
  AdicionaItemInput,
  AtualizaPedidoInput,
  CriaPedidoInput,
  RemoveItemInput,
} from "~core/applications/repositories/pedidoRepository";
import { ItemDoPedido } from "~core/domain/itemPedido";
import { Pedido } from "~core/domain/pedido";

import ItemDoPedidoModel from "../models/itemPedidoModel";
import PedidoModel from "../models/pedidoModel";

class PedidoDataBaseRepository implements PedidoRepository {
  async criaPedido({
    status,
    valor,
    clienteId = null,
  }: CriaPedidoInput): Promise<Pedido> {
    try {
      return PedidoModel.create({
        id: uuidv4(),
        clienteId,
        status,
        valor,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (err: any) {
      console.error("Erro ao criar Pedido: ", err);
      throw new Error(err);
    }
  }

  async atualizaPedido({
    id,
    status,
    retiradoEm,
    faturaId,
  }: AtualizaPedidoInput): Promise<Pedido> {
    try {
      return (await PedidoModel.update(
        { status, retiradoEm, faturaId },
        { where: { id } }
      ).then(() =>
        PedidoModel.findOne({
          where: { id },
          include: ["itens", "fatura"],
        })
      )) as Pedido;
    } catch (err: any) {
      console.error("Erro ao atualizar Pedido: ", err);
      throw new Error(err);
    }
  }

  async retornaPedido(id: string): Promise<Pedido | null> {
    try {
      return PedidoModel.findOne({
        where: { id },
      });
    } catch (err: any) {
      console.error("Erro ao retornar pedido: ", err);
      throw new Error(err);
    }
  }

  async adicionaItem(adicionaItem: AdicionaItemInput): Promise<Pedido | null> {
    try {
      await ItemDoPedidoModel.create({
        ...adicionaItem,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const pedido = await PedidoModel.findOne({
        where: { id: adicionaItem.pedidoId },
      });

      if (!pedido) throw new Error("Pedido não encontrado");

      const valor = pedido.valor + adicionaItem.valorTotal;

      return (await PedidoModel.update(
        { valor },
        { where: { id: adicionaItem.pedidoId } }
      ).then(() =>
        PedidoModel.findOne({
          where: { id: adicionaItem.pedidoId },
          include: "itens",
        })
      )) as Pedido;
    } catch (err: any) {
      console.error("Erro ao adicionar item: ", err);
      throw new Error(err);
    }
  }

  async removeItem(removeItemInput: RemoveItemInput): Promise<Pedido | null> {
    try {
      await ItemDoPedidoModel.destroy({
        where: { id: removeItemInput.itemId },
      });

      return (await PedidoModel.update(
        { valor: removeItemInput.valorPedido },
        { where: { id: removeItemInput.pedidoId } }
      ).then(() =>
        PedidoModel.findOne({
          where: { id: removeItemInput.pedidoId },
          include: "itens",
        })
      )) as Pedido;
    } catch (err: any) {
      console.error("Erro ao remover item: ", err);
      throw new Error(err);
    }
  }

  async retornaItem(id: string): Promise<ItemDoPedido | null> {
    try {
      return ItemDoPedidoModel.findOne({
        where: { id },
      });
    } catch (err: any) {
      console.error("Erro ao retornar item: ", err);
      throw new Error(err);
    }
  }

  async listaPedidos(status?: Array<string>): Promise<Array<Pedido> | null> {
    try {
      let where: WhereOptions<Pedido> = { deletedAt: null };

      if (status && status.length > 0) {
        where = { ...where, status };
      }

      return PedidoModel.findAll({
        where,
        order: [
          ["createdAt", "ASC"],
          ["status", "ASC"],
        ],
      });
    } catch (err: any) {
      console.error("Erro ao listar pedidos: ", err);
      throw new Error(err);
    }
  }
}

export default PedidoDataBaseRepository;
