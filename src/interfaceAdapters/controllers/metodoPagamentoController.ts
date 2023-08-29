import { MetodoPagamentoDTO } from "~domain/entities/types/metodoPagamentoType";
import MetodoPagamentoRepository from "~domain/repositories/metodoPagamentoRepository";
import MetodoPagamentoUseCase from "~domain/useCases/metodoPagamentoUseCase";

export class MetodoPagamentoController {
  static async listaPagamentos(
    metodoPagamentoRepository: MetodoPagamentoRepository
  ): Promise<MetodoPagamentoDTO[] | null> {
    return MetodoPagamentoUseCase.listaPagamentos(
      metodoPagamentoRepository
    );
  }
}