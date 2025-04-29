
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Image, Grid3X3, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NovoTemplate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(4);
  
  const handleSave = () => {
    if (!name) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, informe o nome do template.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Template criado",
      description: "O template foi criado com sucesso.",
    });

    // Simular redirecionamento para a página de templates
    setTimeout(() => {
      navigate('/templates');
    }, 1000);
  };

  const layoutPresets = [
    { cols: 2, rows: 2, name: '2×2' },
    { cols: 3, rows: 3, name: '3×3' },
    { cols: 3, rows: 4, name: '3×4' },
    { cols: 4, rows: 5, name: '4×5' },
    { cols: 2, rows: 3, name: '2×3' },
    { cols: 4, rows: 4, name: '4×4' },
  ];

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
            <h1 className="text-2xl md:text-3xl font-bold">Criar Novo Template</h1>
            <p className="text-gray-500 mt-1">Defina as características do seu template de encarte</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Nome do Template *
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Ofertas de Hortifruti"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-1">
                      Categoria
                    </label>
                    <Input
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Ex: Promoção, Alimentos, etc."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="columns" className="block text-sm font-medium mb-1">
                        Colunas
                      </label>
                      <Input
                        id="columns"
                        type="number"
                        min={1}
                        max={10}
                        value={columns}
                        onChange={(e) => setColumns(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label htmlFor="rows" className="block text-sm font-medium mb-1">
                        Linhas
                      </label>
                      <Input
                        id="rows"
                        type="number"
                        min={1}
                        max={10}
                        value={rows}
                        onChange={(e) => setRows(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-4">Layout do Template</h3>
                  <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                    <div 
                      className="grid gap-1 p-1 mx-auto"
                      style={{
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gridTemplateRows: `repeat(${rows}, 1fr)`,
                        width: 'fit-content'
                      }}
                    >
                      {Array(columns * rows).fill(null).map((_, index) => (
                        <div 
                          key={index}
                          className="w-10 h-10 md:w-16 md:h-16 bg-white dark:bg-gray-700 border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-400 text-xs"
                        >
                          {index + 1}
                        </div>
                      ))}
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-4">
                      Layout de {columns}×{rows} ({columns * rows} células)
                    </p>
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
                  onClick={handleSave}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Template
                </Button>
                
                <Link to="/templates">
                  <Button variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Predefinições de Layout</h3>
                <div className="grid grid-cols-2 gap-3">
                  {layoutPresets.map((preset, index) => (
                    <button
                      key={index}
                      className={`p-3 border rounded-lg flex flex-col items-center transition-colors ${
                        columns === preset.cols && rows === preset.rows
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                      }`}
                      onClick={() => {
                        setColumns(preset.cols);
                        setRows(preset.rows);
                      }}
                    >
                      <Grid3X3 size={24} className="mb-1 text-gray-500" />
                      <span className="text-sm font-medium">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardContent className="p-6">
                <Tabs defaultValue="appearance">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="appearance">Aparência</TabsTrigger>
                    <TabsTrigger value="options">Opções</TabsTrigger>
                  </TabsList>
                  <TabsContent value="appearance" className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Cor de Fundo
                      </label>
                      <div className="flex gap-2">
                        {['#FFFFFF', '#F3F4F6', '#FEF2F2', '#EFF6FF', '#F0FDF4'].map((color) => (
                          <button
                            key={color}
                            className="w-8 h-8 rounded-full border"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Fonte do Título
                      </label>
                      <select className="w-full input-field">
                        <option>Padrão</option>
                        <option>Negrito</option>
                        <option>Serif</option>
                      </select>
                    </div>
                  </TabsContent>
                  <TabsContent value="options" className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        Mostrar preços antigos
                      </label>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        Mostrar categorias
                      </label>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        Bordas arredondadas
                      </label>
                      <input type="checkbox" defaultChecked />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NovoTemplate;
