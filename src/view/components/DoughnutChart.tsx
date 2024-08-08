// DoughnutChart.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import fakeData from '../../data/fakeData.json';
import { DataStructure } from '../../types/information';
import LoadingSpinner from './LoadingSpinner';
import useFetchTransactions from '../../hooks/fetchTransantionDataHook';
import { useTransactions } from '../../contexts/TransactionContext';

const DoughnutChart: React.FC = () => {
    const info: DataStructure = fakeData;
    // const { info, loading, error } = useTransactions();
    // if (loading) return <LoadingSpinner />;
    // if (error) return <div>Error: {error}</div>;
    const desertionAverage = info!.ClientesAtados.CantidadNoAfiliados / info!.ClientesAtados.CantidadAfiliados * 100;

    const activeUsers = info!.ClientesAtados.CantidadAfiliados;
    const inactiveUsers = info!.ClientesAtados.CantidadNoAfiliados;
    const data: ChartData<'doughnut'> = {
        labels: ['Valor', 'Restante'],
        datasets: [{
            label: 'Transacciones',
            data: [activeUsers, inactiveUsers],
            backgroundColor: ['rgba(63, 191, 63, 1)', 'rgba(220, 220, 220, 1)'],
            borderWidth: 1
        }]
    };

    const options: ChartOptions<'doughnut'> = {
        cutout: '50%',
        responsive: true,
        rotation: 270,
        circumference: 180,
        plugins: {
            legend: {
                display: false
            }
        }
    };

    //    return <Doughnut data={data} options={options} />;
    return (
        <div>
             <h3 className="text-lg font-semibold text-accent text-green-600">Tasa de Deserción</h3>
             <p className="text-4xl font-bold text-primary-foreground">{desertionAverage.toFixed(2)}%</p>
             <Doughnut data={data} options={options} />
        </div>
    );
};

export default DoughnutChart;
