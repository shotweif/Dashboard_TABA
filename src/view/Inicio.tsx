// Inicio.tsx
import React, { useEffect } from 'react';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import DoughnutChart from '../components/DoughnutChart';
import LineChart from '../components/LineChart';
import DateFilter from '../components/DateFilter';
import UsersTransactions from '../components/UsersTransactions';

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const miFuncion = (): void => {
    const dateInput = (document.getElementById('dateInput') as HTMLInputElement).value;
    const tipoDeFiltro = document.getElementById('TipodeFiltro') as HTMLHeadingElement;

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const todayFormatted = formatDate(today);
    const yesterdayFormatted = formatDate(yesterday);

    if (dateInput === yesterdayFormatted) {
        tipoDeFiltro.textContent = 'Transacciones del diarias';
    } else {
        tipoDeFiltro.textContent = 'Transacciones en Intervalos de Tiempo';
    }
};

const Inicio: React.FC = () => {
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
                    <DateFilter onFilter={miFuncion} />
                </div>

                <div className="bg-card p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-3 bg-white">
                    <LineChart />
                </div>
            </div>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    <div className="bg-card h-full p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400">
                        <UsersTransactions />
                    </div>
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