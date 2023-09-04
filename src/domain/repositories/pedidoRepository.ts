import Pedido from "~domain/entities/pedido";
import { ItemDoPedidoDTO } from "~domain/entities/types/itensPedidoType";
import { PedidoDTO, StatusDoPedido } from "~domain/entities/types/pedidoType";

export type CriaPedidoInput = {
  clienteId?: string | null;
  valor: number;
  status: StatusDoPedido;
};

export type AtualizaPedidoInput = {
  id: string;
  status?: StatusDoPedido;
  retiradoEm?: Date;
  faturaId?: string;
};

export type AdicionaItemInput = {
  pedidoId: string;
  produtoId: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  observacao?: string | null;
};

export type RemoveItemInput = {
  pedidoId: string;
  itemId: string;
};

export type RetornaItemInput = {
  id: string;
};

export default interface PedidoRepository {
  criaPedido(pedido: PedidoDTO): Promise<PedidoDTO>;
  atualizaPedido(pedido: Pedido): Promise<PedidoDTO>;
  atualizaStatusDoPedido(id: string, statusDoPedido: StatusDoPedido): Promise<PedidoDTO>;
  adicionaItem(adicionarItemInput: AdicionaItemInput): Promise<PedidoDTO | null>;
  retornaPedido(id: string): Promise<PedidoDTO | null>;
  listaPedidos(status?: Array<string>, clienteId?: string): Promise<Array<PedidoDTO> | null>;
  retornaProximoPedidoFila(): Promise<PedidoDTO | null>;
  removeItem(removeItemInput: RemoveItemInput): Promise<PedidoDTO | null>;
  retornaItem(id: string): Promise<ItemDoPedidoDTO | null>;
  retornaItensPedido(pedidoId: string): Promise<ItemDoPedidoDTO[] | null>;
}
