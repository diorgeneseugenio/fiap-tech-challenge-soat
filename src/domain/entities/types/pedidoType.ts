import { ItemDoPedidoDTO } from "./itensPedidoType";

export interface PedidoInput {
  id?: string;
  clienteId: string;
  faturaId: string | null;
  status: StatusDoPedido;
  valor: number;
  retiradoEm: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export const statusDoPedido = {
  RASCUNHO: "Rascunho",
  AGUARDANDO_PAGAMENTO: "Aguardando pagamento",
  FALHA: "Falha em gerar pedido",
  AGUARDANDO_PREPARO: "Aguardando preparo",
  EM_PREPARO: "Em preparo",
  PRONTO: "Pronto",
  ENTREGUE: "Entregue",
} as const;

export type StatusDoPedido =
  (typeof statusDoPedido)[keyof typeof statusDoPedido];

export interface PedidoDTO {
  id: string;
  clienteId: string;
  faturaId: string | null;
  status: StatusDoPedido;
  valor: number;
  itens?: ItemDoPedidoDTO[];
  retiradoEm: Date | null;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
}