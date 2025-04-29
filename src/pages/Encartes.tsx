
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Plus, 
  Search, 
  Calendar, 
  Filter, 
  ArrowUpDown 
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Encartes = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for encartes
  const encartesList = [
    { id: 1, title: 'Encarte Ofertas de Verão', status: 'Publicado', date: '15/01/2025', items: 24 },
    { id: 2, title: 'Promoções Semanais', status: 'Rascunho', date: '22/01/2025', items: 16 },
    { id: 3, title: 'Especial Fim de Semana', status: 'Publicado', date: '10/02/2025', items: 12 },
    { id: 4, title: 'Black Friday Antecipada', status: 'Agendado', date: '01/03/2025', items: 36 },
    { id: 5, title: 'Ofertas de Páscoa', status: 'Rascunho', date: '12/03/2025', items: 18 },
  ];
  
  const filteredEncartes = encartesList.filter(encarte => 
    encarte.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper function to get the appropriate badge variant
  const getBadgeVariant = (status) => {
    switch(status) {
      case 'Publicado': return 'default';
      case 'Agendado': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Encartes</h1>
            <p className="text-muted-foreground">Gerencie os encartes da sua loja</p>
          </div>
          <Button onClick={() => navigate('/encartes/novo')} className="shrink-0">
            <Plus className="mr-2 h-4 w-4" /> Novo Encarte
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Todos os Encartes</CardTitle>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar encartes..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 p-4 bg-muted/50 text-sm font-medium">
                <div className="col-span-5 flex items-center gap-2">
                  Nome <ArrowUpDown className="h-4 w-4" />
                </div>
                <div className="col-span-2 hidden sm:flex items-center gap-2">
                  Status
                </div>
                <div className="col-span-2 hidden md:flex items-center gap-2">
                  Data
                </div>
                <div className="col-span-1 hidden lg:flex items-center gap-2">
                  Itens
                </div>
                <div className="col-span-7 sm:col-span-5 lg:col-span-2 flex justify-end"></div>
              </div>
              
              <div className="divide-y">
                {filteredEncartes.length > 0 ? (
                  filteredEncartes.map((encarte) => (
                    <div key={encarte.id} className="grid grid-cols-12 p-4 items-center">
                      <div className="col-span-5 flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted/80 rounded-md flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary-500" />
                        </div>
                        <div className="font-medium truncate">{encarte.title}</div>
                      </div>
                      <div className="col-span-2 hidden sm:block">
                        <Badge variant={getBadgeVariant(encarte.status)}>
                          {encarte.status}
                        </Badge>
                      </div>
                      <div className="col-span-2 hidden md:flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{encarte.date}</span>
                      </div>
                      <div className="col-span-1 hidden lg:block text-sm">
                        {encarte.items} itens
                      </div>
                      <div className="col-span-7 sm:col-span-5 lg:col-span-2 flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/encartes/${encarte.id}`)}
                        >
                          Visualizar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/encartes/edit/${encarte.id}`)}
                        >
                          Editar
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-medium text-lg mb-1">Nenhum encarte encontrado</h3>
                    <p className="text-muted-foreground mb-4">
                      Não há encartes que correspondam à sua pesquisa.
                    </p>
                    <Button onClick={() => setSearchQuery('')} variant="outline">
                      Limpar filtros
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Encartes;
