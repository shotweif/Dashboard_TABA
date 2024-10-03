import { useEffect, useState } from "react";
import { DataStructure } from "../types/information";

// Inicialización del objeto de tipo DataStructure
const initialDataStructure: DataStructure = {
  ResultadosReporteCanalesWip: [], // Array vacío de transacciones
  ResultadosReporteCanalesWipHis: [], // Array vacío de transacciones históricas
  ClientesAtados: {
    CantidadAfiliados: 0,
    CantidadNoAfiliados: 0,
  },
};
const useFetchTransactions = (
  initialSelectedDate: string,
  endSelectedDate: string
) => {
  const [info, setInfo] = useState<DataStructure>(initialDataStructure);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [emptyData, setEmptyData] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setEmptyData(false);

      try {
        const response = await fetch("http://localhost:3000/api/data", {
          headers: new Headers({
            accept: "*/*",
            fechaInicio: initialSelectedDate,
            fechaFin: endSelectedDate,
          }),
          mode: "cors",
        });

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
