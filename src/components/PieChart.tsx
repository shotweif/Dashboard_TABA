// PieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { Transaccion } from '../types/information';

interface PieChartProps {
    locales: Transaccion[];
    externos: number;
}

const PieChart: React.FC <PieChartProps> = ({locales, externos}) => {
    const data: ChartData<'pie'> = {
        labels: ['A otros bancos', 'Locales'],
        datasets: [{
            label: 'Transacciones',
            data: [externos, locales.length],
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
        <h3 className="text-lg font-semibold text-primary text-green-600 text-2xl	">Origen de Transacciones</h3>
        <p className="text-sm text-muted-foreground pb-10">Usuarios que abandonaron la plataforma</p>
        <Pie data={data} options={options} />
    </div>;
};

export default PieChart;
