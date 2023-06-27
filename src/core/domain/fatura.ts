import { MetodoDePagamento } from "./metodoDePagamento";
import { Pedido } from "./pedido";

export const statusDePagamento = {
  AGUARDANDO_PAGAMENTO: "Aguardando pagamento",
  ERRO_AO_PROCESSAR_PAGAMENTO: "Erro ao processar pagamento",
  PAGAMENTO_APROVADO: "Pagamento aprovado",
  PAGAMENTO_NEGADO: "Pagamento negado",
} as const;

export type StatusDePagamento =
  (typeof statusDePagamento)[keyof typeof statusDePagamento];

export interface Fatura {
  id: string;
  idPedido: string;
  pedido?: Pedido;
  idMetodoDePagamento: string;
  metodoDePagamento?: MetodoDePagamento;
  statusDePagamento: StatusDePagamento;
  pagoEm: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
