import { Fatura } from "./fatura";
import { ItensDoPedido } from "./itemPedido";

export interface Pedido {
  id: string;
  clienteId: string | null /** Todo: Vincular ao cliente */;
  cliente?: any /** Todo: Vincular ao cliente */;
  faturaId?: string;
  fatura?: Fatura;
  status: StatusDoPedido;
  valor: number;
  itens?: ItensDoPedido;
  retiradoEm: Date | null;
  createdAt: Date;
  updatedAt: Date;
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
