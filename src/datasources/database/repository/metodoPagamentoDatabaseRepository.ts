import { MetodoPagamentoDTO } from "~domain/entities/types/metodoPagamentoType";
import MetodoPagamentoRepository from "~domain/repositories/metodoPagamentoRepository";

import MetodoDePagamentoModel from "../models/metodoDePagamentoModel";

export default class MetodoPagamentoDatabaseRepository implements MetodoPagamentoRepository {
    listaPagamentos(): Promise<MetodoPagamentoDTO[]> {
        return MetodoDePagamentoModel.findAll({ where: { ativo: 1 } });
    }
}