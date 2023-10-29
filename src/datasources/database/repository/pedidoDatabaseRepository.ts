/* eslint-disable @typescript-eslint/no-non-null-assertion */
import throwError from "handlerError/handlerError";
import sequelize, { Op, WhereOptions } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import { ItemDoPedidoDTO } from "~domain/entities/types/itensPedidoType";
import { AdicionaItemInput, RemoveItemInput } from "~domain/entities/types/pedidoService.type";
import {
  PedidoDTO,
  StatusDoPedido,
  statusDoPedido,
} from "~domain/entities/types/pedidoType";
import PedidoRepository from "~domain/repositories/pedidoRepository";

import FaturaModel from "../models/faturaModel";
import ItemDoPedidoModel from "../models/itemPedidoModel";
import PedidoModel from "../models/pedidoModel";

class PedidoDataBaseRepository implements PedidoRepository {
  async retornaItensPedido(
    pedidoId: string
  ): Promise<ItemDoPedidoDTO[] | null> {
    return await ItemDoPedidoModel.findAll({
      where: { pedidoId },
    });

  }
  async criaPedido(pedido: PedidoDTO): Promise<PedidoDTO> {
    return (await PedidoModel.create(pedido)) as PedidoDTO;

  }

  async atualizaStatusDoPedido(
    id: string,
    statusDoPedido: StatusDoPedido
  ): Promise<PedidoDTO> {
    const pedido = await PedidoModel.findByPk(id);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    pedido!.status = statusDoPedido;
    await pedido?.save();
    return pedido as PedidoDTO;

  }

  async atualizaPedido(pedido: PedidoDTO): Promise<PedidoDTO> {
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

  }

  async retornaPedido(id: string, clienteId: string | null = null): Promise<PedidoDTO | null> {
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
      where: clienteId ? { id, clienteId } : { id },
    })) as PedidoDTO;
  }

  async retornaProximoPedidoFila(): Promise<PedidoDTO | null> {
    return (await PedidoModel.findOne({
      where: { status: statusDoPedido.AGUARDANDO_PREPARO },
      order: [["updatedAt", "ASC"]],
    })) as PedidoDTO;
  }

  async adicionaItem(
    adicionaItem: AdicionaItemInput
  ): Promise<PedidoDTO | null> {
    await ItemDoPedidoModel.create({
      ...adicionaItem,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const pedido = await PedidoModel.findOne({
      where: { id: adicionaItem.pedidoId },
    });

    if (!pedido) throwError("NOT_FOUND", "Pedido não encontrado");

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
  }

  async removeItem(
    removeItemInput: RemoveItemInput
  ): Promise<PedidoDTO | null> {
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
  }

  async retornaItem(id: string): Promise<ItemDoPedidoDTO | null> {
    return (await ItemDoPedidoModel.findOne({
      where: { id },
    })) as ItemDoPedidoDTO;
  }

  async listaPedidos(
    status?: Array<string>,
    clienteId?: string
  ): Promise<Array<PedidoDTO> | null> {
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
  }
}

export default PedidoDataBaseRepository;
