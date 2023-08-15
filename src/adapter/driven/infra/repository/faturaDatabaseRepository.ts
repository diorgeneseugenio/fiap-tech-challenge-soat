import { Fatura } from "entities/fatura";
import FaturaRepository, {
  AtualizaFaturaInput,
  CriaFaturaInput,
} from "interfaces/repositories/faturaRepository";
import { v4 as uuidv4 } from "uuid";

import FaturaModel from "../models/faturaModel";

class FaturaDataBaseRepository implements FaturaRepository {
  async atualizaFatura({
    id,
    pagoEm,
    qrCode, }: AtualizaFaturaInput): Promise<Fatura> {
    try {
      return (await FaturaModel.update(
        {
          pagoEm,
          qrCode,
        }, { where: { id: id } }).then(() =>
          FaturaModel.findOne({
            where: { id: id },
          }))
      ) as Fatura;

    } catch (err: any) {
      console.error("Erro ao criar Fatura: ", err);
      throw new Error(err);
    }
  }

  async criaFatura({
    metodoDePagamentoId,
    pedidoId,
    qrCode,
    statusDePagamento,
  }: CriaFaturaInput): Promise<Fatura> {
    try {
      const fatura = await FaturaModel.create({
        id: uuidv4(),
        pedidoId,
        qrCode,
        statusDePagamento,
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
