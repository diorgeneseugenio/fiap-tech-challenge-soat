import { Fatura } from "./fatura";
import { ItensDoPedido } from "./itemPedido";

export interface Pedido {
  id: string;
  idCliente: string | null /** Todo: Vincular ao cliente */;
  cliente?: any /** Todo: Vincular ao cliente */;
  idFatura?: string;
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
  AGUARDANDO_PREPARO: "Aguardando preparo",
  EM_PREPARO: "Em preparo",
  PRONTO: "Pronto",
  ENTREGUE: "Entregue",
} as const;

export type StatusDoPedido =
  (typeof statusDoPedido)[keyof typeof statusDoPedido];
