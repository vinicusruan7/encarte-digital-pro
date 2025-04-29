
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import TemplateDetails from "./pages/TemplateDetails";
import NovoTemplate from "./pages/NovoTemplate";
import Produtos from "./pages/Produtos";
import NovoEncarte from "./pages/NovoEncarte";
import BancoImagens from "./pages/BancoImagens";
import Encartes from "./pages/Encartes";
import Configuracoes from "./pages/Configuracoes";
import Planos from "./pages/Planos";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";

const queryClient = new QueryClient();

// Contexto para gerenciar informações de assinatura
export const SubscriptionContext = createContext<{
  isSubscribed: boolean;
  plan: string | null;
  expiresAt: Date | null;
  refreshSubscription: () => void;
}>({
  isSubscribed: false,
  plan: null,
  expiresAt: null,
  refreshSubscription: () => {}
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionState, setSubscriptionState] = useState({
    isSubscribed: false,
    plan: null,
    expiresAt: null
  });

  // Função para atualizar informações de assinatura
  const refreshSubscription = () => {
    // Aqui você chamaria a API para verificar o status da assinatura
    // Por enquanto, vamos apenas simular que o usuário está inscrito
    setSubscriptionState({
      isSubscribed: true,
      plan: "Business",
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias a partir de hoje
    });
  };

  // Simulação de carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Verificar assinatura ao iniciar
      refreshSubscription();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-md bg-primary-500 flex items-center justify-center">
            <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-heading font-bold">Encarte Digital Pro</h2>
          <p className="text-gray-500 mt-1">Carregando aplicação...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SubscriptionContext.Provider value={{
          ...subscriptionState,
          refreshSubscription
        }}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/templates/:id" element={<TemplateDetails />} />
              <Route path="/templates/novo" element={<NovoTemplate />} />
              <Route path="/templates/edit/:id" element={<NovoTemplate />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/encartes/novo" element={<NovoEncarte />} />
              <Route path="/imagens" element={<BancoImagens />} />
              <Route path="/encartes" element={<Encartes />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
              <Route path="/planos" element={<Planos />} />
              <Route path="/success" element={<PaymentSuccess />} />
              <Route path="/cancel" element={<PaymentCancel />} />
              {/* Rota de fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SubscriptionContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
