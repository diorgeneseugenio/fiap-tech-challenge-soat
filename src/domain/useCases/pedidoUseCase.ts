/* eslint-disable @typescript-eslint/no-non-null-assertion */
import FaturaDataBaseRepository from "~datasources/database/repository/faturaDatabaseRepository";
import { statusDePagamento } from "~domain/entities/fatura";
import ItemPedido from "~domain/entities/itemPedido";
import Pedido from "~domain/entities/pedido";
import Produto from "~domain/entities/produto";
import { ItemDoPedidoInput } from "~domain/entities/types/itensPedidoType";
import { PagamentoDTO } from "~domain/entities/types/PagamentoType";
import { PedidoDTO, PedidoInput, statusDoPedido } from "~domain/entities/types/pedidoType";
import FaturaRepository from "~domain/repositories/faturaRepository";
import PedidoRepository from "~domain/repositories/pedidoRepository";
import ProdutoRepository from "~domain/repositories/produtoRepository";
import PagamentoGateway from "~interfaceAdapters/gateways/pagamentoGateway";

import {
  RealizaPedidoInput,
  RemoveItemInput,
} from "../entities/types/pedidoService.type";

import FaturaUseCase from "./faturaUseCase";

export default class PedidoUseCase {

  static async buscaPedido(pedidoRepository: PedidoRepository, produtoRepository: ProdutoRepository, pedidoId: string) {
    const itensAtuais = await PedidoUseCase.retornaItensPedido(pedidoRepository, produtoRepository, pedidoId)
    const pedido = await pedidoRepository.retornaPedido(pedidoId);

    if (pedido) {
      return new Pedido(pedido, itensAtuais);
    }

    return null;
  }

  static async iniciaPedido(pedidoRepository: PedidoRepository, pedidoInput: PedidoInput): Promise<PedidoDTO> {
    const pedido = new Pedido(pedidoInput);
    return pedidoRepository.criaPedido(pedido);
  }

  static async realizaPedido(
    pedidoRepository: PedidoRepository,
    produtoRepository: ProdutoRepository,
    realizaPedidoInput: RealizaPedidoInput): Promise<PedidoDTO | null> {
    const pedido = await PedidoUseCase.buscaPedido(pedidoRepository, produtoRepository, realizaPedidoInput.pedidoId);

    if (!pedido) {
      throw new Error('Pedido nao encontrado');
    }

    pedido.entregaRascunho();

    const fatura = await FaturaUseCase.geraFatura(realizaPedidoInput.metodoDePagamentoId, pedido);
    const faturaRepository = new FaturaDataBaseRepository();
    const faturaAtualizada = await PagamentoGateway.geraCobranca(fatura, faturaRepository);
    pedido.faturaId = faturaAtualizada.id;

    return pedidoRepository.atualizaPedido(pedido);
  }

  static async retornaProximoPedidoFila(pedidoRepository: PedidoRepository, produtoRepository: ProdutoRepository) {
    const proximoPedido = await pedidoRepository.retornaProximoPedidoFila();
    if (proximoPedido) {
      const itensAtuais = await PedidoUseCase.retornaItensPedido(pedidoRepository, produtoRepository, proximoPedido.id)
      return new Pedido(proximoPedido, itensAtuais);
    }

    return null;
  }

  static async iniciaPreparo(pedidoRepository: PedidoRepository, produtoRepository: ProdutoRepository, pedidoId?: string): Promise<PedidoDTO | null> {
    const pedido = pedidoId
      ? await PedidoUseCase.buscaPedido(pedidoRepository, produtoRepository, pedidoId)
      : await PedidoUseCase.retornaProximoPedidoFila(pedidoRepository, produtoRepository);


    if (pedido) {
      pedido.emPreparo();
      return pedidoRepository.atualizaPedido(pedido);
    }

    return null;
  }

  static async finalizaPreparo(pedidoRepository: PedidoRepository, produtoRepository: ProdutoRepository, pedidoId: string): Promise<PedidoDTO> {
    const pedido = await PedidoUseCase.buscaPedido(pedidoRepository, produtoRepository, pedidoId);

    if (!pedido) {
      throw new Error('Pedido nao encontrado');
    }

    pedido.pronto();

    return pedidoRepository.atualizaPedido(pedido);
  }

  static async entregaPedido(pedidoRepository: PedidoRepository, produtoRepository: ProdutoRepository, pedidoId: string): Promise<PedidoDTO> {
    const pedido = await PedidoUseCase.buscaPedido(pedidoRepository, produtoRepository, pedidoId);

    if (!pedido) {
      throw new Error('Pedido nao encontrado');
    }

    pedido.entregue();

    return pedidoRepository.atualizaPedido(pedido);
  }

  static async adicionaItem(
    pedidoRepository: PedidoRepository,
    produtoRepository: ProdutoRepository,
    itemDoPedidoInput: ItemDoPedidoInput
  ): Promise<PedidoDTO | null> {
    const pedido = await PedidoUseCase.buscaPedido(pedidoRepository, produtoRepository, itemDoPedidoInput.pedidoId as string);

    if (!pedido) {
      throw new Error('Pedido nao encontrado');
    }

    const produtoEncontrado = await produtoRepository.retornaProduto(
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

    return pedidoRepository.atualizaPedido(pedido);
  }

  static async retornaItensPedido(pedidoRepository: PedidoRepository, produtoRepository: ProdutoRepository, pedidoId: string): Promise<ItemPedido[] | null> {
    const itensPedido = await pedidoRepository.retornaItensPedido(pedidoId);

    if (itensPedido) {
      const items = itensPedido?.map(async item => {
        const produtoEncontrado = await produtoRepository.retornaProduto(item.produtoId);
        
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

  static async removeItem(pedidoRepository: PedidoRepository, produtoRepository: ProdutoRepository, removeItemInput: RemoveItemInput): Promise<PedidoDTO | null> {
    const pedido = await PedidoUseCase.buscaPedido(pedidoRepository, produtoRepository, removeItemInput.pedidoId as string);

    if (!pedido) {
      throw new Error('Pedido nao encontrado');
    }

    pedido.removeItem(removeItemInput.itemId)

    return pedidoRepository.atualizaPedido(pedido);
  }

  static async listaPedidos(pedidoRepository: PedidoRepository, status?: Array<string>, clienteId?: string): Promise<Array<PedidoDTO> | null> {
    return pedidoRepository.listaPedidos(status, clienteId);
  }

  static async pagamentoReprovado(pedidoRepository: PedidoRepository, faturaRepository: FaturaRepository, pagamento: PagamentoDTO) {
    const fatura = await faturaRepository.pegaFatura(pagamento.faturaId);
    const pedido = await pedidoRepository.retornaPedido(fatura.pedidoId);
    faturaRepository.atualizaStatusPagamentoFatura(fatura.id, statusDePagamento.ERRO_AO_PROCESSAR_PAGAMENTO);
    pedidoRepository.atualizaStatusDoPedido(pedido!.id, statusDoPedido.FALHA);
  }
  
  static async pagamentoAprovado(pedidoRepository: PedidoRepository, faturaRepository: FaturaRepository, pagamento: PagamentoDTO) {
    const fatura = await faturaRepository.pegaFatura(pagamento.faturaId);
    const pedido = await pedidoRepository.retornaPedido(fatura.pedidoId);
    if(pedido!.valor <= pagamento.valorPagamento) {
      faturaRepository.atualizaStatusPagamentoFatura(fatura.id, statusDePagamento.PAGAMENTO_APROVADO);
      pedidoRepository.atualizaStatusDoPedido(pedido!.id, statusDoPedido.EM_PREPARO);
    } else {
      faturaRepository.atualizaStatusPagamentoFatura(fatura.id, statusDePagamento.ERRO_AO_PROCESSAR_PAGAMENTO);
      pedidoRepository.atualizaStatusDoPedido(pedido!.id, statusDoPedido.FALHA);
    }
  }
}
