
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Crown, Flame } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { createMercadoPagoCheckout } from '@/services/mercadoPago';

const Planos = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [faturamento, setFaturamento] = useState<'mensal' | 'anual'>('mensal');
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAssinar = async (plano: string, preco: number) => {
    setIsLoading(true);
    try {
      // Chamar a função para criar um checkout do Mercado Pago
      const checkoutUrl = await createMercadoPagoCheckout({
        plan: plano,
        period: faturamento,
        amount: preco
      });
      
      // Redirecionar o usuário para a URL de checkout do Mercado Pago
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error('Não foi possível criar o checkout');
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      toast({
        title: 'Erro ao processar pagamento',
        description: 'Ocorreu um erro ao tentar processar seu pagamento. Tente novamente mais tarde.',
        variant: 'destructive'
      });
      setShowUpgradeDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  const Feature = ({ available, text }: { available: boolean; text: string }) => (
    <div className="flex items-center gap-2 py-1.5">
      {available ? 
        <Check className="h-5 w-5 flex-shrink-0 text-emerald-500" /> : 
        <X className="h-5 w-5 flex-shrink-0 text-red-500" />}
      <span className={available ? "" : "text-muted-foreground"}>{text}</span>
    </div>
  );

  const planosInfo = {
    mensal: [
      {
        nome: 'Starter',
        preco: 59,
        precoAnual: 708,
        features: [
          { text: 'Baixar encartes', available: true },
          { text: 'Logomarcas', available: true },
          { text: 'Baixar cartazes', available: false },
          { text: 'Baixar vídeos (em produção)', available: false },
          { text: 'Remover fundos', available: false },
          { text: 'Acesso a formatos premium', available: false },
          { text: 'Editar produtos', available: false },
          { text: 'Editar cabeçalho', available: false },
          { text: 'Redes sociais (em produção)', available: false },
        ]
      },
      {
        nome: 'Business',
        preco: 69,
        precoAnual: 828,
        popular: true,
        features: [
          { text: 'Baixar encartes', available: true },
          { text: 'Logomarcas', available: true },
          { text: 'Baixar cartazes', available: true },
          { text: 'Baixar vídeos (em produção)', available: true },
          { text: 'Remover fundos', available: true },
          { text: 'Acesso a formatos premium', available: true },
          { text: 'Editar produtos', available: true },
          { text: 'Editar cabeçalho', available: false },
          { text: 'Redes sociais (em produção)', available: false },
        ]
      },
      {
        nome: 'Pro',
        preco: 99,
        precoAnual: 1188,
        features: [
          { text: 'Baixar encartes', available: true },
          { text: 'Logomarcas', available: true },
          { text: 'Baixar cartazes', available: true },
          { text: 'Baixar vídeos (em produção)', available: true },
          { text: 'Remover fundos', available: true },
          { text: 'Acesso a formatos premium', available: true },
          { text: 'Editar produtos', available: true },
          { text: 'Editar cabeçalho', available: true },
          { text: 'Redes sociais (em produção)', available: true },
        ]
      }
    ],
    anual: [
      {
        nome: 'Starter',
        preco: 59 * 0.9,
        precoAnual: 708 * 0.9,
        features: [
          { text: 'Baixar encartes', available: true },
          { text: 'Logomarcas', available: true },
          { text: 'Baixar cartazes', available: false },
          { text: 'Baixar vídeos (em produção)', available: false },
          { text: 'Remover fundos', available: false },
          { text: 'Acesso a formatos premium', available: false },
          { text: 'Editar produtos', available: false },
          { text: 'Editar cabeçalho', available: false },
          { text: 'Redes sociais (em produção)', available: false },
        ]
      },
      {
        nome: 'Business',
        preco: 69 * 0.72,
        precoAnual: 828 * 0.72,
        popular: true,
        features: [
          { text: 'Baixar encartes', available: true },
          { text: 'Logomarcas', available: true },
          { text: 'Baixar cartazes', available: true },
          { text: 'Baixar vídeos (em produção)', available: true },
          { text: 'Remover fundos', available: true },
          { text: 'Acesso a formatos premium', available: true },
          { text: 'Editar produtos', available: true },
          { text: 'Editar cabeçalho', available: false },
          { text: 'Redes sociais (em produção)', available: false },
        ]
      },
      {
        nome: 'Pro',
        preco: 99 * 0.72,
        precoAnual: 1188 * 0.72,
        features: [
          { text: 'Baixar encartes', available: true },
          { text: 'Logomarcas', available: true },
          { text: 'Baixar cartazes', available: true },
          { text: 'Baixar vídeos (em produção)', available: true },
          { text: 'Remover fundos', available: true },
          { text: 'Acesso a formatos premium', available: true },
          { text: 'Editar produtos', available: true },
          { text: 'Editar cabeçalho', available: true },
          { text: 'Redes sociais (em produção)', available: true },
        ]
      }
    ]
  };

  const planos = planosInfo[faturamento];

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold mb-2">Planos e Preços</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano perfeito para o seu negócio. Tenha acesso a todos os recursos necessários para criar encartes impactantes.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <Tabs
            value={faturamento}
            onValueChange={(value) => setFaturamento(value as 'mensal' | 'anual')}
            className="bg-muted/30 p-1 rounded-lg"
          >
            <TabsList className="grid grid-cols-2 w-80">
              <TabsTrigger value="mensal">Mensal</TabsTrigger>
              <TabsTrigger value="anual">
                <div className="flex items-center gap-2">
                  Anual <Badge variant="secondary" className="bg-orange-100 text-orange-600 font-normal">28% desconto</Badge>
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planos.map((plano) => (
            <Card key={plano.nome} className={`flex flex-col overflow-hidden ${plano.popular ? 'border-2 border-emerald-500 relative' : ''}`}>
              {plano.popular && (
                <div className="absolute top-0 right-0 left-0 bg-emerald-500 text-white py-1 px-4 text-center text-sm flex justify-center items-center gap-1.5">
                  <Flame className="h-4 w-4" /> Mais escolhido
                </div>
              )}
              <CardHeader className={`${plano.popular ? 'pt-10' : ''}`}>
                <h3 className="text-xl font-medium text-center">Plano {plano.nome}</h3>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <div className="text-center mb-6">
                  <p className="text-5xl font-bold">
                    R$ {Math.round(plano.preco)}
                    <span className="text-base font-normal text-muted-foreground">/Mês</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    R$ {Math.round(plano.precoAnual)} /Ano
                  </p>
                </div>
                <div className="space-y-1">
                  {plano.features.map((feature, idx) => (
                    <Feature 
                      key={`${plano.nome}-${idx}`} 
                      available={feature.available} 
                      text={feature.text} 
                    />
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full mt-4 py-6"
                  variant={plano.popular ? "default" : "outline"}
                  onClick={() => handleAssinar(plano.nome, plano.preco)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processando...' : 'Assinar com Mercado Pago'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto bg-orange-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
              <Crown className="h-10 w-10 text-orange-500" />
            </div>
            <DialogTitle className="text-xl">Habilite baixar no plano premium!</DialogTitle>
            <DialogDescription className="pt-4 text-base">
              Para poder baixar é necessário ter uma assinatura ativa. Clique abaixo para ver nossos planos!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center sm:justify-center mt-2">
            <Button className="w-full" onClick={() => setShowUpgradeDialog(false)}>
              Comparar planos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Planos;
