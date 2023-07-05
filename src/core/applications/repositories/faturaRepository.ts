import { Fatura, StatusDePagamento } from "~core/domain/fatura";

export type CriaFaturaInput = {
  pedidoId: string;
  metodoDePagamentoId: string;
  qrCode: string | null
  statusDePagamento: StatusDePagamento;
};

export type AtualizaFaturaInput = {
  id: string;
  pagoEm: Date;
  qrCode?: string
};

export default interface FaturaRepository {
  atualizaFatura(atualizaFatura: AtualizaFaturaInput): Promise<Fatura>;
  criaFatura(criarFaturaInput: CriaFaturaInput): Promise<Fatura>;
}
