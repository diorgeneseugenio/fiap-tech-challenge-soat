import { CheckoutGateway } from "interfaces/gateways/checkoutGateway";
import { PedidoGateway } from "interfaces/gateways/pedidoGateway";
import { ProdutoGateway } from "interfaces/gateways/produtoGateway";

import ItemPedido from "~domain/entities/itemPedido";
import Pedido from "~domain/entities/pedido";
import Produto from "~domain/entities/produto";
import { ItemDoPedidoInput } from "~domain/entities/types/itensPedidoType";
import { PedidoDTO, PedidoInput } from "~domain/entities/types/pedidoType";

import {
  RealizaPedidoInput,
  RemoveItemInput,
} from "../entities/types/pedidoService.type";

export default class PedidoUseCase {

  static async buscaPedido(pedidoGateway: PedidoGateway, produtoGateway: ProdutoGateway, pedidoId: string) {
    const itensAtuais = await PedidoUseCase.retornaItensPedido(pedidoGateway, produtoGateway, pedidoId)
    const pedido = await pedidoGateway.retornaPedido(pedidoId);

    if (pedido) {
      return new Pedido(pedido, itensAtuais);
    }

    return null;
  }

  static async iniciaPedido(pedidoGateway: PedidoGateway, pedidoInput: PedidoInput): Promise<PedidoDTO> {
    const pedido = new Pedido(pedidoInput);
    return pedidoGateway.criaPedido(pedido);
  }

  static async realizaPedido(
    checkoutGateway: CheckoutGateway,
    pedidoGateway: PedidoGateway,
    produtoGateway: ProdutoGateway,
    realizaPedidoInput: RealizaPedidoInput): Promise<PedidoDTO | null> {
    const pedido = await PedidoUseCase.buscaPedido(pedidoGateway, produtoGateway, realizaPedidoInput.pedidoId);

    if (!pedido) {
      throw new Error('Pedido nao encontrado');
    }

    pedido.entregaRascunho();

    const fatura = await checkoutGateway.geraPagamento({ metodoDePagamentoId: realizaPedidoInput.metodoDePagamentoId, pedido });

    // if (fatura.statusDePagamento === statusDePagamento.AGUARDANDO_PAGAMENTO) { //  Adicionar quando nao tiver o fake checkout
    //   pedido.registrarFatura(fatura.id)
    // }

    pedido.atualizaPagamento(fatura.statusDePagamento);

    return pedidoGateway.atualizaPedido(pedido);


  }

  static async retornaProximoPedidoFila(pedidoGateway: PedidoGateway, produtoGateway: ProdutoGateway) {
    const proximoPedido = await pedidoGateway.retornaProximoPedidoFila();
    if (proximoPedido) {
      const itensAtuais = await PedidoUseCase.retornaItensPedido(pedidoGateway, produtoGateway, proximoPedido.id)
      return new Pedido(proximoPedido, itensAtuais);
    }

    return null;
  }

  static async iniciaPreparo(pedidoGateway: PedidoGateway, produtoGateway: ProdutoGateway, pedidoId?: string): Promise<PedidoDTO | null> {
    const pedido = pedidoId
      ? await PedidoUseCase.buscaPedido(pedidoGateway, produtoGateway, pedidoId)
      : await PedidoUseCase.retornaProximoPedidoFila(pedidoGateway, produtoGateway);


    if (pedido) {
      pedido.emPreparo();
      return pedidoGateway.atualizaPedido(pedido);
    }

    return null;
  }

  static async finalizaPreparo(pedidoGateway: PedidoGateway, produtoGateway: ProdutoGateway, pedidoId: string): Promise<PedidoDTO> {
    const pedido = await PedidoUseCase.buscaPedido(pedidoGateway, produtoGateway, pedidoId);

    if (!pedido) {
      throw new Error('Pedido nao encontrado');
    }

    pedido.pronto();

    return pedidoGateway.atualizaPedido(pedido);
  }

  static async entregaPedido(pedidoGateway: PedidoGateway, produtoGateway: ProdutoGateway, pedidoId: string): Promise<PedidoDTO> {
    const pedido = await PedidoUseCase.buscaPedido(pedidoGateway, produtoGateway, pedidoId);

    if (!pedido) {
      throw new Error('Pedido nao encontrado');
    }

    pedido.entregue();

    return pedidoGateway.atualizaPedido(pedido);
  }

  static async adicionaItem(
    pedidoGateway: PedidoGateway,
    produtoGateway: ProdutoGateway,
    itemDoPedidoInput: ItemDoPedidoInput
  ): Promise<PedidoDTO | null> {
    const pedido = await PedidoUseCase.buscaPedido(pedidoGateway, produtoGateway, itemDoPedidoInput.pedidoId as string);

    if (!pedido) {
      throw new Error('Pedido nao encontrado');
    }

    const produtoEncontrado = await produtoGateway.retornaProduto(
      itemDoPedidoInput.produtoId as string
    );

    if (!produtoEncontrado) {
      throw new Error('Produto nao encontrado');
    }
    
    const produto = new Produto(produtoEncontrado);
    itemDoPedidoInput.valorUnitario = produto.retornaPreco();
    itemDoPedidoInput.produtoId = produto.id;

    const novoItem = new ItemPedido(itemDoPedidoInput)

    pedido.adicionarItem(novoItem);

    return pedidoGateway.atualizaPedido(pedido);
  }

  static async retornaItensPedido(pedidoGateway: PedidoGateway, produtoGateway: ProdutoGateway, pedidoId: string): Promise<ItemPedido[] | null> {
    const itensPedido = await pedidoGateway.retornaItensPedido(pedidoId);

    if (itensPedido) {
      const items = itensPedido?.map(async item => {
        const produtoEncontrado = await produtoGateway.retornaProduto(item.produtoId);
        
        if (!produtoEncontrado) {
          throw new Error('Produto nao encontrado');
        }
      
        const produto = new Produto(produtoEncontrado);
        item.valorUnitario = produto.retornaPreco();
        item.produtoId = produto.id
        return new ItemPedido(item);
      })
  
  
      return await Promise.all(items);
    }

    return null
  }

  static async removeItem(pedidoGateway: PedidoGateway, produtoGateway: ProdutoGateway, removeItemInput: RemoveItemInput): Promise<PedidoDTO | null> {
    const pedido = await PedidoUseCase.buscaPedido(pedidoGateway, produtoGateway, removeItemInput.pedidoId as string);

    if (!pedido) {
      throw new Error('Pedido nao encontrado');
    }

    pedido.removeItem(removeItemInput.itemId)

    return pedidoGateway.atualizaPedido(pedido);
  }

  static async listaPedidos(pedidoGateway: PedidoGateway, status?: Array<string>, clienteId?: string): Promise<Array<PedidoDTO> | null> {
    return pedidoGateway.listaPedidos(status, clienteId);
  }
}
