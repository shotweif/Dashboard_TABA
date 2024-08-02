import React, { useEffect } from 'react';

interface DateFilterProps {
  onFilter: () => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onFilter }) => {
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    (document.getElementById('dateInput') as HTMLInputElement).value = formatDate(yesterday);

    document.getElementById('myButton')?.addEventListener('click', onFilter);
  }, [onFilter]);

  return (
    <div>
      
      <h3 className="text-lg font-semibold text-muted text-white">Filtro de fechas</h3>
      <div>
        <input type="date" id="dateInput" className="mt-1 block w-full border border-border rounded-md p-2" placeholder="Pick a date" />
      </div>
      <div className="flex mt-4">
        <button id="myButton" className="bg-black text-primary-foreground hover:bg-primary/80 w-full h-9 mr-4 text-white rounded-lg">Filtrar</button>
      </div>
      <h3 id="TipodeFiltro" className="text-lg font-semibold text-secondary m-10 text-center text-white"></h3>
    </div>
  );
};

export default DateFilter;
//         <button className="bg-black text-primary-foreground hover:bg-primary/80 w-full ml-4 text-white rounded-lg">Limpiar</button>
