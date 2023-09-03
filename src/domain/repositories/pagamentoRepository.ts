import { PagamentoDTO } from "~domain/entities/types/PagamentoType";

export default interface PagamentoRepository {
  criaPagamento(pagamento: PagamentoDTO): Promise<PagamentoDTO>;
  }
  