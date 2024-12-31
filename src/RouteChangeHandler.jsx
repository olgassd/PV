import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteChangeHandler = ({ setLoading }) => {
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer); 
  }, [location, setLoading]);

  return null; 
};

export default RouteChangeHandler;
