import { statusDePagamento } from "~core/domain/fatura";
import { Pedido, statusDoPedido } from "~core/domain/pedido";

import CheckoutRepository from "../repositories/checkoutRepository";
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
    private readonly checkoutRepository: CheckoutRepository,
  ) { }

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
        `Não é possível realizar um pedido que não está em rascunho. Status atual do pedido é ${pedido?.status}`
      );
    }
    if (pedido.valor <= 0) {
      throw new Error(
        `Não é possível realizar um pedido sem nenhum valor`
      );
    }

    const fatura = await this.checkoutRepository.geraPagamento({ metodoDePagamentoId, pedido });

    return this.pedidoRepository.atualizaPedido({
      id: pedidoId,
      status: fatura.statusDePagamento === statusDePagamento.PAGAMENTO_APROVADO
        ? statusDoPedido.AGUARDANDO_PREPARO
        : statusDoPedido.FALHA,
      faturaId: fatura.id,
    });
  }

  async iniciaPreparo(pedidoId?: string): Promise<Pedido | null> {
    const pedido = pedidoId
      ? await this.pedidoRepository.retornaPedido(pedidoId)
      : await this.pedidoRepository.retornaProximoPedidoFila();

    if (pedido && pedido?.status !== statusDoPedido.AGUARDANDO_PREPARO) {
      throw new Error(
        `Não é possível iniciar preparo de um pedido que não está aguardando preparo. Status atual do pedido é ${pedido?.status}`
      );
    }

    if (pedido) {
      return this.pedidoRepository.atualizaPedido({
        id: pedido.id,
        status: statusDoPedido.EM_PREPARO,
      });
    }

    return null;
  }

  async finalizaPreparo(pedidoId: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.retornaPedido(pedidoId);

    if (pedido?.status !== statusDoPedido.EM_PREPARO) {
      throw new Error(
        `Não é possível finalizar preparo de um pedido que não está em prepar. Status atual do pedido é ${pedido?.status}`
      );
    }

    return this.pedidoRepository.atualizaPedido({
      id: pedidoId,
      status: statusDoPedido.PRONTO,
    });
  }

  async entregaPedido(pedidoId: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.retornaPedido(pedidoId);

    if (pedido?.status !== statusDoPedido.PRONTO) {
      throw new Error(
        `Não é possível entregar um pedido que não está pronto. Status atual do pedido é ${pedido?.status}`
      );
    }

    return this.pedidoRepository.atualizaPedido({
      id: pedidoId,
      status: statusDoPedido.ENTREGUE,
      retiradoEm: new Date(),
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
        `Não é possível adicionar itens a um pedido que não está em rascunho`
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
        `Não é possível adicionar itens a um pedido que não está em rascunho`
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

  async listaPedidos(status?: Array<string>, clienteId?: string): Promise<Array<Pedido> | null> {
    return this.pedidoRepository.listaPedidos(status, clienteId);
  }
}
