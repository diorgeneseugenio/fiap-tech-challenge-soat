export type IniciaPedidoInput = {
  clienteId?: string | null;
};

export type RealizaPedidoInput = {
  pedidoId: string;
  metodoDePagamentoId: string;
};

export type AdicionaItemInput = {
  pedidoId: string;
  produtoId: string;
  quantidade: number;
  observacao?: string | null;
};

export type RemoveItemInput = {
  pedidoId: string;
  itemId: string;
};
