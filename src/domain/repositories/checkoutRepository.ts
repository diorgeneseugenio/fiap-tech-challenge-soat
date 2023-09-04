import { Fatura, StatusDePagamento } from "~domain/entities/fatura";
import Pedido  from "~domain/entities/pedido";

import FaturaRepository from "./faturaRepository";

export interface Pagamento {
  qrCode?: string;
  statusDePagamento: StatusDePagamento;
}

export type GeraFaturaInput = {
  metodoDePagamentoId: string; 
  pedido: Pedido;
}

export default interface CheckoutRepository {
  geraCobranca(fatura: Fatura, faturaRepository: FaturaRepository): Promise<Fatura>;
}
