// Inicio.tsx
import React, { useEffect } from 'react';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import DoughnutChart from './components/DoughnutChart';
import LineChart from './components/LineChart';
import './styles.css';

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const miFuncion = (): void => {
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
    useEffect(() => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        (document.getElementById('dateInput') as HTMLInputElement).value = formatDate(yesterday);
        (document.getElementById('dateInput2') as HTMLInputElement).value = formatDate(today);

        document.getElementById('myButton')?.addEventListener('click', miFuncion);
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
                        <h3 className="text-lg font-semibold text-secondary text-green-600">Total de Transacciones</h3>
                        <p className="text-4xl font-bold text-primary-foreground">1,768</p>
                        <h3 className="text-lg font-semibold text-secondary text-green-600 pt-10">Total Historio</h3>
                        <p className="text-4xl font-bold text-primary-foreground">1000,768</p>

                  </div>
              </div>

              <div className="basis-1/4 p-4">
                    <div className="bg-card h-full w- p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400">
                      <h3 className="text-lg font-semibold text-secondary text-green-600">Usuarios Activos</h3>
                      <p className="text-4xl font-bold text-primary-foreground">3,456</p>
                      <p className="text-sm text-muted-foreground">Usuarios que han realizado al menos una transacción</p>
                  </div>
              </div>
              
              <div className="basis-1/2 p-4">
                  <div className="p-4 w-full h-full rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 bg-white">
                      <LineChart />
                  </div>
              </div>
          </div>
          <div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                  <div className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400">
                      <BarChart />
                  </div>
                  <div className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400">
                      <PieChart />
                  </div>
                  <div className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400">
                      <DoughnutChart />
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Inicio;