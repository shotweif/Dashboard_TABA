// LineChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface LineChartProps {
    transaccionesTotales: number[];
    rangoTiempo: number[];
}

const LineChart: React.FC<LineChartProps> = ({ transaccionesTotales, rangoTiempo }) => {
    const data: ChartData<'line'> = {
        labels: rangoTiempo,
        datasets: [
            {
                label: 'Transacciones Totales',
                data: transaccionesTotales,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: true,
            }
        ]
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Hora', // Etiqueta para el eje x
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Transacciones', // Etiqueta para el eje x
                },
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
