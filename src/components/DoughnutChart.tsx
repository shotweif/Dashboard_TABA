// DoughnutChart.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface DoughnutChartProps {
    transaccionesTotal: number;
    transaccionesDesercion: number;
}

const DoughnutChart: React.FC <DoughnutChartProps> = ({transaccionesTotal, transaccionesDesercion}) => {
    var porcentaje = (transaccionesDesercion / transaccionesTotal) * 100;

    const data: ChartData<'doughnut'> = {
        labels: ['Valor', 'Restante'],
        datasets: [{
            label: 'Transacciones',
            data: [porcentaje, 100 - (porcentaje)],
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

    return (
        <div>
            <h3 className="text-lg font-semibold text-2xl text-accent text-green-600">Tasa de Deserción</h3>
            <p className="text-4xl font-bold text-primary-foreground">{porcentaje.toFixed(2)}%</p>
            <p className="text-sm text-muted-foreground">Usuarios que abandonaron la plataforma</p>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default DoughnutChart;
