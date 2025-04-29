
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, Copy, FileText } from 'lucide-react';
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
}

const TemplateDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de busca de dados
    const fetchTemplate = () => {
      setLoading(true);
      
      // Simulação de dados do template
      const templateData: Template = {
        id: Number(id),
        name: id === '1' ? 'Ofertas Semanais' : `Template ${id}`,
        thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
        category: 'Promoção',
        lastUsed: '15/04/2025',
        description: 'Template para exibição das ofertas semanais da loja. Ideal para promoções relâmpago e divulgação de produtos em destaque.',
        dimensions: { width: 800, height: 1200 },
        dateCreated: '01/01/2025'
      };
      
      setTimeout(() => {
        setTemplate(templateData);
        setLoading(false);
      }, 500);
    };

    fetchTemplate();
  }, [id]);

  const handleCreateEncarte = () => {
    toast({
      title: "Encarte em criação",
      description: "Redirecionando para a página de criação de encarte com este template.",
    });
    navigate('/encartes/novo');
  };

  const handleDelete = () => {
    toast({
      title: "Template excluído",
      description: "O template foi excluído com sucesso.",
    });
    navigate('/templates');
  };

  const handleDuplicate = () => {
    toast({
      title: "Template duplicado",
      description: "Uma cópia do template foi criada.",
    });
  };

  if (loading) {
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

  if (!template) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Template não encontrado</h2>
          <p className="text-gray-500 mb-6">O template que você está procurando não existe ou foi removido.</p>
          <Link to="/templates">
            <Button>Voltar para Templates</Button>
          </Link>
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
            onClick={() => navigate('/templates')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{template.name}</h1>
            <p className="text-gray-500 mt-1">Categoria: {template.category}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {template.description || 'Nenhuma descrição disponível para este template.'}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Dimensões</p>
                    <p className="font-medium">{template.dimensions?.width || 800} x {template.dimensions?.height || 1200}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Criado em</p>
                    <p className="font-medium">{template.dateCreated || '01/01/2025'}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Último uso</p>
                    <p className="font-medium">{template.lastUsed || 'Nunca usado'}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">ID</p>
                    <p className="font-medium">#{template.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 space-y-4">
                <Button 
                  className="w-full bg-primary-500 hover:bg-primary-600"
                  onClick={handleCreateEncarte}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Criar Encarte com este Template
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(`/templates/edit/${template.id}`)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar Template
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleDuplicate}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicar Template
                </Button>
                
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir Template
                </Button>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">Templates relacionados</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/templates/2" className="block">
                  <div className="aspect-video rounded-md overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                      alt="Template relacionado" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="text-sm mt-1 font-medium truncate">Hortifruti</p>
                </Link>
                <Link to="/templates/3" className="block">
                  <div className="aspect-video rounded-md overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                      alt="Template relacionado" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="text-sm mt-1 font-medium truncate">Açougue Premium</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TemplateDetails;
