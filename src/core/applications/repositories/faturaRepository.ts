import { Fatura } from "~core/domain/fatura";

export type CriaFaturaInput = {
  pedidoId: string;
  metodoDePagamentoId: string;
};

export default interface FaturaRepository {
  criaFatura(criarFaturaInput: CriaFaturaInput): Promise<Fatura>;
}
