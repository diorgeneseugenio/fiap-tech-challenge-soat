export default interface Produto {
    id: string;
    nome: string;
    categoria: Categoria;
    preco: number;
    descricao: string;
    imagens: string[];
}