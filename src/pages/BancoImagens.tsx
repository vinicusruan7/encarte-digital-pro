
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Search, LinkIcon, Download, ImageIcon, X } from 'lucide-react';

const BancoImagens = () => {
  const { toast } = useToast();
  const [driveLink, setDriveLink] = useState('');
  const [configDriveOpen, setConfigDriveOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [driveImages, setDriveImages] = useState<string[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [driveConfigured, setDriveConfigured] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

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

  // Function to download the selected image
  const downloadImage = (imageUrl: string) => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `imagem-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download iniciado",
      description: "O download da imagem foi iniciado.",
    });
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
            <h1 className="text-2xl md:text-3xl font-bold text-dark dark:text-white">Banco de Imagens</h1>
            <p className="text-gray-500 mt-1">Gerencie suas imagens para uso nos encartes</p>
          </div>
          {driveConfigured && (
            <Button onClick={() => setConfigDriveOpen(true)}>
              <LinkIcon size={16} className="mr-2" />
              Alterar Pasta do Drive
            </Button>
          )}
        </div>

        <Card>
          <CardContent className="p-6">
            {!driveConfigured ? (
              <div className="text-center py-12">
                <ImageIcon size={64} className="mx-auto text-gray-300" />
                <h3 className="mt-4 text-xl font-medium">Configure seu Banco de Imagens</h3>
                <p className="text-gray-500 mt-2 max-w-md mx-auto">
                  Conecte ao Google Drive para acessar suas imagens em um só lugar. Basta compartilhar uma pasta e inserir o link abaixo.
                </p>
                <Button className="mt-6" onClick={() => setConfigDriveOpen(true)}>
                  <LinkIcon size={16} className="mr-2" />
                  Configurar Google Drive
                </Button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <Input
                      className="pl-10"
                      placeholder="Buscar imagens por nome (ex: banana, maçã...)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                {isLoadingImages ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                  </div>
                ) : (
                  <>
                    {driveImages.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {driveImages.map((image, index) => (
                          <div 
                            key={index}
                            className="group relative aspect-square border rounded-md overflow-hidden cursor-pointer hover:border-primary-500 transition-colors"
                            onClick={() => setSelectedImage(image)}
                          >
                            <img 
                              src={image} 
                              alt={`Imagem ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="bg-white text-gray-800 hover:bg-white/90 mr-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  downloadImage(image);
                                }}
                              >
                                <Download size={16} />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="bg-white text-gray-800 hover:bg-white/90"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedImage(image);
                                  setPreviewOpen(true);
                                }}
                              >
                                <Search size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">Nenhuma imagem encontrada para "{searchTerm}"</p>
                        <p className="text-sm mt-2">Tente outros termos de busca ou adicione mais imagens ao seu Google Drive</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

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

      {/* Modal de Visualização da Imagem */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Visualização da Imagem</span>
              <DialogClose asChild>
                <Button variant="ghost" size="icon">
                  <X size={18} />
                </Button>
              </DialogClose>
            </DialogTitle>
          </DialogHeader>
          
          {selectedImage && (
            <div className="py-4 text-center">
              <div className="overflow-hidden rounded-md">
                <img 
                  src={selectedImage} 
                  alt="Visualização da imagem"
                  className="max-w-full max-h-[60vh] mx-auto object-contain"
                />
              </div>
              <div className="mt-4 flex justify-center">
                <Button onClick={() => downloadImage(selectedImage)}>
                  <Download size={16} className="mr-2" />
                  Baixar Imagem
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default BancoImagens;
