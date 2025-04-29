
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';

const PaymentCancel = () => {
  const navigate = useNavigate();
  
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-red-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6">
          <X className="h-10 w-10 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-heading font-bold mb-4 text-center">Pagamento Cancelado</h1>
        
        <p className="text-center text-muted-foreground max-w-md mb-8">
          O processo de pagamento foi cancelado. Nenhum valor foi cobrado.
          Se precisar de ajuda, entre em contato com nosso suporte.
        </p>
        
        <div className="space-y-4 w-full max-w-md">
          <Button 
            className="w-full" 
            onClick={() => navigate('/planos')}
          >
            Voltar para Planos
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => navigate('/dashboard')}
          >
            Ir para o Dashboard
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default PaymentCancel;
