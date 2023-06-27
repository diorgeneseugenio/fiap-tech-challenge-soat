import { Produto } from "./produto";

export interface ItemDoPedido {
  id: string;
  produtoId: string;
  produto?: Produto;
  pedidoId: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  observacao: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type ItensDoPedido = Array<ItemDoPedido>;
