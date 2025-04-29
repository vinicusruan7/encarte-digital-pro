
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  User, 
  Store, 
  CreditCard, 
  Bell, 
  Shield, 
  Save,
  Crown
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Configuracoes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('conta');
  
  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas configurações foram salvas com sucesso.",
    });
  };

  // Simular plano atual do usuário
  const planoAtual = {
    nome: 'Business',
    dataRenovacao: '15/05/2025',
    valor: 'R$ 69,90/mês'
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
            <Settings className="h-6 w-6" /> Configurações
          </h1>
          <p className="text-muted-foreground">Gerencie as configurações da sua conta e aplicação</p>
        </div>
        
        <Tabs defaultValue="conta" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-6">
            <TabsTrigger value="conta" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Conta
            </TabsTrigger>
            <TabsTrigger value="loja" className="flex items-center gap-2">
              <Store className="h-4 w-4" /> Loja
            </TabsTrigger>
            <TabsTrigger value="pagamentos" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> Pagamentos
            </TabsTrigger>
            <TabsTrigger value="assinatura" className="flex items-center gap-2">
              <Crown className="h-4 w-4" /> Assinatura
            </TabsTrigger>
            <TabsTrigger value="notificacoes" className="flex items-center gap-2">
              <Bell className="h-4 w-4" /> Notificações
            </TabsTrigger>
            <TabsTrigger value="seguranca" className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> Segurança
            </TabsTrigger>
          </TabsList>

          <TabsContent value="conta">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Conta</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais e credenciais de acesso
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome</Label>
                    <Input id="nome" placeholder="João Silva" defaultValue="João Silva" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="joao@exemplo.com" defaultValue="joao@exemplo.com" />
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Label htmlFor="senha-atual">Senha Atual</Label>
                  <Input id="senha-atual" type="password" placeholder="Digite sua senha atual" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nova-senha">Nova Senha</Label>
                    <Input id="nova-senha" type="password" placeholder="Digite sua nova senha" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                    <Input id="confirmar-senha" type="password" placeholder="Confirme sua nova senha" />
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loja">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Loja</CardTitle>
                <CardDescription>
                  Personalize as informações da sua loja
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome-loja">Nome da Loja</Label>
                  <Input id="nome-loja" placeholder="Minha Loja" defaultValue="Supermercado Economia" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="descricao-loja">Descrição</Label>
                  <Input id="descricao-loja" placeholder="Uma breve descrição da sua loja" defaultValue="Os melhores preços da cidade" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endereco-loja">Endereço</Label>
                  <Input id="endereco-loja" placeholder="Rua, Número, Cidade" defaultValue="Av. Principal, 123 - Centro" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telefone-loja">Telefone</Label>
                  <Input id="telefone-loja" placeholder="(99) 9999-9999" defaultValue="(11) 9999-9999" />
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pagamentos">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Pagamento</CardTitle>
                <CardDescription>
                  Gerencie suas formas de pagamento e assinatura
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Você está no plano Premium - R$ 49,90/mês</p>
                <p className="font-medium">Próxima cobrança: 15/05/2025</p>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted p-2 rounded">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Mastercard final 4589</p>
                        <p className="text-sm text-muted-foreground">Expira em 12/28</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Alterar</Button>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-end mt-4">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assinatura">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Assinatura</CardTitle>
                <CardDescription>
                  Visualize e altere seu plano atual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 bg-muted/40 p-6 rounded-lg border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <Crown className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Seu plano atual: {planoAtual.nome}</h3>
                      <p className="text-sm text-muted-foreground">Renovação automática em {planoAtual.dataRenovacao}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Valor</p>
                      <p className="text-2xl font-bold">{planoAtual.valor}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <Badge variant="success" className="mt-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Ativo</Badge>
                    </div>
                  </div>
                </div>

                <h3 className="font-medium text-lg mb-3">Recursos do seu plano</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Baixar encartes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Logomarcas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Baixar cartazes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Baixar vídeos (em produção)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Remover fundos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Acesso a formatos premium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Editar produtos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-muted-foreground">Editar cabeçalho</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <Button variant="outline" onClick={() => navigate('/planos')}>Ver todos os planos</Button>
                  <Button onClick={() => navigate('/planos')}>Mudar de plano</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notificacoes">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>
                  Defina quais notificações você deseja receber
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificações por email</p>
                    <p className="text-sm text-muted-foreground">Receba atualizações sobre sua conta</p>
                  </div>
                  <Switch defaultChecked id="email-notifs" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Atualizações de produtos</p>
                    <p className="text-sm text-muted-foreground">Receba notificações sobre novos recursos</p>
                  </div>
                  <Switch defaultChecked id="product-notifs" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Newsletter</p>
                    <p className="text-sm text-muted-foreground">Receba nossa newsletter mensal</p>
                  </div>
                  <Switch id="newsletter-notifs" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Ofertas e promoções</p>
                    <p className="text-sm text-muted-foreground">Receba ofertas especiais e promoções</p>
                  </div>
                  <Switch defaultChecked id="promo-notifs" />
                </div>
                <div className="flex justify-end mt-4">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seguranca">
            <Card>
              <CardHeader>
                <CardTitle>Segurança da Conta</CardTitle>
                <CardDescription>
                  Proteja sua conta com opções de segurança adicionais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Autenticação de dois fatores</p>
                    <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                  </div>
                  <Switch id="2fa" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificações de login</p>
                    <p className="text-sm text-muted-foreground">Receba alertas sobre novos logins</p>
                  </div>
                  <Switch defaultChecked id="login-alerts" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dispositivos conectados</p>
                    <p className="text-sm text-muted-foreground">Gerencie dispositivos que acessam sua conta</p>
                  </div>
                  <Button variant="outline" size="sm">Gerenciar</Button>
                </div>
                <div className="flex justify-end mt-4">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Configuracoes;
