// DoughnutChart.tsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";

interface DoughnutChartProps {
  clientesActivos: number;
  clientesInactivos: number;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  clientesActivos: transaccionesTotal,
  clientesInactivos: transaccionesDesercion,
}) => {
  const porcentaje = (transaccionesDesercion / transaccionesTotal) * 100;

  const activeClientsPercentage = Math.round(porcentaje);

  const data: ChartData<"doughnut"> = {
    labels: ["Porcentaje inactivos", "Porcentaje activos"],
    datasets: [
      {
        label: "Usuarios",
        data: [activeClientsPercentage, 100 - activeClientsPercentage],
        backgroundColor: ["rgba(120, 190, 32,1)", "rgba(197, 197, 197, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    cutout: "80%",
    responsive: true,
    rotation: 270,
    circumference: 180,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-2xl text-accent text-green-600" style={{ color:'#00693c'}}>
        Tasa de Deserción
      </h3>
      <p className="text-4xl font-bold text-primary-foreground">
        {Math.round(porcentaje)}%
      </p>
      <p className="text-sm text-muted-foreground pt-2" >
        Usuarios que abandonaron la plataforma
      </p>
      <div className="w-64 h-64 flex justify-center items-center mx-auto">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
