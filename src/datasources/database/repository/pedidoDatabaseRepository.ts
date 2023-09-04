/* eslint-disable @typescript-eslint/no-non-null-assertion */
import sequelize, { Op, WhereOptions } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import { ItemDoPedidoDTO } from "~domain/entities/types/itensPedidoType";
import {
  PedidoDTO,
  StatusDoPedido,
  statusDoPedido,
} from "~domain/entities/types/pedidoType";
import PedidoRepository, {
  AdicionaItemInput,
  RemoveItemInput,
} from "~domain/repositories/pedidoRepository";

import FaturaModel from "../models/faturaModel";
import ItemDoPedidoModel from "../models/itemPedidoModel";
import PedidoModel from "../models/pedidoModel";

class PedidoDataBaseRepository implements PedidoRepository {
  async retornaItensPedido(
    pedidoId: string
  ): Promise<ItemDoPedidoDTO[] | null> {
    try {
      return await ItemDoPedidoModel.findAll({
        where: { pedidoId },
      });
    } catch (err: any) {
      console.error("Erro ao criar Pedido: ", err);
      throw new Error(err);
    }
  }
  async criaPedido(pedido: PedidoDTO): Promise<PedidoDTO> {
    try {
      return (await PedidoModel.create(pedido)) as PedidoDTO;
    } catch (err: any) {
      console.error("Erro ao criar Pedido: ", err);
      throw new Error(err);
    }
  }

  async atualizaStatusDoPedido(
    id: string,
    statusDoPedido: StatusDoPedido
  ): Promise<PedidoDTO> {
    try {
      const pedido = await PedidoModel.findByPk(id);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      pedido!.status = statusDoPedido;
      await pedido?.save();
      return pedido as PedidoDTO;
    } catch (err: any) {
      console.error("Erro ao atualizar status do pedido: ", err);
      throw new Error(err);
    }
  }

  async atualizaPedido(pedido: PedidoDTO): Promise<PedidoDTO> {
    try {
      // TODO - refatorar

      const pedidoAtual = await PedidoModel.findByPk(pedido.id, {
        include: ["itens"],
      });

      if (pedido.faturaId) {
        pedidoAtual!.faturaId = pedido.faturaId;
      }

      const idsPostsExistentes = pedidoAtual?.itens?.map(
        (item) => item.id
      ) as [];

      if (idsPostsExistentes) {
        const idsPostsParaRemover = idsPostsExistentes?.filter(
          (id) => !pedido?.itens?.some((item) => item.id === id)
        );
        await ItemDoPedidoModel.destroy({ where: { id: idsPostsParaRemover } });
      }

      if (pedido.itens) {
        await ItemDoPedidoModel.bulkCreate(pedido.itens, {
          updateOnDuplicate: ["id"],
        });
      }

      if (pedidoAtual) {
        Object.assign(pedidoAtual, pedido);
        await pedidoAtual.save();
      }

      return pedido;
    } catch (err: any) {
      console.error("Erro ao atualizar Pedido: ", err);
      throw new Error(err);
    }
  }

  async retornaPedido(id: string): Promise<PedidoDTO | null> {
    try {
      return (await PedidoModel.findOne({
        include: [
          {
            model: ItemDoPedidoModel,
            as: "itens",
          },
          {
            model: FaturaModel,
            as: "fatura",
          },
        ],
        where: { id },
      })) as PedidoDTO;
    } catch (err: any) {
      console.error("Erro ao retornar pedido: ", err);
      throw new Error(err);
    }
  }

  async retornaProximoPedidoFila(): Promise<PedidoDTO | null> {
    try {
      return (await PedidoModel.findOne({
        where: { status: statusDoPedido.AGUARDANDO_PREPARO },
        order: [["updatedAt", "ASC"]],
      })) as PedidoDTO;
    } catch (err: any) {
      console.error("Erro ao retornar proximo pedido da fila: ", err);
      throw new Error(err);
    }
  }

  async adicionaItem(
    adicionaItem: AdicionaItemInput
  ): Promise<PedidoDTO | null> {
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
      )) as PedidoDTO;
    } catch (err: any) {
      console.error("Erro ao adicionar item: ", err);
      throw new Error(err);
    }
  }

  async removeItem(
    removeItemInput: RemoveItemInput
  ): Promise<PedidoDTO | null> {
    try {
      await ItemDoPedidoModel.destroy({
        where: { id: removeItemInput.itemId },
      });

      return (await PedidoModel.update(
        // { valor: removeItemInput.valorPedido }, // todo
        { valor: 0 }, // todo
        { where: { id: removeItemInput.pedidoId } }
      ).then(() =>
        PedidoModel.findOne({
          where: { id: removeItemInput.pedidoId },
          include: ["itens"],
        })
      )) as PedidoDTO;
    } catch (err: any) {
      console.error("Erro ao remover item: ", err);
      throw new Error(err);
    }
  }

  async retornaItem(id: string): Promise<ItemDoPedidoDTO | null> {
    try {
      return (await ItemDoPedidoModel.findOne({
        where: { id },
      })) as ItemDoPedidoDTO;
    } catch (err: any) {
      console.error("Erro ao retornar item: ", err);
      throw new Error(err);
    }
  }

  async listaPedidos(
    status?: Array<string>,
    clienteId?: string
  ): Promise<Array<PedidoDTO> | null> {
    try {
      let where: WhereOptions<PedidoDTO> = {
        deletedAt: null,
        status: {
          [Op.or]: [
            statusDoPedido.PRONTO,
            statusDoPedido.EM_PREPARO,
            statusDoPedido.AGUARDANDO_PREPARO,
          ],
        },
      };

      if (status && status.length > 0) {
        where = { ...where, status };
      }

      if (clienteId && clienteId.length > 0) {
        where = { ...where, clienteId };
      }

      return (await PedidoModel.findAll({
        where,
        order: [
          sequelize.fn(
            "field",
            sequelize.col("status"),
            statusDoPedido.PRONTO,
            statusDoPedido.EM_PREPARO,
            statusDoPedido.AGUARDANDO_PREPARO
          ),
          ["createdAt", "ASC"],
        ],
        include: ["itens", "fatura"],
      })) as PedidoDTO[];
    } catch (err: any) {
      console.error("Erro ao listar pedidos: ", err);
      throw new Error(err);
    }
  }
}

export default PedidoDataBaseRepository;
