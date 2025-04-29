
import { useState, useEffect } from 'react';
import { checkSubscriptionStatus } from '@/services/mercadoPago';

// Tipo para o estado da assinatura
interface SubscriptionState {
  isActive: boolean;
  plan: string | null;
  expiresAt: Date | null;
  isLoading: boolean;
  error: string | null;
}

// Hook personalizado para gerenciar o estado da assinatura
export const useSubscription = (userId?: string) => {
  const [subscription, setSubscription] = useState<SubscriptionState>({
    isActive: false,
    plan: null,
    expiresAt: null,
    isLoading: true,
    error: null
  });

  const checkStatus = async () => {
    if (!userId) {
      setSubscription(prev => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      setSubscription(prev => ({ ...prev, isLoading: true, error: null }));
      const result = await checkSubscriptionStatus(userId);
      
      setSubscription({
        isActive: result.active,
        plan: result.plan || null,
        expiresAt: result.expiresAt || null,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setSubscription({
        isActive: false,
        plan: null,
        expiresAt: null,
        isLoading: false,
        error: 'Falha ao verificar o status da assinatura'
      });
    }
  };

  // Verificar o status da assinatura ao montar o componente ou quando o userId mudar
  useEffect(() => {
    checkStatus();
  }, [userId]);

  // Retornar o estado da assinatura e métodos para atualizá-la
  return {
    ...subscription,
    refreshStatus: checkStatus
  };
};
