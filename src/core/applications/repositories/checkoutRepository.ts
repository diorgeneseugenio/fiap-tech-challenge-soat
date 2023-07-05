import { StatusDePagamento } from "~core/domain/fatura";
import { Pedido } from "~core/domain/pedido";

export interface Pagamento {
    qrCode?: string;
    statusDePagamento: StatusDePagamento;
  }

export default interface CheckoutRepository {
    geraPagamento(metodoDePagamentoId: string, pedido: Pedido): Promise<Pagamento>;
}
