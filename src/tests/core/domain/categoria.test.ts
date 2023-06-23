import Categoria from '../../../core/domain/categorias';

describe('Criação de instância de Categoria', () => {
  it('Deve ter todas as propriedades obrigatórias', () => {
    const categoria: Categoria = {
      id: '1',
      nome: 'Lanche',
    };

    expect(categoria.id).toBe('1');
    expect(categoria.nome).toBe('Lanche');
  });
});
