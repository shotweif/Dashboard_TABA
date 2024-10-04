import React from "react";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import DoughnutChart from "../components/DoughnutChart";
import LineChart from "../components/LineChart";
import UsersTransactions from "../components/UsersTransactions";
import useFetchTransactions from "../hooks/useFectchFake";
import { getHours, parseISO, format, subDays, startOfDay } from "date-fns";
import LoadingSpinner from "../components/LoadingSpinner";
import { EmptyData } from "../components/EmptyData";
import ErrorComponent from "../components/ErrorComponent";

interface TransaccionesWEPProps {
  initialDate: string;
  endDate: string;
}

const TransaccionesWEP: React.FC<TransaccionesWEPProps> = ({
  initialDate,
  endDate,
}) => {
  const PRODUBANCO = "PRODUBANCO";

  const { info, loading, error, emptyData } = useFetchTransactions(
    initialDate,
    endDate
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  const allTransactions = [
    ...info.ResultadosReporteCanalesWip,
    ...info.ResultadosReporteCanalesWipHis,
  ];

  // Grafico de lineas
  const transactionsByHour: { [key: number]: number } = {};
  allTransactions!.forEach((transaction) => {
    const hour = getHours(parseISO(transaction.FechaTrx));
    if (!transactionsByHour[hour]) {
      transactionsByHour[hour] = 0;
    }
    transactionsByHour[hour]++;
  });

  const hours = Object.keys(transactionsByHour).map((hour) => parseInt(hour));
  const counts = Object.values(transactionsByHour);

  // Lista de transacciones
  const totalTransactions = allTransactions ? allTransactions.length : 0;

  // Grafico de barras
  const receivedTransactions = allTransactions.filter(
    (transaction) => transaction.CodRespuesta === "100000"
  );

  const rejectedTransactions = allTransactions.filter(
    (transaction) => transaction.CodRespuesta !== "100000"
  );

  // Grafico Pastel
  const localTransactions = allTransactions.filter(
    (transaction) =>
      transaction.BancoOrigen === PRODUBANCO &&
      transaction.BancoDestino === PRODUBANCO
  );

  const externalTransactions =
    allTransactions.length - localTransactions.length;

  // Grafico de anillo
  const activeUsers = info.ClientesAtados.CantidadAfiliados ?? 0;
  const inactiveUsers = info.ClientesAtados.CantidadNoAfiliados ?? 0;

  return (
    <div className="p-4">
      {/* Line Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 "style={{ height: 'auto' }}>
        <div className=" bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-3  bg-white  bg-white" style={{ borderLeft: '4px solid #78BE20', paddingLeft: '10px', height: '250px' }}>
          {allTransactions.length === 0 || emptyData ? (
            <EmptyData message="No existen datos de transacciones para las fechas seleccionadas" />
          ) : (
            <LineChart transaccionesTotales={counts} rangoTiempo={hours} />
          )}
        </div>
        <div className=" bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1  bg-white " style={{ borderLeft: '4px solid #78BE20', paddingLeft: '10px', height: '250px' }}>
          <UsersTransactions
            activeUsers={activeUsers}
            totalTransactions={totalTransactions}
          />
        </div>
      </div>

      {/* Other Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      <div
  className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-2  bg-white"
  style={{
    height: "387px", borderLeft: '4px solid #78BE20', paddingLeft: '10px', // Altura del contenedor principal
  }}
>
  {allTransactions.length === 0 || emptyData ? (
    <EmptyData message="No existen datos de transacciones para las fechas seleccionadas" />
  ) : (
    <div className="h-full"> {/* Asegúrate de que el div use toda la altura disponible */}
      <BarChart
        transAceptada={receivedTransactions}
        transRechazada={rejectedTransactions}
      />
    </div>
  )}
</div>

        <div
          className=" p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1  bg-white "
          style={{ height: "100%", borderLeft: '4px solid #78BE20', paddingLeft: '10px' }}
        >
          {allTransactions.length === 0 || emptyData ? (
            <EmptyData message="No existen datos de transacciones para las fechas seleccionadas" />
          ) : (
            <PieChart
              locales={localTransactions}
              externos={externalTransactions}
            />
          )}
        </div>
        <div className=" bg-white p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1  "style={{ borderLeft: '4px solid #78BE20', paddingLeft: '10px' }}>
          <DoughnutChart
            clientesActivos={activeUsers}
            clientesInactivos={inactiveUsers}
          />
        </div>
      </div>
    </div>
  );
};

export default TransaccionesWEP;
