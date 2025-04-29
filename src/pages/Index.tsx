
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  // Redirecionar para a página de login ao acessar o index
  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Index;
