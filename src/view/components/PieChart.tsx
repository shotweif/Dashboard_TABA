// PieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import fakeData from '../../data/fakeData.json';
import { DataStructure } from '../../types/information';
import useFetchTransactions from '../../hooks/fetchTransantionDataHook';
import LoadingSpinner from './LoadingSpinner';
import { useTransactions } from '../../contexts/TransactionContext';

const PieChart: React.FC = () => {

    //const info: DataStructure = fakeData;
    const PRODUBANCO = 'PRODUBANCO';
    //const { info, loading, error } = useFetchTransactions('https://172.24.11.42/ServiciosBackPR/api/Reportes/RequestValuesReporteCanales');
    const { info, loading, error } = useTransactions();
    if (loading) return <LoadingSpinner />;
    if (error) return <div>Error: {error}</div>;
  
   
    const localTransactions = info!.ResultadosReportecanalesWipDiario.filter(
      transaction => transaction.BancoOrigen === PRODUBANCO && transaction.BancoDestino === PRODUBANCO
    );
  
    const externalTransactions = info!.ResultadosReportecanalesWipDiario.length - localTransactions.length;
    const data: ChartData<'pie'> = {
        labels: ['A otros bancos', 'Locales'],
        datasets: [{
            label: 'Transacciones',
            data: [externalTransactions, localTransactions.length],
            backgroundColor: ['rgba(34, 102, 34, 1)', 'rgba(63, 191, 63, 1)'],
            borderWidth: 1
        }]
    };

    const options: ChartOptions<'pie'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    };

    return <div>
        <h3 className="text-lg font-semibold text-primary text-green-600">Origen de Transacciones</h3>
        <Pie data={data} options={options} />
    </div>;
};

export default PieChart;
