
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Configuracoes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('conta');
  
  const handleSaveGeneralSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas configurações gerais foram atualizadas com sucesso.",
    });
  };
  
  const handleChangePassword = () => {
    toast({
      title: "Senha atualizada",
      description: "Sua senha foi alterada com sucesso.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Preferências de notificação atualizadas",
      description: "Suas preferências de notificação foram atualizadas com sucesso.",
    });
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-heading font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas configurações de conta e preferências.
          </p>
        </div>
        
        <Tabs defaultValue="conta" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="conta">Conta</TabsTrigger>
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="assinatura">
              Assinatura
              <Badge variant="secondary" className="ml-2">Pro</Badge>
            </TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          
          {/* Conta */}
          <TabsContent value="conta" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Informações Gerais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value="seu@email.com" readOnly />
                  <p className="text-sm text-muted-foreground">Seu email de login não pode ser alterado.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" placeholder="Seu nome" />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Alterar Senha</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="senha-atual">Senha Atual</Label>
                  <Input id="senha-atual" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nova-senha">Nova Senha</Label>
                  <Input id="nova-senha" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                  <Input id="confirmar-senha" type="password" />
                </div>
              </div>
              <Button variant="outline" onClick={handleChangePassword}>Alterar Senha</Button>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleSaveGeneralSettings}>Salvar Alterações</Button>
              <Button variant="destructive">Excluir Conta</Button>
            </div>
          </TabsContent>
          
          {/* Perfil */}
          <TabsContent value="perfil" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Informações do Perfil</h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome-empresa">Nome da Empresa</Label>
                  <Input id="nome-empresa" placeholder="Nome da sua empresa" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site">Site</Label>
                  <Input id="site" type="url" placeholder="https://seusite.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea id="descricao" placeholder="Descreva brevemente a sua empresa..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" placeholder="(XX) XXXXX-XXXX" />
                </div>
              </div>
              <Button>Salvar Informações do Perfil</Button>
            </div>
          </TabsContent>
          
          {/* Assinatura */}
          <TabsContent value="assinatura" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Seu Plano</h2>
                  <p className="text-muted-foreground">Gerencie sua assinatura</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Ativo</Badge>
              </div>
              
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Plano Pro</h3>
                    <p className="text-muted-foreground">Faturamento mensal - R$99/mês</p>
                  </div>
                  <Button variant="outline" onClick={() => navigate('/planos')}>
                    Alterar Plano
                  </Button>
                </div>
                
                <Separator className="my-4" />
                
                <h4 className="font-semibold mb-2">Recursos incluídos:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    <span>Baixar encartes</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    <span>Logomarcas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    <span>Baixar cartazes</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    <span>Baixar vídeos</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    <span>Remover fundos</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    <span>Acesso a formatos premium</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    <span>Editar produtos</span>
                  </li>
                  <li className="flex items-center">
                    <X className="mr-2 h-4 w-4 text-red-600" />
                    <span className="text-muted-foreground">Suporte prioritário</span>
                  </li>
                </ul>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Próximo pagamento</h4>
                    <p className="text-muted-foreground">24 de maio de 2023</p>
                  </div>
                  <Button variant="destructive" size="sm">Cancelar assinatura</Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Histórico de Pagamentos</h2>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="py-3 px-4 text-left font-medium">Data</th>
                      <th className="py-3 px-4 text-left font-medium">Valor</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Recibo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="py-3 px-4">24/04/2023</td>
                      <td className="py-3 px-4">R$99,00</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-green-50 text-green-700">Pago</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="link" className="p-0 h-auto">Ver recibo</Button>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-3 px-4">24/03/2023</td>
                      <td className="py-3 px-4">R$99,00</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-green-50 text-green-700">Pago</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="link" className="p-0 h-auto">Ver recibo</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          {/* Notificações */}
          <TabsContent value="notificacoes" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Preferências de Email</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing" className="font-medium">Emails de Marketing</Label>
                    <p className="text-sm text-muted-foreground">Receba ofertas especiais e novidades.</p>
                  </div>
                  <Switch id="marketing" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="atualizacoes" className="font-medium">Atualizações do Produto</Label>
                    <p className="text-sm text-muted-foreground">Saiba sobre novas funcionalidades.</p>
                  </div>
                  <Switch id="atualizacoes" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="seguranca" className="font-medium">Alertas de Segurança</Label>
                    <p className="text-sm text-muted-foreground">Informações importantes sobre sua conta.</p>
                  </div>
                  <Switch id="seguranca" defaultChecked />
                </div>
              </div>
              <Button onClick={handleSaveNotifications}>Salvar Preferências</Button>
            </div>
          </TabsContent>
          
          {/* API */}
          <TabsContent value="api" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Chaves de API</h2>
                  <p className="text-muted-foreground">Gerencie suas integrações.</p>
                </div>
                <Button>Gerar Nova Chave</Button>
              </div>
              
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Chave de Produção</h3>
                    <p className="text-muted-foreground">Use para integrações em produção.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Mostrar</Button>
                    <Button variant="outline" size="sm">Copiar</Button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Chave de Teste</h3>
                    <p className="text-muted-foreground">Use para testes de integração.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Mostrar</Button>
                    <Button variant="outline" size="sm">Copiar</Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded">
                <h4 className="font-medium">Webhooks</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Configure webhooks para receber notificações em tempo real.
                </p>
                <Button variant="outline" size="sm">Configurar Webhooks</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Configuracoes;
