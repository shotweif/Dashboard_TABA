// Inicio.tsx
import React, { useEffect } from 'react';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import DoughnutChart from '../components/DoughnutChart';
import LineChart from '../components/LineChart';
import DateFilter from '../components/DateFilter';
import UsersTransactions from '../components/UsersTransactions';

const TransaccionesWEP: React.FC = () => {

    // Grafico de lineas
    const totales = [120, 115, 130, 110, 100, 105, 120, 140, 150, 160, 170, 180, 200, 220, 240, 230, 210, 190, 180, 170, 160, 150, 140, 130];
    const tiempo = [
        '00:00', '00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45', '02:00', '02:15',
        '02:30', '02:45', '03:00', '03:15', '03:30', '03:45', '04:00', '04:15', '04:30', '04:45',
        '05:00', '05:15', '05:30', '05:45'
    ];

    // Lista de transacciones
    const activeUsers = 3456;
    const totalTransactions = 1768;
    const historicalTotal = 1000768;

    // Grafico de barras
    const transAceptada = 1234;
    const transRechazada = 456;

    // Grafico Pastel
    const locales = 576;
    const externos = 456;

    // Grafico de anillo
    const transaccionesTotal = 1324;
    const transaccionesDesercion = 30;


    return (
        <div className="p-4">
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 '>
                <div className='bg-card col-span-1 flex h-12 pl-4 pointer-events-none select-none'>
                    <img src="https://www.produbanco.com.ec/media/712553/web.png?format=webp" alt="" className='h-full ' />
                </div>
                <div className='bg-card col-span-3 flex h-12 items-center'>
                    <h2 className="text-3xl font-bold text-primary text-green-800 leading-10">
                        Monitoreo de transacciones WIP
                    </h2>
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                <div className="bg-card h-96 p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 bg-green-700">
                    <DateFilter />
                </div>

                <div className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-3 bg-white">
                    <LineChart transaccionesTotales={totales} rangoTiempo={tiempo} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                <div className="bg-card h-full p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400">
                    <UsersTransactions activeUsers={activeUsers} totalTransactions={totalTransactions} historicalTotal={historicalTotal} />
                </div>
                <div className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400">
                    <BarChart transAceptada={transAceptada} transRechazada={transRechazada} />
                </div>
                <div className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400">
                    <PieChart locales={locales} externos={externos} />
                </div>
                <div className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400">
                    <DoughnutChart transaccionesTotal={transaccionesTotal} transaccionesDesercion={transaccionesDesercion} />
                </div>
            </div>
        </div>
    );
};

export default TransaccionesWEP;