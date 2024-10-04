// PieChart.tsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import { Transaccion } from "../types/information";

interface PieChartProps {
  locales: Transaccion[];
  externos: number;
}

const PieChart: React.FC<PieChartProps> = ({ locales, externos }) => {
  const data: ChartData<"pie"> = {
    labels: ["A otros bancos", "Locales"],
    datasets: [
      {
        label: "Transacciones",
        data: [externos, locales.length],
        backgroundColor: ["rgba(0, 105, 60, 1)", "rgba(63, 191, 63, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-primary text-green-600 text-2xl pb-2" style={{ color:'#00693c'}}>
        Origen de Transacciones
      </h3>
      <p className="text-sm text-muted-foreground pb-8">
        Usuarios que abandonaron la plataforma
      </p>
      <div className="w-64 h-64 flex justify-center items-center mx-auto">
      <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
