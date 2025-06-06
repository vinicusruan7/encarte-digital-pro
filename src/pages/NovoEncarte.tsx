import React, { useState, useRef, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, Package2, ImageIcon, Phone, MapPin, CreditCard, Save, Eye, Search, PackagePlus, X, Download, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { SearchInput } from '@/components/ui/search-input';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

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
  const [previewOpen, setPreviewOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Google Drive integration states
  const [driveLink, setDriveLink] = useState('');
  const [configDriveOpen, setConfigDriveOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [driveImages, setDriveImages] = useState<string[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [driveConfigured, setDriveConfigured] = useState(false);
  
  // Formatar preço para BRL
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(price);
  };

  // Configurar Google Drive
  const configureDrive = () => {
    if (!driveLink.trim()) {
      toast({
        title: "Link inválido",
        description: "Por favor, insira um link válido do Google Drive.",
        variant: "destructive"
      });
      return;
    }

    // Validar o link do Google Drive (verificação básica)
    if (!driveLink.includes('drive.google.com')) {
      toast({
        title: "Link inválido",
        description: "O link fornecido não parece ser do Google Drive.",
        variant: "destructive"
      });
      return;
    }

    setDriveConfigured(true);
    setConfigDriveOpen(false);
    
    toast({
      title: "Google Drive configurado",
      description: "O banco de imagens do Google Drive foi configurado com sucesso.",
    });

    // Simular busca inicial para popular o banco de imagens
    searchDriveImages('');
  };

  // Função para buscar imagens do Google Drive (simulada)
  const searchDriveImages = (term: string) => {
    setIsLoadingImages(true);
    
    // Simulando uma busca de imagens no Google Drive
    // Em uma implementação real, isso seria uma chamada à API do Google Drive
    setTimeout(() => {
      const mockImages = [
        'https://images.unsplash.com/photo-1528825871115-3581a5387919', // banana
        'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a', // banana
        'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6', // maçã
        'https://images.unsplash.com/photo-1563289142-6725b48bb595', // frutas variadas
        'https://images.unsplash.com/photo-1610830479222-91a39d7de6c3', // carne
        'https://images.unsplash.com/photo-1615759546484-6a31e765b147', // arroz
        'https://images.unsplash.com/photo-1566487097168-e91a4f38bee2', // bebidas
        'https://images.unsplash.com/photo-1609951651556-5334e2706168', // leite
      ];
      
      // Filtrar as imagens com base no termo de pesquisa
      let filteredImages = mockImages;
      
      if (term.toLowerCase() === 'banana') {
        filteredImages = mockImages.slice(0, 2);
      } else if (term.toLowerCase() === 'maçã' || term.toLowerCase() === 'maca') {
        filteredImages = mockImages.slice(2, 3);
      } else if (term.toLowerCase() === 'carne') {
        filteredImages = mockImages.slice(4, 5);
      } else if (term.toLowerCase() === 'arroz') {
        filteredImages = mockImages.slice(5, 6);
      } else if (term.toLowerCase() === 'bebida' || term.toLowerCase() === 'refrigerante') {
        filteredImages = mockImages.slice(6, 7);
      }
      
      setDriveImages(filteredImages);
      setIsLoadingImages(false);
    }, 1000);
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

  // Adicionar produto personalizado com imagem selecionada
  const addCustomProductWithImage = () => {
    if (!selectedImage) {
      toast({
        title: "Nenhuma imagem selecionada",
        description: "Por favor, selecione uma imagem para adicionar ao produto.",
        variant: "destructive"
      });
      return;
    }

    const newProduct = {
      id: Date.now(),
      nome: searchTerm || "Produto Personalizado",
      preco: 0.00,
      precoPromocional: null,
      categoria: "Personalizado",
      imagem: selectedImage
    };

    addProductToEncarte(newProduct);
    setSelectedImage(null);
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

  // Função para preencher todo o encarte com produtos
  const fillEncarteWithProducts = () => {
    const totalCells = selectedTemplate.columns * selectedTemplate.rows;
    const newSelectedProducts = [];
    
    // Preencher todas as células com produtos disponíveis, repetindo se necessário
    for (let i = 0; i < totalCells; i++) {
      // Pegar o produto da lista usando módulo para repetir quando necessário
      const productIndex = i % availableProducts.length;
      newSelectedProducts.push(availableProducts[productIndex]);
    }
    
    setSelectedProducts(newSelectedProducts);
    
    toast({
      title: "Encarte preenchido",
      description: "Todas as células foram preenchidas com produtos.",
    });
  };

  // Salvar encarte (simulação)
  const saveEncarte = () => {
    toast({
      title: "Encarte salvo",
      description: "Seu encarte foi salvo com sucesso!",
    });
  };

  // Visualizar encarte
  const previewEncarte = () => {
    setPreviewOpen(true);
  };

  // Função para gerar e baixar PDF do encarte
  const downloadPDF = async () => {
    if (!previewRef.current) return;
    
    toast({
      title: "Gerando PDF",
      description: "Aguarde enquanto o PDF é gerado...",
    });
    
    try {
      // Captura o conteúdo do encarte como uma imagem com configurações melhoradas
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, // Aumenta a qualidade
        useCORS: true, // Permitir imagens de outras origens
        logging: false,
        allowTaint: true,
        scrollY: -window.scrollY, // Ajuda a capturar o conteúdo completo
        height: previewRef.current.scrollHeight, // Garante captura da altura total
        windowHeight: previewRef.current.scrollHeight, // Altura da janela para captura
        onclone: (clonedDoc) => {
          // Garante que o elemento clonado seja visível para captura completa
          const clonedElement = clonedDoc.querySelector('[data-preview-clone]') as HTMLElement;
          if (clonedElement) {
            clonedElement.style.height = 'auto';
            clonedElement.style.overflow = 'visible';
            clonedElement.style.position = 'absolute';
            clonedElement.style.top = '0';
            clonedElement.style.left = '0';
          }
        }
      });
      
      // Calcula as dimensões para o PDF (A4)
      const imgWidth = 210; // mm - largura A4
      const pageHeight = 297; // mm - altura A4
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      // Cria o documento PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Gerencia conteúdo por páginas, se necessário
      let heightLeft = imgHeight;
      let position = 0;
      
      // Adiciona a primeira página
      pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Adiciona páginas adicionais se o conteúdo for maior que uma página
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Baixa o PDF
      pdf.save(`${encarteTitle.replace(/\s+/g, '_')}.pdf`);
      
      toast({
        title: "PDF gerado com sucesso!",
        description: "O download do seu encarte em PDF foi iniciado."
      });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast({
        title: "Erro ao gerar PDF",
        description: "Ocorreu um problema ao gerar o PDF. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  // Renderiza o conteúdo do encarte (utilizado tanto na edição quanto na visualização)
  const renderEncarteContent = (isPreview = false) => {
    return (
      <div 
        ref={isPreview ? previewRef : null}
        data-preview-clone={isPreview ? "true" : undefined}
        className={`border ${showCells && !isPreview ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'} rounded-lg overflow-hidden`}
        style={isPreview ? { maxHeight: 'none', overflow: 'visible' } : {}}
      >
        {/* Cabeçalho do Encarte */}
        <div className="bg-primary-500 text-white p-4">
          <h2 className="text-xl md:text-2xl font-bold text-center">{encarteTitle}</h2>
          <p className="text-center text-sm md:text-base">{storeInfo.nome}</p>
        </div>

        {/* Área de Produtos */}
        <div 
          className={`grid ${showCells && !isPreview ? 'gap-1 p-1' : 'gap-0'}`}
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
                  showCells && !isPreview ? 'border border-dashed border-gray-300 dark:border-gray-600' : ''
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
                      {!isPreview && (
                        <button 
                          className="absolute top-1 right-1 bg-white/80 dark:bg-black/80 rounded-full p-1 hover:bg-red-100 dark:hover:bg-red-900/50 z-10"
                          onClick={() => removeProductFromEncarte(index)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      )}
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
                      {showCells && !isPreview && <span>Célula vazia</span>}
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
    );
  };

  // Effect para buscar imagens quando o termo de busca mudar
  useEffect(() => {
    if (driveConfigured && searchTerm.length > 2) {
      const timer = setTimeout(() => {
        searchDriveImages(searchTerm);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, driveConfigured]);

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
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={fillEncarteWithProducts}
                    className="flex items-center gap-1"
                  >
                    <PackagePlus size={16} />
                    <span>Preencher Encarte</span>
                  </Button>
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
              </div>

              {/* Área de montagem do encarte */}
              {renderEncarteContent()}
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
                <Card className="p-4">
                  {!driveConfigured ? (
                    <div className="text-center py-8">
                      <ImageIcon size={48} className="mx-auto text-gray-300" />
                      <h3 className="mt-4 text-lg font-medium">Banco de Imagens</h3>
                      <p className="text-gray-500 mt-1 max-w-md mx-auto">
                        Conecte ao Google Drive para acessar seu banco de imagens personalizado.
                      </p>
                      <Button className="mt-4" onClick={() => setConfigDriveOpen(true)}>
                        <LinkIcon size={16} className="mr-2" />
                        Configurar Google Drive
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold">Banco de Imagens</h3>
                        <Button variant="outline" size="sm" onClick={() => setConfigDriveOpen(true)}>
                          <LinkIcon size={14} className="mr-1" />
                          Alterar Link
                        </Button>
                      </div>
                      
                      <div className="mb-4">
                        <SearchInput
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Buscar imagens por nome..."
                        />
                      </div>
                      
                      {isLoadingImages ? (
                        <div className="flex justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-[400px]">
                            {driveImages.map((image, index) => (
                              <div 
                                key={index}
                                className={`border rounded-md overflow-hidden cursor-pointer aspect-square ${selectedImage === image ? 'ring-2 ring-primary-500' : 'hover:border-primary-300'}`}
                                onClick={() => setSelectedImage(image)}
                              >
                                <img 
                                  src={image} 
                                  alt={`Imagem ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                            
                            {driveImages.length === 0 && (
                              <div className="col-span-2 py-8 text-center text-gray-500">
                                <p>Nenhuma imagem encontrada para "{searchTerm}"</p>
                                <p className="text-sm mt-2">Tente outros termos de busca</p>
                              </div>
                            )}
                          </div>
                          
                          {selectedImage && (
                            <div className="mt-4">
                              <Button 
                                className="w-full" 
                                onClick={addCustomProductWithImage}
                              >
                                Adicionar Imagem ao Encarte
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
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

      {/* Modal de Visualização do Encarte */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-[90%] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Visualização do Encarte</span>
              <DialogClose className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-800">
                <X size={18} />
              </DialogClose>
            </DialogTitle>
            <DialogDescription>
              Veja como seu encarte ficará para os clientes
            </DialogDescription>
          </DialogHeader>
          <div className="p-4">
            {renderEncarteContent(true)}
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Fechar
            </Button>
            <Button className="ml-2" onClick={downloadPDF}>
              <Download size={16} className="mr-2" />
              Baixar PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Configuração do Google Drive */}
      <Dialog open={configDriveOpen} onOpenChange={setConfigDriveOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Configurar Google Drive</DialogTitle>
            <DialogDescription>
              Insira o link de uma pasta compartilhada do Google Drive para usar como banco de imagens.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="drive-link" className="mb-2 block">Link da pasta compartilhada</Label>
            <Input
              id="drive-link"
              placeholder="https://drive.google.com/drive/folders/..."
              value={driveLink}
              onChange={(e) => setDriveLink(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-2">
              A pasta deve estar configurada com acesso público de visualização.
            </p>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={configureDrive}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default NovoEncarte;
