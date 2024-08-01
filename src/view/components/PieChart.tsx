// PieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

const PieChart: React.FC = () => {
    const data: ChartData<'pie'> = {
        labels: ['A otros bancos', 'Locales'],
        datasets: [{
            label: 'Transacciones',
            data: [576, 456],
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
