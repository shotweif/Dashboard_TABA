// Inicio.tsx
import React, { useEffect } from 'react';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import DoughnutChart from '../components/DoughnutChart';
import LineChart from '../components/LineChart';
import DateFilter from '../components/DateFilter';
import UsersTransactions from '../components/UsersTransactions';
import useFetchTransactions from '../hooks/useFetchDataHook';
import { DataStructure } from '../types/information';
import fakeData from '../data/fakeData.json';
import { getHours, parseISO } from "date-fns";

const TransaccionesWEP: React.FC = () => {
    const PRODUBANCO = 'PRODUBANCO';
    const info: DataStructure = fakeData;
   // const { info, loading, error } = useFetchTransactions();

    // Grafico de lineas
   

    const transactionsByHour: { [key: number]: number } = {};
    console.log(info)
    info!.ResultadosReporteCanalesWip.forEach((transaction) => {
      const hour = getHours(parseISO(transaction.FechaTrx));
      if (!transactionsByHour[hour]) {
        transactionsByHour[hour] = 0;
      }
      transactionsByHour[hour]++;
    });
  
    const hours = Object.keys(transactionsByHour).map((hour) => parseInt(hour));
  
    const counts = Object.values(transactionsByHour);
    
    // Lista de transacciones

    const totalTransactions = 1768;
    const historicalTotal = 1000768;

    // Grafico de barras
    const receivedTransactions = info!.ResultadosReporteCanalesWip.filter(
        transaction => transaction.CodRespuesta === '100000'
      );
    
      // Filtrar las transacciones rechazadas (asumiendo que CodRespuesta diferente a '100000' es rechazada)
      const rejectedTransactions = info!.ResultadosReporteCanalesWip.filter(
        transaction => transaction.CodRespuesta !== '100000'
      );
    // Grafico Pastel
    const localTransactions = info!.ResultadosReporteCanalesWip.filter(
        transaction => transaction.BancoOrigen === PRODUBANCO && transaction.BancoDestino === PRODUBANCO
      );
    
      const externalTransactions = info!.ResultadosReporteCanalesWip.length - localTransactions.length;

    // Grafico de anillo
    const desertionAverage = info!.ClientesAtados.CantidadNoAfiliados / info!.ClientesAtados.CantidadAfiliados * 100;

    const activeUsers = info!.ClientesAtados.CantidadAfiliados;
    const inactiveUsers = info!.ClientesAtados.CantidadNoAfiliados;


    return (
        <div className="p-4">
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 '>
                <div className='bg-card col-span-1 flex h-12 pl-4 pointer-events-none select-none'>
                    <img src="https://www.produbanco.com.ec/media/712553/web.png?format=webp" alt="" className='h-full ' />
                </div>
                <div className='bg-card col-span-3 flex h-12 items-center'>
                    <h2 className="text-3xl font-bold text-primary text-green-800 leading-10">
                        Monitoreo de transacciones WIP
                    </h2>
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                <div className="bg-card h-96 p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 bg-green-700">
                    <DateFilter />
                </div>

                <div className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-3 bg-white">
                    <LineChart transaccionesTotales={counts} rangoTiempo={hours} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                <div className="bg-card h-full p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400">
                    <UsersTransactions activeUsers={activeUsers} totalTransactions={totalTransactions} historicalTotal={historicalTotal} />
                </div>
                <div className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400">
                    <BarChart transAceptada={receivedTransactions} transRechazada={rejectedTransactions} />
                </div>
                <div className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400">
                    <PieChart locales={localTransactions} externos={externalTransactions} />
                </div>
                <div className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400">
                    <DoughnutChart transaccionesTotal={activeUsers} transaccionesDesercion={inactiveUsers} />
                </div>
            </div>
        </div>
    );
};

export default TransaccionesWEP;