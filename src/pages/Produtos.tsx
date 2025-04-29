
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Plus, Search, Edit, Trash, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Tipos
interface Produto {
  id: number;
  nome: string;
  preco: number;
  precoPromocional: number | null;
  categoria: string;
  imagem: string;
}

const Produtos = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Produtos simulados
  const produtosData: Produto[] = [
    {
      id: 1,
      nome: 'Maçã Fuji (kg)',
      preco: 8.99,
      precoPromocional: 6.99,
      categoria: 'Hortifruti',
      imagem: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901'
    },
    {
      id: 2,
      nome: 'Contra Filé (kg)',
      preco: 49.90,
      precoPromocional: 39.90,
      categoria: 'Carnes',
      imagem: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04'
    },
    {
      id: 3,
      nome: 'Arroz Branco 5kg',
      preco: 24.90,
      precoPromocional: null,
      categoria: 'Mercearia',
      imagem: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
    },
    {
      id: 4,
      nome: 'Refrigerante Cola 2L',
      preco: 8.99,
      precoPromocional: 7.49,
      categoria: 'Bebidas',
      imagem: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'
    },
    {
      id: 5,
      nome: 'Leite Integral 1L',
      preco: 5.49,
      precoPromocional: 4.99,
      categoria: 'Laticínios',
      imagem: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
    },
    {
      id: 6,
      nome: 'Detergente Líquido 500ml',
      preco: 3.99,
      precoPromocional: null,
      categoria: 'Limpeza',
      imagem: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'
    },
  ];

  // Filtrar produtos por pesquisa e categoria
  const filteredProdutos = produtosData.filter(produto => {
    const matchesSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !activeCategory || produto.categoria === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Extrair categorias únicas
  const categories = Array.from(new Set(produtosData.map(p => p.categoria)));

  // Simulação de exclusão de produto
  const handleDeleteProduct = (id: number) => {
    toast({
      title: "Produto excluído",
      description: "O produto foi removido com sucesso.",
    });
  };

  // Formatar preço para BRL
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(price);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark dark:text-white">Produtos</h1>
            <p className="text-gray-500 mt-1">Gerencie seu catálogo de produtos</p>
          </div>
          <Link to="/produtos/novo">
            <Button className="btn-primary">
              <Plus size={20} className="mr-2" /> Novo Produto
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="search"
              placeholder="Buscar produtos..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <div className="flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm text-gray-500">Filtrar:</span>
            </div>
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1 text-sm rounded-md whitespace-nowrap ${
                activeCategory === null 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Todos
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 text-sm rounded-md whitespace-nowrap ${
                  activeCategory === category 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProdutos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProdutos.map(produto => (
              <Card key={produto.id} className="product-card animate-fade-in">
                <div className="aspect-square mb-3 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                  <img 
                    src={produto.imagem} 
                    alt={produto.nome} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium truncate">{produto.nome}</h3>
                    <div className="flex space-x-1">
                      <button 
                        className="p-1 rounded-md text-gray-500 hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                        title="Editar produto"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="p-1 rounded-md text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                        title="Excluir produto"
                        onClick={() => handleDeleteProduct(produto.id)}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-1">
                    <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                      {produto.categoria}
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    {produto.precoPromocional ? (
                      <>
                        <span className="font-bold text-lg">{formatPrice(produto.precoPromocional)}</span>
                        <span className="text-sm text-gray-500 line-through">{formatPrice(produto.preco)}</span>
                      </>
                    ) : (
                      <span className="font-bold text-lg">{formatPrice(produto.preco)}</span>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            {/* Card para adicionar novo produto */}
            <Link 
              to="/produtos/novo"
              className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center aspect-square bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="text-center p-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <Plus size={24} className="text-primary-500" />
                </div>
                <p className="mt-2 font-medium">Adicionar Produto</p>
              </div>
            </Link>
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Nenhum produto encontrado</h3>
            <p className="text-gray-500 mt-2">
              Tente ajustar os filtros ou adicione um novo produto.
            </p>
            <Link to="/produtos/novo" className="mt-4 inline-block">
              <Button className="btn-primary">
                <Plus size={16} className="mr-2" /> Novo Produto
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default Produtos;
