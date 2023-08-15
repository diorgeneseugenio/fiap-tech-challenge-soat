import { MetodoDePagamento } from "entities/metodoDePagamento";
import MetodoPagamentoRepository from "interfaces/repositories/metodoPagamentoRepository";

import MetodoDePagamentoModel from "../models/metodoDePagamentoModel";

export default class MetodoPagamentoDatabaseRepository implements MetodoPagamentoRepository {
    listaPagamentos(): Promise<MetodoDePagamento[]> {
        try {
            return MetodoDePagamentoModel.findAll({ where: { ativo: 1 } });
        } catch (err: any) {
            console.error("Erro ao retornar lista de pagamento: ", err);
            throw new Error(err);
        }

    }

}