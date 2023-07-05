import { Fatura, StatusDePagamento } from "~core/domain/fatura";
import { Pedido } from "~core/domain/pedido";

export interface Pagamento {
  qrCode?: string;
  statusDePagamento: StatusDePagamento;
}

export type GeraPagamentoInput = { metodoDePagamentoId: string; pedido: Pedido }

export default interface CheckoutRepository {
  geraFatura(geraPagamentoInput: GeraPagamentoInput): Promise<Fatura>;
}
