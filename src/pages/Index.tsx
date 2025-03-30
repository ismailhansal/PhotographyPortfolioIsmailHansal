
import { useEffect } from 'react';
import Home from './Home';

const Index = () => {
  useEffect(() => {
    document.title = "Ismail Hansal | Photography Portfolio";
  }, []);

  return <Home />;
};

export default Index;
