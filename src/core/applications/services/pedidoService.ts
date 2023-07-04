import { Pedido, statusDoPedido } from "~core/domain/pedido";

import FaturaRepository from "../repositories/faturaRepository";
import PedidoRepository from "../repositories/pedidoRepository";
import ProdutoRepository from "../repositories/produtoRepository";

import {
  AdicionaItemInput,
  IniciaPedidoInput,
  RealizaPedidoInput,
  RemoveItemInput,
} from "./pedidoService.type";

export default class PedidoService {
  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly produtoRepository: ProdutoRepository,
    private readonly faturaRepository: FaturaRepository
  ) {}

  async iniciaPedido({ clienteId = null }: IniciaPedidoInput): Promise<Pedido> {
    return this.pedidoRepository.criaPedido({
      clienteId,
      valor: 0,
      status: statusDoPedido.RASCUNHO,
    });
  }

  async realizaPedido({
    pedidoId,
    metodoDePagamentoId,
  }: RealizaPedidoInput): Promise<Pedido> {
    const pedido = await this.pedidoRepository.retornaPedido(pedidoId);

    if (pedido?.status !== statusDoPedido.RASCUNHO) {
      throw new Error(
        "Não é possível realizar um pedido que não está em rascunho"
      );
    }

    const fatura = await this.faturaRepository.criaFatura({
      pedidoId,
      metodoDePagamentoId,
    });

    return this.pedidoRepository.atualizaPedido({
      id: pedidoId,
      status: statusDoPedido.AGUARDANDO_PAGAMENTO,
      faturaId: fatura.id,
    });
  }

  async iniciaPreparo(pedidoId: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.retornaPedido(pedidoId);

    if (pedido?.status !== statusDoPedido.AGUARDANDO_PREPARO) {
      throw new Error(
        "Não é possível iniciar preparo de um pedido que não está aguardando preparo"
      );
    }

    return this.pedidoRepository.atualizaPedido({
      id: pedidoId,
      status: statusDoPedido.EM_PREPARO,
    });
  }

  async finalizaPreparo(pedidoId: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.retornaPedido(pedidoId);

    if (pedido?.status !== statusDoPedido.EM_PREPARO) {
      throw new Error(
        "Não é possível finalizar preparo de um pedido que não está em preparo"
      );
    }

    return this.pedidoRepository.atualizaPedido({
      id: pedidoId,
      status: statusDoPedido.PRONTO,
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
