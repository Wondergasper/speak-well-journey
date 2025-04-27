
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the landing page
    navigate('/');
  }, [navigate]);

  return null; // This component will redirect and not render anything
};

export default Index;
