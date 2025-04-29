
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Plus, Filter, Search } from 'lucide-react';
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

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Templates simulados
  const templates: Template[] = [
    { 
      id: 1, 
      name: 'Ofertas Semanais', 
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', 
      category: 'Promoção',
      lastUsed: '15/04/2025'
    },
    { 
      id: 2, 
      name: 'Hortifruti', 
      thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7', 
      category: 'Alimentos', 
      lastUsed: '10/04/2025'
    },
    { 
      id: 3, 
      name: 'Açougue Premium', 
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', 
      category: 'Carnes', 
      lastUsed: '05/04/2025'
    },
    { 
      id: 4, 
      name: 'Bazar', 
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475', 
      category: 'Utensílios', 
      lastUsed: null
    },
    { 
      id: 5, 
      name: 'Bebidas & Destilados', 
      thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7', 
      category: 'Bebidas', 
      lastUsed: null
    },
    { 
      id: 6, 
      name: 'Produtos de Limpeza', 
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', 
      category: 'Limpeza', 
      lastUsed: null
    },
  ];

  // Filtrar templates por pesquisa e categoria
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !activeCategory || template.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Extrair categorias únicas
  const categories = Array.from(new Set(templates.map(t => t.category)));

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

        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTemplates.map(template => (
              <Link 
                to={`/templates/${template.id}`} 
                key={template.id}
                className="template-card animate-fade-in"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={template.thumbnail} 
                    alt={template.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-gray-900/70 text-white text-xs py-1 px-2 rounded">
                    {template.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{template.name}</h3>
                  {template.lastUsed && (
                    <p className="text-xs text-gray-500 mt-1">
                      Último uso: {template.lastUsed}
                    </p>
                  )}
                </div>
              </Link>
            ))}

            {/* Card para adicionar novo template */}
            <Link 
              to="/templates/novo"
              className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center aspect-[4/3] bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
