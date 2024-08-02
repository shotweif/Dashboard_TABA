import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

const LineChart: React.FC = () => {
    const data: ChartData<'line'> = {
        labels: [
            '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00',
            '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
            '20:00', '21:00', '22:00', '23:00'
        ],
        datasets: [{
            label: 'Usuarios Activos',
            data: [
                120, 115, 130, 110, 100, 105, 120, 140, 150, 160,
                170, 180, 200, 220, 240, 230, 210, 190, 180, 170,
                160, 150, 140, 130
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(63, 191, 63, 1)',
            borderWidth: 1,
            fill: true,
        }]
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
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
