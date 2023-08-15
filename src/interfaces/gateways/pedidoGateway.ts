import Pedido from "~domain/entities/pedido";
import { ItemDoPedidoDTO } from "~domain/entities/types/itensPedidoType";
import { PedidoDTO } from "~domain/entities/types/pedidoType";
import PedidoRepository, { AdicionaItemInput, RemoveItemInput } from "~domain/repositories/pedidoRepository";

export class PedidoGateway implements PedidoRepository {
  private pedidoRepository: PedidoRepository;

  constructor(pedidoRepository: PedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }
  criaPedido(pedido: PedidoDTO): Promise<PedidoDTO> {
    return this.pedidoRepository.criaPedido(pedido);
  }
  atualizaPedido(pedido: Pedido): Promise<PedidoDTO> {
    return this.pedidoRepository.atualizaPedido(pedido);
  }
  adicionaItem(adicionarItemInput: AdicionaItemInput): Promise<any> {
    return this.pedidoRepository.adicionaItem(adicionarItemInput);
  }
  retornaPedido(id: string): Promise<PedidoDTO | null> {
    return this.pedidoRepository.retornaPedido(id);
  }
  listaPedidos(status?: string[] | undefined, clienteId?: string | undefined): Promise<PedidoDTO[] | null> {
    return this.pedidoRepository.listaPedidos(status, clienteId);
  }
  retornaProximoPedidoFila(): Promise<any> {
    return this.pedidoRepository.retornaProximoPedidoFila();
  }
  removeItem(removeItemInput: RemoveItemInput): Promise<any> {
    return this.pedidoRepository.removeItem(removeItemInput);
  }
  retornaItem(id: string): Promise<ItemDoPedidoDTO | null> {
    return this.pedidoRepository.retornaItem(id);
  }
  retornaItensPedido(idPedido: string): Promise<ItemDoPedidoDTO[] | null> {
    return this.pedidoRepository.retornaItensPedido(idPedido);
  }

}
