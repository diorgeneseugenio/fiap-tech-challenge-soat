import { v4 as uuidv4 } from "uuid";

import { ItemDoPedidoInput } from "./types/itensPedidoType";

export default class ItemPedido {
  public id: string;
  public produtoId: string;
  public pedidoId: string;
  public quantidade: number;
  public valorUnitario: number;
  public valorTotal: number;
  public observacao: string | null;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;
  
  
  constructor(itemPedido: ItemDoPedidoInput) {
    this.id = itemPedido.id ?? uuidv4();
    this.produtoId = itemPedido.produtoId;
    this.pedidoId = itemPedido.pedidoId;
    this.quantidade = itemPedido.quantidade;
    this.valorUnitario = itemPedido.valorUnitario ?? 0; // TODO validar 
    this.valorTotal = this.calculaTotal();
    this.observacao = itemPedido.observacao ?? null;
    this.createdAt = new Date();
    this.deletedAt = itemPedido.deletedAt ?? null;
    this.updatedAt = itemPedido.updatedAt ?? null;

    if (this.quantidade <= 0){
      throw new Error('Quantidade do item selecionado nao pode ser menor que 0')
    }
  }

  calculaTotal(){
    this.valorTotal = this.valorUnitario * this.quantidade;
    return this.valorTotal;
  }

  mudaQuantidade(quantidade: number) {
    this.quantidade = quantidade;
    this.calculaTotal();
  }

  mudaObservacao(observacao: string) {
    this.observacao = observacao;
  }
}