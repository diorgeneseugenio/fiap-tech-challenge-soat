import { Produto } from '../../../core/domain/produto';

describe('Criação de instância de Produto', () => {
  it('Deve ter todas as propriedades obrigatórias', () => {
    const produto: Produto = {
      id: '1',
      nome: 'Misto quente',
      preco: 10,
      descricao: 'é um lanche'
    };

    expect(produto.nome).toBe('Misto quente');
    expect(produto.preco).toBe(10);
    expect(produto.descricao).toBe('é um lanche');
  });
});