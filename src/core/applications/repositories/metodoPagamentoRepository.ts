import { MetodoDePagamento } from "~core/domain/metodoDePagamento";

export default interface MetodoPagamentoRepository {
    listaPagamentos(): Promise<MetodoDePagamento[]>;
  }
  