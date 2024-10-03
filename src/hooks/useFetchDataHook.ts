import { useEffect, useState } from "react";
import { DataStructure } from "../types/information";

const useFetchTransactions = (
  initialSelectedDate: string,
  endSelectedDate: string
) => {
  const [info, setInfo] = useState<DataStructure | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [emptyData, setEmptyData] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  
      setError(null);    
      setEmptyData(false);  

      try {
        const response = await fetch(
          "https://UIOMATRV-DVOP02.corp.gfp.com/ServiciosBackPR/api/Reportes/RequestValuesReporteCanales",
          {
            headers: new Headers({
              accept: "*/*",
              fechaInicio: initialSelectedDate,
              fechaFin: endSelectedDate,
            }),
            mode: "cors",
          }
        );

        // Validar si la respuesta tiene un estado exitoso
        if (!response.ok) {
          const errorMessage = `Error: ${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }

        // Verificar si el contenido de la respuesta no está vacío
        const responseText = await response.text();
        if (!responseText) {
          setEmptyData(true);
          return; // Terminar la función si no hay datos
        }

        // Intentar parsear la respuesta solo si tiene contenido
        let result: DataStructure;
        try {
          result = JSON.parse(responseText) as DataStructure;
        } catch (parsingError) {
          throw new Error("Error al parsear la respuesta JSON del servidor.");
        }

        setInfo(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Ocurrió un error desconocido.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialSelectedDate, endSelectedDate]);

  return { info, loading, error, emptyData };
};

export default useFetchTransactions;
