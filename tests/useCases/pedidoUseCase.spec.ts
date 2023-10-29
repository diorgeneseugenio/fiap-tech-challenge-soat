import { statusDePagamento } from "../../src/domain/entities/fatura";
import { ItemDoPedidoInput } from "../../src/domain/entities/types/itensPedidoType";
import { RealizaPedidoInput } from "../../src/domain/entities/types/pedidoService.type";
import { PedidoInput } from "../../src/domain/entities/types/pedidoType";
import CheckoutRepository from "../../src/domain/repositories/checkoutRepository";
import FaturaRepository from "../../src/domain/repositories/faturaRepository";
import PedidoRepository from "../../src/domain/repositories/pedidoRepository";
import PedidoUseCase from "../../src/domain/useCases/pedidoUseCase";
import ProdutoRepositoryMock from "../mock/repositories/produtoRepositoryMock";

describe('PedidoUseCase', () => {
  let checkoutRepositoryMock: CheckoutRepository;
  let faturaRepositoryMock: FaturaRepository;
  const createdAt = new Date();
  const produtoRepositoryMock = new ProdutoRepositoryMock(createdAt).repository();

  beforeEach(() => {
    checkoutRepositoryMock = {
      geraCobranca: jest.fn().mockResolvedValue({
        id: "1",
        pedidoId: "1",
        metodoDePagamentoId: "1",
        statusDePagamento: statusDePagamento.AGUARDANDO_PAGAMENTO,
        pagoEm: null,
        qrCode: null,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: null,
      }),
    }
    faturaRepositoryMock = {
      atualizaFatura: jest.fn().mockResolvedValue(null),
      criaFatura: jest.fn().mockResolvedValue(null),
      retornaFatura: jest.fn().mockResolvedValue(null),
      atualizaStatusPagamentoFatura: jest.fn().mockResolvedValue(null),
      pegaFatura: jest.fn().mockResolvedValue({
        id: "1",
        pedidoId: "1",
        metodoDePagamentoId: "1",
        statusDePagamento: statusDePagamento.AGUARDANDO_PAGAMENTO,
        pagoEm: null,
        qrCode: null,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: null,
      }),
    }
  })

  it('Testa iniciar Pedido', async () => {

    const pedidoRepositoryMock: PedidoRepository = {
      criaPedido: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Rascunho",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
      atualizaPedido: jest.fn().mockResolvedValue(null),
      listaPedidos: jest.fn().mockResolvedValue(null),
      retornaProximoPedidoFila: jest.fn().mockResolvedValue(null),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensPedido: jest.fn().mockResolvedValue(null),
      atualizaStatusDoPedido: jest.fn().mockResolvedValue(null),
      adicionaItem: jest.fn().mockResolvedValue(null),
      retornaPedido: jest.fn().mockResolvedValue(null),
    }

    const pedidoInput: PedidoInput = {
      clienteId: "", // OBRIGATORIO, CORRIGIR PROJETO
      faturaId: null,
      status: "Rascunho",
      valor: 0,
      retiradoEm: null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }

    const novoPedido = await PedidoUseCase.iniciaPedido(pedidoRepositoryMock, pedidoInput)
    expect(novoPedido.status).toBe('Rascunho');
    expect(novoPedido.itens).toHaveLength(0)
  });

  it('Testa buscar um Pedido', async () => {

    const pedidoRepositoryMock: PedidoRepository = {
      criaPedido: jest.fn().mockResolvedValue(null),
      atualizaPedido: jest.fn().mockResolvedValue(null),
      listaPedidos: jest.fn().mockResolvedValue(null),
      retornaProximoPedidoFila: jest.fn().mockResolvedValue(null),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensPedido: jest.fn().mockResolvedValue(null),
      atualizaStatusDoPedido: jest.fn().mockResolvedValue(null),
      adicionaItem: jest.fn().mockResolvedValue(null),
      retornaPedido: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Rascunho",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
    }

    const pedido = await PedidoUseCase.buscaPedido(pedidoRepositoryMock, produtoRepositoryMock, "1")
    expect(pedido).toBeTruthy();
  });

  it('Testa retornar itens do Pedido', async () => {

    const pedidoRepositoryMock: PedidoRepository = {
      criaPedido: jest.fn().mockResolvedValue(null),
      atualizaPedido: jest.fn().mockResolvedValue(null),
      listaPedidos: jest.fn().mockResolvedValue(null),
      retornaProximoPedidoFila: jest.fn().mockResolvedValue(null),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensPedido: jest.fn().mockResolvedValue([
        {
          id: "1",
          produtoId: "1",
          pedidoId: "1",
          quantidade: 1,
          valorUnitario: 1.1,
          valorTotal: 10,
          observacao: "test",
          createdAt,
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: "2",
          produtoId: "2",
          pedidoId: "1",
          quantidade: 1,
          valorUnitario: 2.1,
          valorTotal: 10,
          observacao: "test",
          createdAt,
          updatedAt: null,
          deletedAt: null,
        },
      ]),
      atualizaStatusDoPedido: jest.fn().mockResolvedValue(null),
      adicionaItem: jest.fn().mockResolvedValue(null),
      retornaPedido: jest.fn().mockResolvedValue(null),
    }

    const itensPedido = await PedidoUseCase.retornaItensPedido(pedidoRepositoryMock, produtoRepositoryMock, "1")

    expect(itensPedido).toHaveLength(2)
  });

  it('Testa adicionar itens ao Pedido', async () => {
    const pedidoRepositoryMock: PedidoRepository = {
      criaPedido: jest.fn().mockResolvedValue(null),
      atualizaPedido: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Rascunho",
        valor: 3.2,
        itens: [
          {
            id: "1",
            produtoId: "1",
            pedidoId: "1",
            quantidade: 1,
            valorUnitario: 1.1,
            valorTotal: 10,
            observacao: "test",
            createdAt,
            updatedAt: null,
            deletedAt: null,
          },
          {
            id: "2",
            produtoId: "2",
            pedidoId: "1",
            quantidade: 1,
            valorUnitario: 2.1,
            valorTotal: 10,
            observacao: "test",
            createdAt,
            updatedAt: null,
            deletedAt: null,
          },
        ],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
      listaPedidos: jest.fn().mockResolvedValue(null),
      retornaProximoPedidoFila: jest.fn().mockResolvedValue(null),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensPedido: jest.fn().mockResolvedValue([
        {
          id: "1",
          produtoId: "1",
          pedidoId: "1",
          quantidade: 1,
          valorUnitario: 1.1,
          valorTotal: 10,
          observacao: "test",
          createdAt,
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: "2",
          produtoId: "2",
          pedidoId: "1",
          quantidade: 1,
          valorUnitario: 2.1,
          valorTotal: 10,
          observacao: "test",
          createdAt,
          updatedAt: null,
          deletedAt: null,
        },
      ]),
      atualizaStatusDoPedido: jest.fn().mockResolvedValue(null),
      adicionaItem: jest.fn().mockResolvedValue(null),
      retornaPedido: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Rascunho",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
    }

    const itemPedido1: ItemDoPedidoInput = {
      pedidoId: "1",
      produtoId: "3",
      quantidade: 1
    }
    const itemPedido2: ItemDoPedidoInput = {
      pedidoId: "1",
      produtoId: "4",
      quantidade: 1
    }

    await PedidoUseCase.adicionaItem(pedidoRepositoryMock, produtoRepositoryMock, itemPedido1)
    const pedidiComItem = await PedidoUseCase.adicionaItem(pedidoRepositoryMock, produtoRepositoryMock, itemPedido2)
    expect(pedidiComItem?.status).toBe('Rascunho');
    expect(pedidiComItem?.itens).toHaveLength(2)
  });

  it('Testa adicionar item com quantidade zerada ao Pedido', async () => {
    const pedidoRepositoryMock: PedidoRepository = {
      criaPedido: jest.fn().mockResolvedValue(null),
      atualizaPedido: jest.fn().mockResolvedValue(null),
      listaPedidos: jest.fn().mockResolvedValue(null),
      retornaProximoPedidoFila: jest.fn().mockResolvedValue(null),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensPedido: jest.fn().mockResolvedValue([
        {
          id: "1",
          produtoId: "1",
          pedidoId: "1",
          quantidade: 1,
          valorUnitario: 1.1,
          valorTotal: 10,
          observacao: "test",
          createdAt,
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: "2",
          produtoId: "2",
          pedidoId: "1",
          quantidade: 1,
          valorUnitario: 2.1,
          valorTotal: 10,
          observacao: "test",
          createdAt,
          updatedAt: null,
          deletedAt: null,
        },
      ]),
      atualizaStatusDoPedido: jest.fn().mockResolvedValue(null),
      adicionaItem: jest.fn().mockResolvedValue(null),
      retornaPedido: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Rascunho",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
    }

    const itemPedido1: ItemDoPedidoInput = {
      pedidoId: "1",
      produtoId: "2",
      quantidade: 0
    }

    expect(async () => {
      await PedidoUseCase.adicionaItem(pedidoRepositoryMock, produtoRepositoryMock, itemPedido1)
    }).rejects.toThrow()
  });

  it('Testa realizar pedido sem itens', async () => {

    const pedidoRepositoryMock: PedidoRepository = {
      criaPedido: jest.fn().mockResolvedValue(null),
      atualizaPedido: jest.fn().mockResolvedValue(null),
      listaPedidos: jest.fn().mockResolvedValue(null),
      retornaProximoPedidoFila: jest.fn().mockResolvedValue(null),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensPedido: jest.fn().mockResolvedValue(null),
      atualizaStatusDoPedido: jest.fn().mockResolvedValue(null),
      adicionaItem: jest.fn().mockResolvedValue(null),
      retornaPedido: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Rascunho",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
    }

    const prealizaPedidoInput: RealizaPedidoInput = {
      pedidoId: "1",
      clienteId: '1',
      metodoDePagamentoId: ""
    }

    expect(async () => {
      await PedidoUseCase.realizaPedido(
        checkoutRepositoryMock,
        faturaRepositoryMock,
        pedidoRepositoryMock,
        produtoRepositoryMock,
        prealizaPedidoInput)
    }).rejects.toThrow()
  });

  it('Testa mudar staus para -> Aguardando Preparo', async () => {

    const pedidoRepositoryMock: PedidoRepository = {
      criaPedido: jest.fn().mockResolvedValue(null),
      atualizaPedido: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: "1",
        status: "Aguardando pagamento",
        valor: 3.2,
        itens: [
          {
            id: "1",
            produtoId: "1",
            pedidoId: "1",
            quantidade: 1,
            valorUnitario: 1.1,
            valorTotal: 10,
            observacao: "test",
            createdAt,
            updatedAt: null,
            deletedAt: null,
          },
          {
            id: "2",
            produtoId: "2",
            pedidoId: "1",
            quantidade: 1,
            valorUnitario: 2.1,
            valorTotal: 10,
            observacao: "test",
            createdAt,
            updatedAt: null,
            deletedAt: null,
          },
        ],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
      listaPedidos: jest.fn().mockResolvedValue(null),
      retornaProximoPedidoFila: jest.fn().mockResolvedValue(null),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensPedido: jest.fn().mockResolvedValue([
        {
          id: "1",
          produtoId: "1",
          pedidoId: "1",
          quantidade: 1,
          valorUnitario: 1.1,
          valorTotal: 10,
          observacao: "test",
          createdAt,
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: "2",
          produtoId: "2",
          pedidoId: "1",
          quantidade: 1,
          valorUnitario: 2.1,
          valorTotal: 10,
          observacao: "test",
          createdAt,
          updatedAt: null,
          deletedAt: null,
        },
      ]),
      atualizaStatusDoPedido: jest.fn().mockResolvedValue(null),
      adicionaItem: jest.fn().mockResolvedValue(null),
      retornaPedido: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Rascunho",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
    }

    const prealizaPedidoInput: RealizaPedidoInput = {
      pedidoId: "1",
      clienteId: '1',
      metodoDePagamentoId: ""
    }


    const realizaPedido = await PedidoUseCase.realizaPedido(
      checkoutRepositoryMock,
      faturaRepositoryMock,
      pedidoRepositoryMock,
      produtoRepositoryMock,
      prealizaPedidoInput)
    expect(realizaPedido?.status).toBe("Aguardando pagamento")
    expect(realizaPedido?.faturaId).toBe("1")

  });

  // TODO -refazer 
  // it('Testa mudar staus para -> Aguardando Preparo', async () => {

  //   const pedidoRepositoryMock: PedidoRepository = {
  //     criaPedido: jest.fn().mockResolvedValue(null),
  //     atualizaPedido: jest.fn().mockResolvedValue({
  //       id: "1",
  //       clienteId: "",
  //       faturaId: "1",
  //       status: "Aguardando pagamento",
  //       valor: 3.2,
  //       itens: [],
  //       retiradoEm: null,
  //       createdAt: Date,
  //       deletedAt: null,
  //       updatedAt: null,
  //     }),
  //     listaPedidos: jest.fn().mockResolvedValue(null),
  //     retornaProximoPedidoFila: jest.fn().mockResolvedValue({
  //       id: "1",
  //       clienteId: "",
  //       faturaId: "1",
  //       status: "Aguardando pagamento",
  //       valor: 3.2,
  //       itens: [],
  //       retiradoEm: null,
  //       createdAt: Date,
  //       deletedAt: null,
  //       updatedAt: null,
  //     }),
  //     removeItem: jest.fn().mockResolvedValue(null),
  //     retornaItem: jest.fn().mockResolvedValue(null),
  //     retornaItensPedido: jest.fn().mockResolvedValue([
  //       {
  //         id: "1",
  //         produtoId: "1",
  //         pedidoId: "1",
  //         quantidade: 1,
  //         valorUnitario: 1.1,
  //         valorTotal: 10,
  //         observacao: "test",
  //         createdAt,
  //         updatedAt: null,
  //         deletedAt: null,
  //       },
  //       {
  //         id: "2",
  //         produtoId: "2",
  //         pedidoId: "1",
  //         quantidade: 1,
  //         valorUnitario: 2.1,
  //         valorTotal: 10,
  //         observacao: "test",
  //         createdAt,
  //         updatedAt: null,
  //         deletedAt: null,
  //       },
  //     ]),
  //     atualizaStatusDoPedido: jest.fn().mockResolvedValue(null),
  //     adicionaItem: jest.fn().mockResolvedValue(null),
  //     retornaPedido: jest.fn().mockResolvedValue({
  //       id: "1",
  //       clienteId: "",
  //       faturaId: null,
  //       status: "Aguardando pagamento",
  //       valor: 0,
  //       itens: [],
  //       retiradoEm: null,
  //       createdAt: Date,
  //       deletedAt: null,
  //       updatedAt: null,
  //     }),
  //   }

  //   const pagamentoInput: PagamentoDTO = {
  //     id: "1",
  //     isPago: true,
  //     valorPagamento: 10,
  //     tipoDePagamento: "",
  //     faturaId: "",
  //     createdAt,
  //     deletedAt: null,
  //     updatedAt: null
  //   }


  //   await PedidoUseCase.pagamentoAprovado(
  //     pedidoRepositoryMock,
  //     faturaRepositoryMock,
  //     pagamentoInput)


  // });

  it('Testa mudar status via id para -> Iniciar Preparo', async () => {

    const pedidoRepositoryMock: PedidoRepository = {
      criaPedido: jest.fn().mockResolvedValue(null),
      atualizaPedido: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: "1",
        status: "Em Preparo",
        valor: 3.2,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
      listaPedidos: jest.fn().mockResolvedValue(null),
      retornaProximoPedidoFila: jest.fn().mockResolvedValue(null),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensPedido: jest.fn().mockResolvedValue(null),
      atualizaStatusDoPedido: jest.fn().mockResolvedValue(null),
      adicionaItem: jest.fn().mockResolvedValue(null),
      retornaPedido: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Aguardando preparo",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
    }


    const realizaPedido = await PedidoUseCase.iniciaPreparo(
      pedidoRepositoryMock,
      produtoRepositoryMock,
      "1")
    expect(realizaPedido?.status).toBe("Em Preparo")

  });

  it('Testa mudar status do proximo pedido da fila para -> Iniciar Preparo', async () => {

    const pedidoRepositoryMock: PedidoRepository = {
      criaPedido: jest.fn().mockResolvedValue(null),
      atualizaPedido: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: "1",
        status: "Em Preparo",
        valor: 3.2,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
      listaPedidos: jest.fn().mockResolvedValue(null),
      retornaProximoPedidoFila: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Aguardando preparo",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensPedido: jest.fn().mockResolvedValue(null),
      atualizaStatusDoPedido: jest.fn().mockResolvedValue(null),
      adicionaItem: jest.fn().mockResolvedValue(null),
      retornaPedido: jest.fn().mockResolvedValue(null),
    }


    const realizaPedido = await PedidoUseCase.iniciaPreparo(
      pedidoRepositoryMock,
      produtoRepositoryMock)
    expect(realizaPedido?.status).toBe("Em Preparo")

  });
  it('Testa mudar status do pedido para  -> Iniciar Preparo', async () => {

    const pedidoRepositoryMock: PedidoRepository = {
      criaPedido: jest.fn().mockResolvedValue(null),
      atualizaPedido: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: "1",
        status: "Em Preparo",
        valor: 3.2,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
      listaPedidos: jest.fn().mockResolvedValue(null),
      retornaProximoPedidoFila: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Aguardando preparo",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensPedido: jest.fn().mockResolvedValue(null),
      atualizaStatusDoPedido: jest.fn().mockResolvedValue(null),
      adicionaItem: jest.fn().mockResolvedValue(null),
      retornaPedido: jest.fn().mockResolvedValue(null),
    }


    const realizaPedido = await PedidoUseCase.iniciaPreparo(
      pedidoRepositoryMock,
      produtoRepositoryMock)
    expect(realizaPedido?.status).toBe("Em Preparo")

  });

  it('Testa mudar status do pedido -> Finalizado', async () => {

    const pedidoRepositoryMock: PedidoRepository = {
      criaPedido: jest.fn().mockResolvedValue(null),
      atualizaPedido: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: "1",
        status: "Pronto",
        valor: 3.2,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
      listaPedidos: jest.fn().mockResolvedValue(null),
      retornaProximoPedidoFila: jest.fn().mockResolvedValue(null),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensPedido: jest.fn().mockResolvedValue(null),
      atualizaStatusDoPedido: jest.fn().mockResolvedValue(null),
      adicionaItem: jest.fn().mockResolvedValue(null),
      retornaPedido: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Em preparo",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
    }


    const realizaPedido = await PedidoUseCase.finalizaPreparo(
      pedidoRepositoryMock,
      produtoRepositoryMock,
      "1")
    expect(realizaPedido?.status).toBe("Pronto")

  });
});
