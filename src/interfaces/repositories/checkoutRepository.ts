import { Fatura, StatusDePagamento } from "entities/fatura";
import Pedido  from "entities/pedido";

export interface Pagamento {
  qrCode?: string;
  statusDePagamento: StatusDePagamento;
}

export type GeraPagamentoInput = { metodoDePagamentoId: string; pedido: Pedido }

export default interface CheckoutRepository {
  geraPagamento(geraPagamentoInput: GeraPagamentoInput): Promise<Fatura>;
}
