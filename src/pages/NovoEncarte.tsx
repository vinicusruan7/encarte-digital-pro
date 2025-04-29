import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, Package2, ImageIcon, Phone, MapPin, CreditCard, Save, Eye, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { SearchInput } from '@/components/ui/search-input';

// Template simulado selecionado
const selectedTemplate = {
  id: 1,
  name: 'Ofertas Semanais',
  thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
  columns: 3,
  rows: 4
};

// Produtos simulados
const availableProducts = [
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
];

// Informações fixas do supermercado
const storeInfo = {
  nome: 'Supermercado Modelo',
  telefone: '(11) 1234-5678',
  endereco: 'Av. Principal, 1000 - Centro',
  formasPagamento: ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Pix'],
  horarioFuncionamento: 'Seg a Sáb: 08h às 22h | Dom: 09h às 20h'
};

const NovoEncarte = () => {
  const { toast } = useToast();
  const [encarteTitle, setEncarteTitle] = useState('Ofertas da Semana');
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [showCells, setShowCells] = useState(true);
  
  // Formatar preço para BRL
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(price);
  };

  // Adicionar produto ao encarte
  const addProductToEncarte = (product: any) => {
    if (selectedProducts.length < selectedTemplate.columns * selectedTemplate.rows) {
      setSelectedProducts([...selectedProducts, product]);
      toast({
        title: "Produto adicionado",
        description: `${product.nome} foi adicionado ao encarte.`,
      });
    } else {
      toast({
        title: "Limite atingido",
        description: "O template atual não suporta mais produtos.",
        variant: "destructive"
      });
    }
  };

  // Remover produto do encarte
  const removeProductFromEncarte = (index: number) => {
    const newProducts = [...selectedProducts];
    newProducts.splice(index, 1);
    setSelectedProducts(newProducts);
    toast({
      title: "Produto removido",
      description: "O produto foi removido do encarte.",
    });
  };

  // Salvar encarte (simulação)
  const saveEncarte = () => {
    toast({
      title: "Encarte salvo",
      description: "Seu encarte foi salvo com sucesso!",
    });
  };

  // Visualizar encarte (simulação)
  const previewEncarte = () => {
    toast({
      title: "Visualização",
      description: "Em uma versão real, uma previeww do encarte seria aberta.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark dark:text-white">Criar Encarte</h1>
            <p className="text-gray-500 mt-1">Monte seu encarte digital personalizado</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={previewEncarte}>
              <Eye size={18} className="mr-2" />
              Visualizar
            </Button>
            <Button className="btn-primary" onClick={saveEncarte}>
              <Save size={18} className="mr-2" />
              Salvar Encarte
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor do Encarte */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="mb-4">
                <label htmlFor="encarte-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Título do Encarte
                </label>
                <input
                  id="encarte-title"
                  type="text"
                  className="input-field"
                  value={encarteTitle}
                  onChange={(e) => setEncarteTitle(e.target.value)}
                />
              </div>

              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="font-medium">Template: {selectedTemplate.name}</h3>
                  <p className="text-sm text-gray-500">Layout: {selectedTemplate.columns}x{selectedTemplate.rows}</p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <span className="mr-2 text-sm">Mostrar grid</span>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={showCells} 
                    onChange={() => setShowCells(!showCells)} 
                  />
                  <div className={`w-10 h-5 rounded-full transition-colors ${showCells ? 'bg-primary-500' : 'bg-gray-300'} relative`}>
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${showCells ? 'translate-x-5' : 'translate-x-1'}`}></div>
                  </div>
                </label>
              </div>

              {/* Área de montagem do encarte */}
              <div className={`border ${showCells ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'} rounded-lg overflow-hidden`}>
                {/* Cabeçalho do Encarte */}
                <div className="bg-primary-500 text-white p-4">
                  <h2 className="text-xl md:text-2xl font-bold text-center">{encarteTitle}</h2>
                  <p className="text-center text-sm md:text-base">{storeInfo.nome}</p>
                </div>

                {/* Área de Produtos */}
                <div 
                  className={`grid ${showCells ? 'gap-1 p-1' : 'gap-0'}`}
                  style={{
                    gridTemplateColumns: `repeat(${selectedTemplate.columns}, 1fr)`,
                    gridTemplateRows: `repeat(${selectedTemplate.rows}, 1fr)`
                  }}
                >
                  {/* Criando células vazias baseadas no template */}
                  {Array(selectedTemplate.columns * selectedTemplate.rows).fill(null).map((_, index) => {
                    const product = selectedProducts[index];
                    
                    return (
                      <div 
                        key={index} 
                        className={`aspect-square ${
                          showCells ? 'border border-dashed border-gray-300 dark:border-gray-600' : ''
                        } relative overflow-hidden`}
                      >
                        {product ? (
                          <div className="h-full p-2 flex flex-col">
                            <div className="flex-1 relative overflow-hidden">
                              <img 
                                src={product.imagem} 
                                alt={product.nome}
                                className="w-full h-full object-cover"
                              />
                              <button 
                                className="absolute top-1 right-1 bg-white/80 dark:bg-black/80 rounded-full p-1 hover:bg-red-100 dark:hover:bg-red-900/50 z-10"
                                onClick={() => removeProductFromEncarte(index)}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                            </div>
                            <div className="mt-1 text-center">
                              <p className="text-xs font-medium truncate">{product.nome}</p>
                              <div className="flex justify-center items-baseline gap-1 mt-0.5">
                                {product.precoPromocional ? (
                                  <>
                                    <span className="font-bold text-xs">{formatPrice(product.precoPromocional)}</span>
                                    <span className="text-[10px] text-gray-500 line-through">{formatPrice(product.preco)}</span>
                                  </>
                                ) : (
                                  <span className="font-bold text-xs">{formatPrice(product.preco)}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center bg-gray-100/50 dark:bg-gray-800/50 text-gray-400">
                            <div className="text-center text-xs">
                              {showCells && <span>Célula vazia</span>}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Rodapé do Encarte */}
                <div className="bg-gray-100 dark:bg-gray-800 p-4 text-xs md:text-sm">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex items-center">
                      <Phone size={16} className="mr-2 text-primary-500" />
                      <span>{storeInfo.telefone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-primary-500" />
                      <span>{storeInfo.endereco}</span>
                    </div>
                    <div className="flex items-center">
                      <CreditCard size={16} className="mr-2 text-primary-500" />
                      <span>{storeInfo.formasPagamento.join(', ')}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-center text-gray-500">
                    <p>{storeInfo.horarioFuncionamento}</p>
                    <p className="mt-1">Ofertas válidas enquanto durarem os estoques.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Seletor de Conteúdo */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="produtos">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="produtos" className="flex items-center gap-2">
                  <Package2 size={16} />
                  <span className="hidden sm:inline">Produtos</span>
                </TabsTrigger>
                <TabsTrigger value="imagens" className="flex items-center gap-2">
                  <ImageIcon size={16} />
                  <span className="hidden sm:inline">Imagens</span>
                </TabsTrigger>
                <TabsTrigger value="info" className="flex items-center gap-2">
                  <Phone size={16} />
                  <span className="hidden sm:inline">Informações</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="produtos" className="mt-0">
                <Card>
                  <div className="p-4">
                    <div className="relative mb-4">
                      <SearchInput
                        type="search"
                        placeholder="Buscar produtos..."
                      />
                    </div>
                    
                    <div className="overflow-y-auto max-h-[500px] pr-2 -mr-2">
                      <div className="grid grid-cols-2 gap-3">
                        {availableProducts.map(product => (
                          <div 
                            key={product.id}
                            className="border rounded-md overflow-hidden cursor-pointer hover:border-primary-500 transition-colors"
                            onClick={() => addProductToEncarte(product)}
                          >
                            <div className="aspect-square">
                              <img 
                                src={product.imagem} 
                                alt={product.nome}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-2">
                              <p className="text-xs font-medium truncate">{product.nome}</p>
                              <div className="flex items-baseline gap-1 mt-0.5">
                                {product.precoPromocional ? (
                                  <>
                                    <span className="font-bold text-xs">{formatPrice(product.precoPromocional)}</span>
                                    <span className="text-[10px] text-gray-500 line-through">{formatPrice(product.preco)}</span>
                                  </>
                                ) : (
                                  <span className="font-bold text-xs">{formatPrice(product.preco)}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="imagens" className="mt-0">
                <Card className="p-6">
                  <div className="text-center py-8">
                    <ImageIcon size={48} className="mx-auto text-gray-300" />
                    <h3 className="mt-4 text-lg font-medium">Banco de Imagens</h3>
                    <p className="text-gray-500 mt-1 max-w-md mx-auto">
                      Aqui você pode gerenciar e selecionar imagens para adicionar ao seu encarte.
                    </p>
                    <Button className="mt-4">
                      <ImageIcon size={16} className="mr-2" />
                      Gerenciar Imagens
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="info" className="mt-0">
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Informações da Loja</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nome da Loja</label>
                      <input 
                        type="text" 
                        className="input-field"
                        defaultValue={storeInfo.nome} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Telefone</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        defaultValue={storeInfo.telefone}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Endereço</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        defaultValue={storeInfo.endereco}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Formas de Pagamento</label>
                      <textarea 
                        className="input-field min-h-[80px]" 
                        defaultValue={storeInfo.formasPagamento.join(', ')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Horário de Funcionamento</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        defaultValue={storeInfo.horarioFuncionamento}
                      />
                    </div>
                    <Button type="button" className="w-full">
                      Atualizar Informações
                    </Button>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NovoEncarte;
