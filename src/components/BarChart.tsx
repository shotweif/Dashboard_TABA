import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { Transaccion } from '../types/information';

interface BarChartProps {
    transAceptada: Transaccion[];
    transRechazada: Transaccion[];	
}

const BarChart: React.FC <BarChartProps> = ({transAceptada, transRechazada}) => {
    const data: ChartData<'bar'> = {
        labels: ['Aceptadas', 'Rechazadas'],
        datasets: [{
            label: 'Transacciones',
            data: [transAceptada.length, transRechazada.length],
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
