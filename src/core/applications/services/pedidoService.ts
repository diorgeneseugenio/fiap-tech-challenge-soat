import { Pedido, statusDoPedido } from "~core/domain/pedido";

import PedidoRepository from "../repositories/pedidoRepository";
import ProdutoRepository from "../repositories/produtoRepository";

import {
  AdicionaItemInput,
  IniciaPedidoInput,
  RemoveItemInput,
} from "./pedidoService.type";

export default class PedidoService {
  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly produtoRepository: ProdutoRepository
  ) {}

  async iniciaPedido({ clienteId = null }: IniciaPedidoInput): Promise<Pedido> {
    return this.pedidoRepository.criaPedido({
      clienteId,
      valor: 0,
      status: statusDoPedido.RASCUNHO,
    });
  }

  async adicionaItem(
    adicionaItemInput: AdicionaItemInput
  ): Promise<Pedido | null> {
    const pedido = await this.pedidoRepository.retornaPedido(
      adicionaItemInput.pedidoId
    );

    if (pedido?.status !== statusDoPedido.RASCUNHO) {
      throw new Error(
        "Não é possível adicionar itens a um pedido que não está em rascunho"
      );
    }

    const produto = await this.produtoRepository.retornaProduto(
      adicionaItemInput.produtoId
    );

    const valorUnitario = produto?.preco || 0;
    const valorTotal = valorUnitario * adicionaItemInput.quantidade;

    return this.pedidoRepository.adicionaItem({
      ...adicionaItemInput,
      valorTotal,
      valorUnitario,
    });
  }

  async removeItem(removeItemInput: RemoveItemInput): Promise<Pedido | null> {
    const pedido = await this.pedidoRepository.retornaPedido(
      removeItemInput.pedidoId
    );

    if (pedido?.status !== statusDoPedido.RASCUNHO) {
      throw new Error(
        "Não é possível adicionar itens a um pedido que não está em rascunho"
      );
    }

    const itemDoPedido = await this.pedidoRepository.retornaItem(
      removeItemInput.itemId
    );

    const valorPedido = pedido?.valor ?? 0;
    const valorParaReduzir = itemDoPedido?.valorTotal ?? 0;

    const novoValorPedido = valorPedido - valorParaReduzir;

    return this.pedidoRepository.removeItem({
      ...removeItemInput,
      valorPedido: novoValorPedido,
    });
  }
}
