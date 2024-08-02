import { useEffect, useState } from "react";
import { DataStructure } from "../types/information";

const useFetchTransactions = (url: string) => {
    const [info, setInfo] = useState<DataStructure | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url, {
            mode: 'cors',
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result: DataStructure = await response.json();
          setInfo(result);
        } catch (error) {
            if(error instanceof Error) {

          setError(error.message);
            }
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url]);
  
    return { info, loading, error };
  };
  
  export default useFetchTransactions;