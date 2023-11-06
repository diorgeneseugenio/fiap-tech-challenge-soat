export type IniciaPedidoInput = {
  clienteId?: string | null;
};

export type RealizaPedidoInput = {
  pedidoId: string;
  clienteId: string;
  metodoDePagamentoId: string;
};

// export type AdicionaItemInput = {
//   pedidoId: string;
//   produtoId: string;
//   quantidade: number;
//   observacao?: string | null;
// };

export type AdicionaItemInput = {
  pedidoId: string;
  produtoId: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  observacao?: string | null;
};

export type RemoveItemInput = {
  pedidoId: string;
  itemId: string;
  clienteId: string;
};
