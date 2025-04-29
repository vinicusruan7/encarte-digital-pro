
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Template {
  id: number;
  name: string;
  thumbnail: string;
  category: string;
  lastUsed: string | null;
  description?: string;
  dimensions?: { width: number; height: number };
  dateCreated?: string;
  headerBackground?: string;
  logo?: string;
}

const NovoTemplate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState<Partial<Template>>({
    name: '',
    category: '',
    description: '',
    dimensions: { width: 800, height: 1200 },
  });
  const [loading, setLoading] = useState(false);
  const [loadingTemplate, setLoadingTemplate] = useState(isEditMode);

  useEffect(() => {
    // Se estiver no modo de edição, carrega os dados do template
    if (isEditMode && id) {
      setLoadingTemplate(true);
      
      // Simulação de busca do template
      setTimeout(() => {
        // Dados simulados do template
        const templateData: Template = {
          id: Number(id),
          name: id === '1' ? 'Ofertas Semanais' : `Template ${id}`,
          thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          category: 'Promoção',
          lastUsed: '15/04/2025',
          description: 'Template para exibição das ofertas semanais da loja. Ideal para promoções relâmpago e divulgação de produtos em destaque.',
          dimensions: { width: 800, height: 1200 },
          dateCreated: '01/01/2025',
          headerBackground: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
          logo: undefined
        };
        
        setFormData(templateData);
        setLoadingTemplate(false);
      }, 800);
    }
  }, [id, isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [name]: Number(value),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulação de envio
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: isEditMode ? "Template atualizado" : "Template criado",
        description: isEditMode 
          ? "O template foi atualizado com sucesso." 
          : "O novo template foi criado com sucesso.",
      });
      
      navigate('/templates');
    }, 1000);
  };

  if (loadingTemplate) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate(isEditMode ? `/templates/${id}` : '/templates')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {isEditMode ? 'Editar Template' : 'Novo Template'}
            </h1>
            <p className="text-gray-500 mt-1">
              {isEditMode 
                ? 'Modifique as propriedades do template existente' 
                : 'Configure as propriedades para o novo template'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Template</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    placeholder="Ex: Ofertas Semanais"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select 
                    value={formData.category || ''} 
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Promoção">Promoção</SelectItem>
                      <SelectItem value="Sazonal">Sazonal</SelectItem>
                      <SelectItem value="Comemorativo">Comemorativo</SelectItem>
                      <SelectItem value="Mensal">Mensal</SelectItem>
                      <SelectItem value="Especial">Especial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  placeholder="Descreva o propósito deste template..."
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="width">Largura (px)</Label>
                  <Input
                    id="width"
                    name="width"
                    type="number"
                    value={formData.dimensions?.width || 800}
                    onChange={handleDimensionChange}
                    min={100}
                    max={2000}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (px)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    value={formData.dimensions?.height || 1200}
                    onChange={handleDimensionChange}
                    min={100}
                    max={3000}
                  />
                </div>
              </div>
              
              {/* Outros campos podem ser adicionados aqui */}
            </div>
          </Card>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="w-full md:w-auto"
              disabled={loading}
            >
              <Save className="mr-2 h-4 w-4" />
              {loading ? (
                <span className="inline-flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Salvando...
                </span>
              ) : (
                <span>{isEditMode ? 'Salvar Alterações' : 'Criar Template'}</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default NovoTemplate;
