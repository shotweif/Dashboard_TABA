// DoughnutChart.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

const DoughnutChart: React.FC = () => {
    const data: ChartData<'doughnut'> = {
        labels: ['Valor', 'Restante'],
        datasets: [{
            label: 'Transacciones',
            data: [20, 200],
            backgroundColor: ['rgba(63, 191, 63, 1)', 'rgba(220, 220, 220, 1)'],
            borderWidth: 1
        }]
    };

    const options: ChartOptions<'doughnut'> = {
        cutout: '80%',
        responsive: true,
        rotation: 270,
        circumference: 180,
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
