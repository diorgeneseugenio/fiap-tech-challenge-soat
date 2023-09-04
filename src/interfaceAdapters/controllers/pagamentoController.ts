import { PagamentoDTO, PagamentoInput } from "~domain/entities/types/PagamentoType";
import FaturaRepository from "~domain/repositories/faturaRepository";
import PagamentoRepository from "~domain/repositories/pagamentoRepository";
import PedidoRepository from "~domain/repositories/pedidoRepository";
import PagamentoUseCase from "~domain/useCases/pagamentoUseCase";

export class PagamentoController {
  static async recebePagamento(
    faturaRepository: FaturaRepository, 
    pedidoRepository: PedidoRepository,
    dbPagamentoRepository: PagamentoRepository,
    pagamento: PagamentoInput
  ): Promise<PagamentoDTO> {
    const pagamentoCriado = await PagamentoUseCase.recebePagamento(
      faturaRepository,
      pedidoRepository,
      dbPagamentoRepository, pagamento
    );
    return pagamentoCriado;
  }
}
