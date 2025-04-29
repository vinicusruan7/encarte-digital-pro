
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Plus, Filter, Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SearchInput } from '@/components/ui/search-input';

// Tipos
interface Template {
  id: number;
  name: string;
  thumbnail: string;
  category: string;
  lastUsed: string | null;
}

// Categorias de templates com suas imagens
const templateCategories = [
  {
    id: 'fecha-mes',
    title: 'Fecha Mês',
    templates: [
      { 
        id: 1, 
        name: 'Semana Fecha Mês', 
        thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', 
        category: 'Promoção',
        lastUsed: '15/04/2025'
      },
      { 
        id: 2, 
        name: 'Fecha Mês Geral', 
        thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7', 
        category: 'Promoção', 
        lastUsed: '10/04/2025'
      },
    ]
  },
  {
    id: 'outono',
    title: 'Outono',
    templates: [
      { 
        id: 3, 
        name: 'Outono dos Preços Baixos', 
        thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475', 
        category: 'Sazonal', 
        lastUsed: '05/04/2025'
      },
      { 
        id: 4, 
        name: 'Outono Imbatível', 
        thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7', 
        category: 'Sazonal', 
        lastUsed: null
      },
    ]
  },
  {
    id: 'dia-das-maes',
    title: 'Dia das mães',
    templates: [
      { 
        id: 5, 
        name: 'Mês das Mães', 
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', 
        category: 'Comemorativo', 
        lastUsed: null
      },
      { 
        id: 6, 
        name: 'Especial das Mães', 
        thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', 
        category: 'Comemorativo', 
        lastUsed: null
      },
    ]
  },
  {
    id: 'abril',
    title: 'Abril',
    templates: [
      { 
        id: 7, 
        name: 'Abril com Descontos', 
        thumbnail: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb', 
        category: 'Mensal', 
        lastUsed: null
      },
      { 
        id: 8, 
        name: 'Super Abril', 
        thumbnail: 'https://images.unsplash.com/photo-1472396961693-142e6e269027', 
        category: 'Mensal', 
        lastUsed: null
      },
    ]
  },
];

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Obter todas as categorias únicas de todos os templates para filtros
  const allCategories = Array.from(new Set(
    templateCategories.flatMap(category => 
      category.templates.map(template => template.category)
    )
  ));
  
  // Filtrar templates baseado na pesquisa e categoria ativa
  const getFilteredTemplates = (templates: Template[]) => {
    return templates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !activeCategory || template.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  };
  
  // Verifica se há templates para exibir após os filtros
  const hasTemplatesAfterFilter = templateCategories.some(category => 
    getFilteredTemplates(category.templates).length > 0
  );

  // Função para renderizar a imagem do cabeçalho da categoria importada
  const getCategoryHeaderImage = (categoryId: string) => {
    const imageMapping: Record<string, string> = {
      'fecha-mes': 'public/lovable-uploads/8c4d90b5-8411-4da1-8677-ac5ee3ec119e.png',
      'outono': 'public/lovable-uploads/8c4d90b5-8411-4da1-8677-ac5ee3ec119e.png',
      'dia-das-maes': 'public/lovable-uploads/8c4d90b5-8411-4da1-8677-ac5ee3ec119e.png',
      'abril': 'public/lovable-uploads/8c4d90b5-8411-4da1-8677-ac5ee3ec119e.png'
    };
    
    return imageMapping[categoryId] || null;
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark dark:text-white">Templates</h1>
            <p className="text-gray-500 mt-1">Gerencie e crie modelos para seus encartes</p>
          </div>
          <Link to="/templates/novo">
            <Button className="btn-primary">
              <Plus size={20} className="mr-2" /> Novo Template
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-80">
            <SearchInput
              type="search"
              placeholder="Buscar templates..."
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
            {allCategories.map(category => (
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

        {hasTemplatesAfterFilter ? (
          <div className="space-y-8">
            {templateCategories.map(category => {
              const filteredTemplates = getFilteredTemplates(category.templates);
              
              if (filteredTemplates.length === 0) return null;
              
              return (
                <div key={category.id} className="animate-fade-in">
                  {/* Cabeçalho da categoria com estilo similar à imagem */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{category.title}</h2>
                    <Link to={`/templates?category=${category.id}`} className="text-emerald-500 font-medium flex items-center hover:underline">
                      Ver mais <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  {/* Templates baseados na imagem compartilhada */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredTemplates.map(template => {
                      // Estilo para cada categoria
                      const categoryStyles: Record<string, { bg: string, textColor: string }> = {
                        'fecha-mes': { 
                          bg: 'bg-yellow-500', 
                          textColor: 'text-black' 
                        },
                        'outono': { 
                          bg: 'bg-orange-500', 
                          textColor: 'text-white' 
                        },
                        'dia-das-maes': { 
                          bg: 'bg-pink-500', 
                          textColor: 'text-white' 
                        },
                        'abril': { 
                          bg: 'bg-red-500', 
                          textColor: 'text-white'  
                        },
                      };
                      
                      const style = categoryStyles[category.id] || { bg: 'bg-gray-500', textColor: 'text-white' };
                      
                      return (
                        <Link 
                          to={`/templates/${template.id}`} 
                          key={template.id}
                          className="relative overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300 border"
                        >
                          <div className={`${style.bg} w-full aspect-[21/9] relative overflow-hidden`}>
                            <div className="absolute inset-0 flex items-center p-4">
                              {/* Template específico baseado na imagem */}
                              <div className="flex items-center gap-4 w-full">
                                {/* Pessoa na imagem */}
                                <div className="flex-shrink-0 w-1/3">
                                  <img 
                                    src={template.thumbnail} 
                                    alt=""
                                    className="w-full h-full object-cover rounded"
                                  />
                                </div>
                                
                                {/* Texto do template */}
                                <div className={`flex-grow ${style.textColor} font-bold`}>
                                  <h3 className="text-2xl uppercase drop-shadow-md">
                                    {template.name.split(' ')[0]}
                                  </h3>
                                  <p className="text-sm uppercase">
                                    {template.name.split(' ').slice(1).join(' ')}
                                  </p>
                                </div>
                                
                                {/* Área para produto/conteúdo */}
                                <div className="w-1/4 aspect-square bg-white rounded shadow-md">
                                  {/* Espaço para produto */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 bg-white dark:bg-gray-800">
                            <h3 className="font-medium">{template.name}</h3>
                            <p className="text-xs text-gray-500">
                              {template.category}
                              {template.lastUsed && ` • Último uso: ${template.lastUsed}`}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Cartão para adicionar novo template */}
            <Link 
              to="/templates/novo"
              className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center aspect-[4/3] bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mt-4"
            >
              <div className="text-center p-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <Plus size={24} className="text-primary-500" />
                </div>
                <p className="mt-2 font-medium">Criar Template</p>
              </div>
            </Link>
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Nenhum template encontrado</h3>
            <p className="text-gray-500 mt-2">
              Tente ajustar os filtros ou criar um novo template.
            </p>
            <Link to="/templates/novo" className="mt-4 inline-block">
              <Button className="btn-primary">
                <Plus size={16} className="mr-2" /> Novo Template
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default Templates;
