import { Produto } from "./produto";

export interface ItemDoPedido {
  id: string;
  idProduto: string;
  produto?: Produto;
  idPedido: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  observacao: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type ItensDoPedido = Array<ItemDoPedido>;
