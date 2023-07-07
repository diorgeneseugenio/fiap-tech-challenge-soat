import { MetodoDePagamento } from "~core/domain/metodoDePagamento";

import MetodoPagamentoRepository from "../repositories/metodoPagamentoRepository";

export default class MetodoPagamentoService {
    constructor(
      private readonly checkoutRepository: MetodoPagamentoRepository,
    ) {}

    async listaPagamentos(): Promise<MetodoDePagamento[]> {
        return this.checkoutRepository.listaPagamentos();
    }
}