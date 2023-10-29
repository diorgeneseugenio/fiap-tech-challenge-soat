import { StatusDePagamento } from "~domain/entities/fatura";
import { AdicionaItemInput, RealizaPedidoInput, RemoveItemInput } from "~domain/entities/types/pedidoService.type";
import { PedidoDTO, PedidoInput } from "~domain/entities/types/pedidoType";
import CheckoutRepository from "~domain/repositories/checkoutRepository";
import FaturaRepository from "~domain/repositories/faturaRepository";
import PedidoRepository, {
  queryStatusPagamentoInput,
} from "~domain/repositories/pedidoRepository";
import ProdutoRepository from "~domain/repositories/produtoRepository";
import PedidoUseCase from "~domain/useCases/pedidoUseCase";

export class PedidoController {
  static async iniciaPedido(
    pedidoRepository: PedidoRepository,
    clienteId: string
  ): Promise<PedidoDTO | null> {
    const pedidoInput: PedidoInput = {
      clienteId,
      faturaId: null,
      status: "Rascunho",
      valor: 0,
      retiradoEm: null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }

    const pedidoCriada = await PedidoUseCase.iniciaPedido(
      pedidoRepository,
      pedidoInput
    );
    return pedidoCriada;
  }

  static async realizaPedido(
    checkoutRepository: CheckoutRepository,
    faturaRepository: FaturaRepository,
    pedidoRepository: PedidoRepository,
    produtoRepository: ProdutoRepository,
    realizaPedidoInput: RealizaPedidoInput
  ): Promise<PedidoDTO | null> {
    return await PedidoUseCase.realizaPedido(
      checkoutRepository,
      faturaRepository,
      pedidoRepository,
      produtoRepository,
      realizaPedidoInput
    );
  }

  static async iniciaPreparo(
    pedidoRepository: PedidoRepository,
    produtoRepository: ProdutoRepository,
    id: string
  ): Promise<PedidoDTO | null> {
    return await PedidoUseCase.iniciaPreparo(
      pedidoRepository,
      produtoRepository,
      id
    );
  }

  static async finalizaPreparo(
    pedidoRepository: PedidoRepository,
    produtoRepository: ProdutoRepository,
    id: string
  ): Promise<PedidoDTO> {
    return await PedidoUseCase.finalizaPreparo(
      pedidoRepository,
      produtoRepository,
      id
    );
  }

  static async adicionaItem(
    pedidoRepository: PedidoRepository,
    produtoRepository: ProdutoRepository,
    adicionaItemInput: AdicionaItemInput
  ): Promise<PedidoDTO | null> {
    return await PedidoUseCase.adicionaItem(
      pedidoRepository,
      produtoRepository,
      adicionaItemInput
    );
  }

  static async removeItem(
    pedidoRepository: PedidoRepository,
    produtoRepository: ProdutoRepository,
    removeItemInput: RemoveItemInput
  ): Promise<PedidoDTO | null> {
    return await PedidoUseCase.removeItem(
      pedidoRepository,
      produtoRepository,
      removeItemInput
    );
  }

  static async entregaPedido(
    pedidoRepository: PedidoRepository,
    produtoRepository: ProdutoRepository,
    id: string
  ): Promise<PedidoDTO | null> {
    return await PedidoUseCase.entregaPedido(
      pedidoRepository,
      produtoRepository,
      id
    );
  }

  static async listaPedidos(
    pedidoRepository: PedidoRepository,
    status: Array<string>,
    clienteId: string
  ): Promise<PedidoDTO[] | null> {
    return await PedidoUseCase.listaPedidos(
      pedidoRepository,
      status,
      clienteId
    );
  }

  static async statusDePagamento(
    pedidoRepository: PedidoRepository,
    faturaRepository: FaturaRepository,
    queryStatusPagamento: queryStatusPagamentoInput
  ): Promise<StatusDePagamento | null | undefined> {
    return await PedidoUseCase.statusDePagamento(
      pedidoRepository,
      faturaRepository,
      queryStatusPagamento
    );
  }
}
