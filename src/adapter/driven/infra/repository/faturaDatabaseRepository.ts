import { v4 as uuidv4 } from "uuid";

import FaturaRepository, {
  CriaFaturaInput,
} from "~core/applications/repositories/faturaRepository";
import { statusDePagamento } from "~core/domain/fatura";
import { Fatura } from "~core/domain/fatura";

import FaturaModel from "../models/faturaModel";

class FaturaDataBaseRepository implements FaturaRepository {
  async criaFatura({
    metodoDePagamentoId,
    pedidoId,
  }: CriaFaturaInput): Promise<Fatura> {
    try {
      const fatura = await FaturaModel.create({
        id: uuidv4(),
        pedidoId,
        statusDePagamento: statusDePagamento.AGUARDANDO_PAGAMENTO,
        metodoDePagamentoId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return fatura.dataValues as Fatura;
    } catch (err: any) {
      console.error("Erro ao criar Fatura: ", err);
      throw new Error(err);
    }
  }
}

export default FaturaDataBaseRepository;
