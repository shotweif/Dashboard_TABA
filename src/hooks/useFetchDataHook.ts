import { useEffect, useState } from "react";
import { DataStructure } from "../types/information";

const useFetchTransactions = (initialSelectedDate: string, endSelectedDate:string) => {
  const [info, setInfo] = useState<DataStructure | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch('https://UIOMATRV-DVOP02.corp.gfp.com/ServiciosBackPR/api/Reportes/RequestValuesReporteCanales', {
          headers: new Headers({ 'accept': '*/*', 'fechaInicio': initialSelectedDate, 'fechaFin': endSelectedDate }),
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
  }, [initialSelectedDate, endSelectedDate]);

  return { info, loading, error };
};

export default useFetchTransactions;
