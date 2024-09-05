import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface BarChartActiveUsersProps {
    activeUsers: number;
    inactiveUsers: number;
}

const BarChartActiveUsers: React.FC<BarChartActiveUsersProps> = ({ activeUsers, inactiveUsers }) => {
    const data: ChartData<'bar'> = {
        labels: ['Usuarios'],
        datasets: [
            {
                label: 'Usuarios Activos',
                data: [activeUsers],
                backgroundColor: 'rgba(63, 191, 63, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Usuarios Inactivos',
                data: [inactiveUsers],
                backgroundColor: 'rgba(34, 102, 3, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }
        ]
    };

    const options: ChartOptions<'bar'> = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
                stacked: true,
            },
            y: {
                beginAtZero: true,
                stacked: true,
            }
        }
    };

    return (
        <div className='w-full h-full pt-12'>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChartActiveUsers;
