import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import { Transaccion } from "../types/information";

interface BarChartProps {
  transAceptada: Transaccion[];
  transRechazada: Transaccion[];
}

const BarChart: React.FC<BarChartProps> = ({
  transAceptada,
  transRechazada,
}) => {
  const data: ChartData<"bar"> = {
    labels: ["Aceptadas", "Rechazadas"],
    datasets: [
      {
        label: "Transacciones",
        data: [transAceptada.length, transRechazada.length],
        backgroundColor: ["rgba(63, 191, 63, 1)","rgba(0, 105, 60, 1)" ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y", // Esta opción hace que las barras sean horizontales
    responsive: true,
    maintainAspectRatio: false, // Permite que el gráfico se ajuste en altura
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-full "> {/* Establecer el tamaño del gráfico */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
