import { MetodoPagamentoDTO } from "~domain/entities/types/metodoPagamentoType";
import MetodoPagamentoRepository from "~domain/repositories/metodoPagamentoRepository";

export default class MetodoPagamentoUseCase {
    static async listaPagamentos(metodoPagamentoRepository: MetodoPagamentoRepository): Promise<MetodoPagamentoDTO[] | null> {
        return metodoPagamentoRepository.listaPagamentos();
    }
}