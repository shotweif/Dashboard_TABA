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
      const date = new Date(Date.now()).toISOString()
      console.log(date)
      try {
        const response = await fetch('https://UIOMATRV-DVOP02.corp.gfp.com/ServiciosBackPR/api/Reportes/RequestValuesReporteCanales', {
          method: "GET",
          headers: new Headers({'accept': '*/*','fechaconsulta':date}),
          mode: 'cors'
        });

        // clearTimeout(timeoutId);
        
        if (!response.ok) {
          const errorMessage = `Error: ${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }
        const result: DataStructure = await response.json();
        console.log(result)
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
