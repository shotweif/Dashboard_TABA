import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import fakeData from '../../data/fakeData.json';
import { DataStructure } from '../../types/information';
import useFetchTransactions from '../../hooks/fetchTransantionDataHook';
import LoadingSpinner from './LoadingSpinner';
import { useTransactions } from '../../contexts/TransactionContext';
var transAceptada = 1234;
var transRechazada = 456;

const BarChart: React.FC = () => {
    //const { info, loading, error } = useFetchTransactions('https://172.24.11.42/ServiciosBackPR/api/Reportes/RequestValuesReporteCanales');
    const { info, loading, error } = useTransactions();
    if (loading) return <LoadingSpinner />;
    if (error) return <div>Error: {error}</div>;
  //const info: DataStructure = fakeData;
    // Filtrar las transacciones recibidas
  const receivedTransactions = info!.ResultadosReportecanalesWipDiario.filter(
    transaction => transaction.CodRespuesta === '100000'
  );

  // Filtrar las transacciones rechazadas (asumiendo que CodRespuesta diferente a '100000' es rechazada)
  const rejectedTransactions = info!.ResultadosReportecanalesWipDiario.filter(
    transaction => transaction.CodRespuesta !== '100000'
  );

    const data: ChartData<'bar'> = {
        labels: ['Aceptadas', 'Rechazadas'],
        datasets: [{
            label: 'Transacciones',


            
            data: [receivedTransactions.length, rejectedTransactions.length],
            backgroundColor: ['rgba(63, 191, 63, 0.5)', 'rgba(34, 102, 3, 0.5)'],
            borderWidth: 1
        }]
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false, // Esto permite que el gráfico sea ajustable en altura
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return <Bar data={data} options={options} />;
    
};

export default BarChart;
