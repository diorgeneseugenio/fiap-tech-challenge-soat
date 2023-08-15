import { CheckoutGateway } from "interfaces/gateways/checkoutGateway";
import { PedidoGateway } from "interfaces/gateways/pedidoGateway";
import { ProdutoGateway } from "interfaces/gateways/produtoGateway";

import { RealizaPedidoInput } from "~domain/entities/types/pedidoService.type";
import { PedidoDTO, PedidoInput } from "~domain/entities/types/pedidoType";
import CheckoutRepository from "~domain/repositories/checkoutRepository";
import PedidoRepository, { AdicionaItemInput, RemoveItemInput } from "~domain/repositories/pedidoRepository";
import ProdutoRepository from "~domain/repositories/produtoRepository";
import PedidoUseCase from "~domain/useCases/pedidoUseCase";

export class PedidoController {

  static async iniciaPedido(
    dbPedido: PedidoRepository,
    pedido: PedidoInput
  ): Promise<PedidoDTO | null> {
    const pedidoGateway = new PedidoGateway(dbPedido);
    const pedidoCriada = await PedidoUseCase.iniciaPedido(
      pedidoGateway, pedido
    );
    return pedidoCriada;
  }

  static async realizaPedido(
    checkout: CheckoutRepository,
    dbPedido: PedidoRepository,
    dbProduto: ProdutoRepository,
    realizaPedidoInput: RealizaPedidoInput
  ): Promise<PedidoDTO | null> {
    const checkoutGateway = new CheckoutGateway(checkout);
    const pedidoGateway = new PedidoGateway(dbPedido);
    const produtoGateway = new ProdutoGateway(dbProduto);
    return await PedidoUseCase.realizaPedido(
        checkoutGateway, pedidoGateway, produtoGateway, realizaPedidoInput
    );
  }

  static async iniciaPreparo(
    dbPedido: PedidoRepository,
    dbProduto: ProdutoRepository,
    id: string,
  ): Promise<PedidoDTO | null> {
    const pedidoGateway = new PedidoGateway(dbPedido);
    const produtoGateway = new ProdutoGateway(dbProduto);

    return await PedidoUseCase.iniciaPreparo(
      pedidoGateway, produtoGateway, id
    );
  }

  static async finalizaPreparo(
    dbPedido: PedidoRepository,
    dbProduto: ProdutoRepository,
    id: string,
  ): Promise<PedidoDTO> {
    const pedidoGateway = new PedidoGateway(dbPedido);
    const produtoGateway = new ProdutoGateway(dbProduto);

    return await PedidoUseCase.finalizaPreparo(pedidoGateway, produtoGateway, id);
  }

  static async adicionaItem(
    dbPedido: PedidoRepository,
    dbProduto: ProdutoRepository,
    adicionaItemInput: AdicionaItemInput,
  ): Promise<PedidoDTO | null> {
    const pedidoGateway = new PedidoGateway(dbPedido);
    const produtoGateway = new ProdutoGateway(dbProduto);
    return await PedidoUseCase.adicionaItem(pedidoGateway, produtoGateway, adicionaItemInput);
  }

  static async removeItem(
    dbPedido: PedidoRepository,
    dbProduto: ProdutoRepository,
    removeItemInput: RemoveItemInput
  ): Promise<PedidoDTO | null> {
    const pedidoGateway = new PedidoGateway(dbPedido);
    const produtoGateway = new ProdutoGateway(dbProduto);
    return await PedidoUseCase.removeItem(pedidoGateway, produtoGateway, removeItemInput);
  }

  static async entregaPedido(
    dbPedido: PedidoRepository,
    dbProduto: ProdutoRepository,
    id: string
  ): Promise<PedidoDTO | null> {
    const pedidoGateway = new PedidoGateway(dbPedido);
    const produtoGateway = new ProdutoGateway(dbProduto);
    return await PedidoUseCase.entregaPedido(pedidoGateway, produtoGateway, id);
  }

  static async listaPedidos(
    dbPedido: PedidoRepository,
    status: Array<string>,
    clienteId: string
  ): Promise<PedidoDTO[] | null> {
    const pedidoGateway = new PedidoGateway(dbPedido);
    return await PedidoUseCase.listaPedidos(pedidoGateway, status, clienteId);
  }
}