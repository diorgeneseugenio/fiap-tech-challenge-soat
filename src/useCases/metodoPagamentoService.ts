import { MetodoDePagamento } from "entities/metodoDePagamento";
import MetodoPagamentoRepository from "interfaces/repositories/metodoPagamentoRepository";


export default class MetodoPagamentoService {
    constructor(
      private readonly checkoutRepository: MetodoPagamentoRepository,
    ) {}

    async listaPagamentos(): Promise<MetodoDePagamento[]> {
        return this.checkoutRepository.listaPagamentos();
    }
}