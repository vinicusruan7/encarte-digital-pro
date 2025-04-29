
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { LayoutGrid, Package2, FileText, TrendingUp, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Chart } from '@/components/ui/chart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Dashboard = () => {
  // Dados simulados para os gráficos
  const chartData = [
    { name: 'Jan', value: 12 },
    { name: 'Fev', value: 19 },
    { name: 'Mar', value: 15 },
    { name: 'Abr', value: 27 },
    { name: 'Mai', value: 24 },
    { name: 'Jun', value: 30 },
    { name: 'Jul', value: 35 },
  ];

  // Cards de estatísticas
  const stats = [
    { title: 'Templates', value: '8', icon: LayoutGrid, color: 'bg-primary-500', path: '/templates' },
    { title: 'Produtos', value: '124', icon: Package2, color: 'bg-secondary-400', path: '/produtos' },
    { title: 'Encartes', value: '16', icon: FileText, color: 'bg-accent-400', path: '/encartes' },
  ];

  // Encartes recentes
  const recentFlyers = [
    { id: 1, title: 'Ofertas da Semana', date: '15/04/2025', status: 'Publicado' },
    { id: 2, title: 'Promoção de Hortifruti', date: '10/04/2025', status: 'Publicado' },
    { id: 3, title: 'Festival de Carnes', date: '05/04/2025', status: 'Rascunho' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-dark dark:text-white">Dashboard</h1>
          <p className="text-gray-500 mt-1">Bem-vindo ao seu painel de controle</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Link to={stat.path} key={index}>
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                    </div>
                    <div className={`${stat.color} p-3 rounded-md`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Encartes Publicados</CardTitle>
                <TrendingUp className="h-5 w-5 text-primary-500" />
              </div>
            </CardHeader>
            <CardContent className="h-80">
              <Chart
                data={chartData}
                categories={['value']}
                index="name"
                colors={['#2A9D8F']}
                valueFormatter={(value) => `${value}`}
                showLegend={false}
                showXAxis={true}
                showYAxis={true}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Encartes Recentes</CardTitle>
                <Bell className="h-5 w-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFlyers.map((flyer) => (
                  <div key={flyer.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{flyer.title}</p>
                      <p className="text-sm text-gray-500">{flyer.date}</p>
                    </div>
                    <span 
                      className={`text-xs px-2 py-1 rounded-full ${
                        flyer.status === 'Publicado' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {flyer.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link 
                  to="/encartes" 
                  className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                >
                  Ver todos os encartes
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/templates/novo" className="block">
                <div className="flex items-center p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <LayoutGrid className="h-5 w-5 text-primary-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Criar Template</h4>
                    <p className="text-sm text-gray-500">Adicione um novo modelo de encarte</p>
                  </div>
                </div>
              </Link>
              <Link to="/produtos/novo" className="block">
                <div className="flex items-center p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Package2 className="h-5 w-5 text-secondary-400 mr-3" />
                  <div>
                    <h4 className="font-medium">Adicionar Produto</h4>
                    <p className="text-sm text-gray-500">Cadastre um novo produto ao catálogo</p>
                  </div>
                </div>
              </Link>
              <Link to="/encartes/novo" className="block">
                <div className="flex items-center p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <FileText className="h-5 w-5 text-accent-400 mr-3" />
                  <div>
                    <h4 className="font-medium">Criar Encarte</h4>
                    <p className="text-sm text-gray-500">Comece a criar um novo encarte</p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Dicas Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-md">
                <h4 className="font-medium text-primary-700 dark:text-primary-300">Template First</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Comece escolhendo um template para seu encarte antes de adicionar produtos!
                </p>
              </div>
              <div className="p-4 bg-secondary-50 dark:bg-secondary-900/20 border border-secondary-100 dark:border-secondary-800 rounded-md">
                <h4 className="font-medium text-secondary-700 dark:text-secondary-300">Banco de Imagens</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Aproveite nosso banco de imagens para criar encartes mais atrativos.
                </p>
              </div>
              <div className="p-4 bg-accent-50 dark:bg-accent-900/20 border border-accent-100 dark:border-accent-800 rounded-md">
                <h4 className="font-medium text-accent-700 dark:text-accent-300">Informações de Contato</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Não esqueça de adicionar informações de contato da sua loja em cada encarte!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
