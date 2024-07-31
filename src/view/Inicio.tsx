import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Importa Chart.js

// Función para formatear fechas
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Función para manejar el clic en el botón
const miFuncion = () => {
    const dateInput = (document.getElementById('dateInput') as HTMLInputElement).value;
    const dateInput2 = (document.getElementById('dateInput2') as HTMLInputElement).value;
    const tipoDeFiltro = document.getElementById('TipodeFiltro') as HTMLHeadingElement;

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const todayFormatted = formatDate(today);
    const yesterdayFormatted = formatDate(yesterday);

    if (dateInput === yesterdayFormatted && dateInput2 === todayFormatted) {
        tipoDeFiltro.textContent = 'Transacciones diarias';
    } else {
        tipoDeFiltro.textContent = 'Transacciones en Intervalos de Tiempo';
    }
};

const Inicio: React.FC = () => {
  const barChartRef = useRef<Chart<'bar'> | null>(null);
  const pieChartRef = useRef<Chart<'pie'> | null>(null);
  const doughnutChartRef = useRef<Chart<'doughnut'> | null>(null);
  const lineChartRef = useRef<Chart<'line'> | null>(null);

  useEffect(() => {
      // Configurar fechas iniciales
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      (document.getElementById('dateInput') as HTMLInputElement).value = formatDate(yesterday);
      (document.getElementById('dateInput2') as HTMLInputElement).value = formatDate(today);

      document.getElementById('myButton')?.addEventListener('click', miFuncion);

      // Inicializar gráficos después de que los scripts hayan cargado
      const ctxBar = (document.getElementById('transaccionesChartBar') as HTMLCanvasElement).getContext('2d');
      if (ctxBar) {
          if (barChartRef.current) {
              barChartRef.current.destroy();
          }
          barChartRef.current = new Chart<'bar'>(ctxBar, {
              type: 'bar',
              data: {
                  labels: ['Aceptadas', 'Rechazadas'],
                  datasets: [{
                      label: 'Transacciones',
                      data: [1234, 456],
                      backgroundColor: ['rgba(63, 191, 63, 0.5)', 'rgba(34, 102, 3, 0.5)'],
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      y: {
                          beginAtZero: true
                      }
                  }
              }
          });
      }

      const ctxPie = (document.getElementById('transaccionesChartPie') as HTMLCanvasElement).getContext('2d');
      if (ctxPie) {
          if (pieChartRef.current) {
              pieChartRef.current.destroy();
          }
          pieChartRef.current = new Chart<'pie'>(ctxPie, {
              type: 'pie',
              data: {
                  labels: ['A otros bancos', 'Locales'],
                  datasets: [{
                      label: 'Transacciones',
                      data: [576, 456],
                      backgroundColor: ['rgba(34, 102, 34, 1)', 'rgba(63, 191, 63, 1)'],
                      borderWidth: 1
                  }]
              },
              options: {
                  responsive: true,
                  plugins: {
                      legend: {
                          position: 'top',
                      }
                  }
              }
          });
      }

      const ctxDoughnut = (document.getElementById('DesercionesGraficoMedidor') as HTMLCanvasElement).getContext('2d');
      if (ctxDoughnut) {
          if (doughnutChartRef.current) {
              doughnutChartRef.current.destroy();
          }
          doughnutChartRef.current = new Chart<'doughnut'>(ctxDoughnut, {
              type: 'doughnut',
              data: {
                  labels: ['Valor', 'Restante'],
                  datasets: [{
                      label: 'Transacciones',
                      data: [200, 90],
                      backgroundColor: ['rgba(63, 191, 63, 1)', 'rgba(220, 220, 220, 1)'],
                      borderWidth: 1
                  }]
              },
              options: {
                  cutout: 80,
                  responsive: true,
                  rotation: 270,
                  circumference: 180,
                  plugins: {
                      legend: {
                          display: false
                      }
                  }
              }
          });
      }

      const ctxLine = (document.getElementById('usuariosActivosChartLine') as HTMLCanvasElement).getContext('2d');
      if (ctxLine) {
          if (lineChartRef.current) {
              lineChartRef.current.destroy();
          }
          lineChartRef.current = new Chart<'line'>(ctxLine, {
              type: 'line',
              data: {
                  labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
                  datasets: [{
                      label: 'Usuarios Activos',
                      data: [120, 115, 130, 110, 100, 105, 120, 140, 150, 160, 170, 180, 200, 220, 240, 230, 210, 190, 180, 170, 160, 150, 140, 130],
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      borderColor: 'rgba(63, 191, 63, 1)',
                      borderWidth: 2,
                      fill: true
                  }]
              },
              options: {
                  responsive: true,
                  scales: {
                      x: {
                          beginAtZero: true
                      },
                      y: {
                          beginAtZero: true
                      }
                  }
              }
          });
      }

  }, []);

    return (
        <div className="p-4 bg-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-primary text-green-800">Transacciones</h2>
            <div className="flex flex-row">
                <div className="basis-1/4 p-4">
                    <div className="bg-card p-4 h-full rounded-lg shadow hover:shadow-xl transition-shadow duration-300 border-l-4 border-muted bg-green-700 border-green-400">
                        <h3 className="text-lg font-semibold text-muted text-white">Filtro de fechas</h3>
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground">Desde</label>
                            <input type="date" id="dateInput" className="mt-1 block w-full border border-border rounded-md p-2" placeholder="Pick a date" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground">Hasta</label>
                            <input type="date" id="dateInput2" className="mt-1 block w-full border border-border rounded-md p-2" placeholder="Pick a date" />
                        </div>
                        <div className="flex mt-4">
                            <button id="myButton" className="bg-black text-primary-foreground hover:bg-primary/80 w-full h-9 mr-4 text-white rounded-lg">Filtrar</button>
                            <button className="bg-black text-primary-foreground hover:bg-primary/80 w-full ml-4 text-white rounded-lg">Limpiar</button>
                        </div>
                        <h3 id="TipodeFiltro" className="text-lg font-semibold text-secondary m-10 text-center text-white"></h3>
                    </div>
                </div>
                <div className="basis-1/4 p-4">
                    <div className="bg-card h-full p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 border-l-4 border-secondary bg-white border-green-400">
                        <h3 className="text-lg font-semibold text-secondary text-green-600">Usuarios Activos</h3>
                        <p className="text-4xl font-bold text-primary-foreground">3,456</p>
                        <p className="text-sm text-muted-foreground">Usuarios que han realizado al menos una transacción</p>
                    </div>
                </div>
                <div className="basis-1/2 p-4">
                    <div className="p-4 w-50 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 bg-green-700">
                        <canvas id="usuariosActivosChartLine" className="rounded-lg shadow-md bg-white"></canvas>
                    </div>
                </div>
            </div>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    <div className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 border-l-4 border-secondary bg-white border-green-400">
                        <h3 className="text-lg font-semibold text-secondary text-green-600">Total de Transacciones</h3>
                        <p className="text-4xl font-bold text-primary-foreground">1,768</p>
                        <h3 className="text-lg font-semibold text-secondary text-green-600 pt-10">Total Historio</h3>
                        <p className="text-4xl font-bold text-primary-foreground">1000,768</p>
                    </div>
                    <div id="section1" className="bg-card p-4 w-auto h-auto rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-2 bg-white border-green-400">
                        <h3 className="text-lg font-semibold text-primary text-green-600">Transacciones</h3>
                        <canvas id="transaccionesChartBar" className="h-9 rounded-lg shadow-md" height="110px"></canvas>
                    </div>
                    <div id="section2" className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-2 bg-white border-green-400">
                        <h3 className="text-lg font-semibold text-primary text-green-600">Origen de Transacciones</h3>
                        <p className="text-sm text-muted-foreground">Usuarios que abandonaron la plataforma</p>
                        <canvas id="transaccionesChartPie" className="rounded-lg shadow-md" height="150px"></canvas>
                    </div>
                    <div className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 border-l-4 border-accent bg-white border-green-400">
                        <h3 className="text-lg font-semibold text-accent text-green-600">Tasa de Deserción</h3>
                        <p className="text-4xl font-bold text-primary-foreground">12.5%</p>
                        <p className="text-sm text-muted-foreground">Usuarios que abandonaron la plataforma</p>
                        <canvas id="DesercionesGraficoMedidor" height="10px" width="10px" className="rounded-lg shadow-md"></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inicio;
