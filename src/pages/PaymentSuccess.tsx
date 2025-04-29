
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import { toast } from "sonner";
import { SubscriptionContext } from '@/App';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { refreshSubscription } = useContext(SubscriptionContext);
  
  useEffect(() => {
    // Atualizar o estado da assinatura
    refreshSubscription();
    
    // Exibir notificação de sucesso
    toast.success("Pagamento confirmado!", {
      description: "Sua assinatura foi ativada com sucesso."
    });
  }, [refreshSubscription]);
  
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-heading font-bold mb-4 text-center">Pagamento Confirmado!</h1>
        
        <p className="text-center text-muted-foreground max-w-md mb-8">
          Seu pagamento foi processado com sucesso e sua assinatura está ativa. 
          Agora você tem acesso a todos os recursos do seu plano.
        </p>
        
        <div className="space-y-4 w-full max-w-md">
          <Button 
            className="w-full" 
            onClick={() => navigate('/dashboard')}
          >
            Ir para o Dashboard
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => navigate('/configuracoes')}
          >
            Ver detalhes da assinatura
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default PaymentSuccess;
