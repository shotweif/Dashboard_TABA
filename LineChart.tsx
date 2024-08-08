import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import fakeData from '../../data/fakeData.json';
import { DataStructure } from '../../types/information';
import { getHours, parseISO } from "date-fns";
import useFetchTransactions from '../../hooks/fetchTransantionDataHook';
import LoadingSpinner from './LoadingSpinner';
import { useTransactions } from '../../contexts/TransactionContext';

const LineChart: React.FC = () => {


    //const info: DataStructure = fakeData;
    //const { info, loading, error } = useFetchTransactions('https://172.24.11.42/ServiciosBackPR/api/Reportes/RequestValuesReporteCanales');
    const { info, loading, error } = useTransactions();
    if (loading) return <LoadingSpinner />;
    if (error) return <div>Error: {error}</div>;
  const transactionsByHour: { [key: number]: number } = {};
  console.log(info)
  info!.ResultadosReporteCanalesWip.forEach((transaction) => {
    const hour = getHours(parseISO(transaction.FechaTrx));
    if (!transactionsByHour[hour]) {
      transactionsByHour[hour] = 0;
    }
    transactionsByHour[hour]++;
  });

  // Preparar los datos para el gráfico
  const hours = Object.keys(transactionsByHour).map((hour) => parseInt(hour));

  const counts = Object.values(transactionsByHour);
 

    const data: ChartData<'line'> = {
        labels: hours.map(hour => `${hour}:00`),
        datasets: [{
            label: 'Usuarios Activos',
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(63, 191, 63, 1)',
            borderWidth: 1,
            fill: true,
        }]
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className='w-full h-full'>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
