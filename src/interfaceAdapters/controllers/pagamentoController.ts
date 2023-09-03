import { PagamentoDTO, PagamentoInput } from "~domain/entities/types/PagamentoType";
import PagamentoRepository from "~domain/repositories/pagamentoRepository";
import PagamentoUseCase from "~domain/useCases/pagamentoUseCase";

export class PagamentoController {
  static async recebePagamento(
    dbPagamentoRepository: PagamentoRepository,
    pagamento: PagamentoInput
  ): Promise<PagamentoDTO> {
    const pagamentoCriado = await PagamentoUseCase.recebePagamento(
      dbPagamentoRepository, pagamento
    );
    return pagamentoCriado;
    }
  }
