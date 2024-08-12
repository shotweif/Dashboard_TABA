import { useEffect, useState } from "react";
import { DataStructure } from "../types/information";

const useFetchTransactions = (selectedDate: string) => {
  const [info, setInfo] = useState<DataStructure | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date(selectedDate).toISOString();
      try {
        const response = await fetch('https://UIOMATRV-DVOP02.corp.gfp.com/ServiciosBackPR/api/Reportes/RequestValuesReporteCanales', {
          headers: new Headers({ 'accept': '*/*', 'fechaconsulta': selectedDate }),
          mode: 'cors'
        });

        if (!response.ok) {
          const errorMessage = `Error: ${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }
        const result: DataStructure = await response.json();
        setInfo(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate]);

  return { info, loading, error };
};

export default useFetchTransactions;
