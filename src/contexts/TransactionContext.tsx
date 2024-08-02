import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DataStructure } from '../types/information';


interface TransactionsContextProps {
  info: DataStructure | null;
  loading: boolean;
  error: string | null;
}

const TransactionsContext = createContext<TransactionsContextProps | undefined>(undefined);

export const TransactionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [info, setInfo] = useState<DataStructure | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://172.24.11.42/ServiciosBackPR/api/Reportes/RequestValuesReporteCanales', {
          mode: 'cors',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: DataStructure = await response.json();
        setInfo(result);
      } catch (error) {
        if (error instanceof Error){
        setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <TransactionsContext.Provider value={{ info, loading, error }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
};
