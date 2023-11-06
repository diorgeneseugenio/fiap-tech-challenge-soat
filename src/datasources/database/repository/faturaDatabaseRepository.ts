import { v4 as uuidv4 } from "uuid";

import { Fatura, StatusDePagamento } from "~domain/entities/fatura";
import FaturaRepository, {
  AtualizaFaturaInput,
  CriaFaturaInput,
} from "~domain/repositories/faturaRepository";

import FaturaModel from "../models/faturaModel";

class FaturaDataBaseRepository implements FaturaRepository {
  async atualizaFatura({
    id,
    pagoEm,
    qrCode,
  }: AtualizaFaturaInput): Promise<Fatura> {
      return (await FaturaModel.update(
        {
          pagoEm,
          qrCode,
        },
        { where: { id: id } }
      ).then(() =>
        FaturaModel.findOne({
          where: { id: id },
        })
      )) as Fatura;
  }

  async criaFatura({
    metodoDePagamentoId,
    pedidoId,
    qrCode,
    statusDePagamento,
  }: CriaFaturaInput): Promise<Fatura> {
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

  }

  async retornaFatura(faturaId: string): Promise<Fatura | null> {
      return await FaturaModel.findOne({
        where: {
          id: faturaId,
        },
      });
  }

  async pegaFatura(id: string): Promise<Fatura> {
      const fatura = await FaturaModel.findByPk(id);
      return fatura as Fatura;
  }

  async atualizaStatusPagamentoFatura(
    id: string,
    statusDePagamento: StatusDePagamento
  ): Promise<Fatura> {
    const fatura = await FaturaModel.findByPk(id);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fatura!.statusDePagamento = statusDePagamento;
    await fatura?.save();
    return fatura as Fatura;
  }
}

export default FaturaDataBaseRepository;
