import React, { useState, useEffect } from "react";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import DoughnutChart from "../components/DoughnutChart";
import LineChart from "../components/LineChart";
import DateFilter from "../components/DateFilter";
import UsersTransactions from "../components/UsersTransactions";
import useFetchTransactions from "../hooks/useFetchDataHook";
import { getHours, parseISO, format, subDays, startOfDay } from "date-fns";
import LoadingSpinner from "../components/LoadingSpinner";
import { EmptyData } from "../components/EmptyData";
import ErrorComponent from "../components/ErrorComponent";

const TransaccionesWEP: React.FC = () => {
  const PRODUBANCO = "PRODUBANCO";

  const yesterday = subDays(new Date(), 1);
  const formattedYesterday = format(startOfDay(yesterday), "dd/MM/yyyy");
  const today = format(startOfDay(new Date()), "dd/MM/yyyy");

  const [initialDate, setInitialDate] = useState<string>(formattedYesterday); // Fecha inicial
  const [endDate, setEndDate] = useState<string>(today); // Fecha final
  


  const { info, loading, error } = useFetchTransactions(initialDate, endDate);


  const handleFilterClick = (
    filterInitialDate: string,
    filterEndDate: string
  ) => {
    setInitialDate(filterInitialDate);
    setEndDate(filterEndDate);
  };
  const handleClearClick = (
    filterInitialDate: string,
    filterEndDate: string
  ) => {
    setInitialDate(filterInitialDate);
    setEndDate(filterEndDate);
  };

  if (loading) {
    return <LoadingSpinner />; // Display the spinner while loading
  }


  if (!info || error) {
    return <ErrorComponent></ErrorComponent>
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 ">
        <div className="bg-card col-span-1 flex h-12 pl-4 pointer-events-none select-none">
          <img
            src="https://www.produbanco.com.ec/media/712553/web.png?format=webp"
            alt=""
            className="h-full "
          />
        </div>
        <div className="bg-card col-span-3 flex h-12 items-center">
          <h2 className="text-3xl font-bold text-primary text-green-800 leading-10">
            Monitoreo de Transacciones WIP
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        <div className="bg-card h-96 p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 bg-green-700">
          <DateFilter onFilter={handleFilterClick} onClear={handleClearClick} />
        </div>
        <div className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-3 bg-white border-l-4 border-secondary bg-white border-green-400">
          {allTransactions.length === 0 ? (
            <EmptyData message="No existen datos de transacciones para las fechas seleccionadas" />
          ) : (
            <LineChart transaccionesTotales={counts} rangoTiempo={hours} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        <div className="bg-card h-full p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400">
          <UsersTransactions
            activeUsers={activeUsers}
            totalTransactions={totalTransactions}
          />
        </div>
        <div className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400">
        {allTransactions.length === 0 ? (
            <EmptyData message="No existen datos de transacciones para las fechas seleccionadas" />
          ) : (
            <BarChart
            transAceptada={receivedTransactions}
            transRechazada={rejectedTransactions}
          />
          )}
          
        </div>
        <div className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400">
        {allTransactions.length === 0 ? (
            <EmptyData message="No existen datos de transacciones para las fechas seleccionadas" />
          ) : (
            <PieChart
            locales={localTransactions}
            externos={externalTransactions}
          />
          )}
        </div>
        <div className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400">
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
