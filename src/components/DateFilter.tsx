import React, { useState, useEffect } from 'react';
import { format, isToday, parseISO, startOfDay, subDays } from 'date-fns';

interface DateFilterProps {
  onFilter: (initialDate: string, endDate:string) => void;
  onClear: (initialDate: string, endDate:string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onFilter, onClear }) => {
  const yesterday = subDays(new Date(), 1);
  const formattedYesterday = format(yesterday, 'yyyy-MM-dd'); //para enviar al hook
  const today = format(new Date(), 'yyyy-MM-dd'); //para enviar al hook


  const [initialDate, setInitialDate] = useState<string>(formattedYesterday); // Fecha inicial
  const [endDate, setEndDate] = useState<string>(today); // Fecha final
  const [filterMessage, setFilterMessage] = useState<string>(''); // Mensaje de accion


  // Boton de filtrar
  const handleFilterClick = () => {

    const initialDateObj = parseISO(initialDate);
    const endDateObj = parseISO(endDate);
  
    const selectedInitialDate = format(startOfDay(initialDateObj) , 'dd/MM/yyyy');
    const selectedEndDate = format(startOfDay(endDateObj), 'dd/MM/yyyy');

   if (endDateObj < initialDateObj) {
      setFilterMessage('La fecha final no puede ser anterior a la fecha inicial.');
      return;
    }
    setFilterMessage('Se está filtrando por fecha');
    onFilter(selectedInitialDate, selectedEndDate);
    return true;
  };

  // boton de limpiar filtro
  const handleClearClick = () => {
    const todayFormatted = format(startOfDay(new Date()), 'yyyy-MM-dd');
    const yesterdayFormatted = format(today, 'yyyy-MM-dd'); // Calculate yesterday's date
    
    const todayObject = parseISO(todayFormatted);
    const yesterdayObject = parseISO(yesterdayFormatted);


    const selectedInitialDate = format(startOfDay(yesterdayObject) , 'dd/MM/yyyy');
    const selectedEndDate = format(startOfDay(todayObject), 'dd/MM/yyyy');

    setInitialDate(yesterdayFormatted);
    setEndDate(today)
    setFilterMessage('Estos son los últimos datos');
    onClear(selectedInitialDate,selectedEndDate);
  };


    const handleInitialDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newInitialDate = e.target.value;
      setInitialDate(newInitialDate);
  
      // Ensure that endDate is not before the new initialDate
      if (parseISO(endDate) < parseISO(newInitialDate)) {
        setEndDate(newInitialDate); // Update endDate to match new initialDate
      }
    };
  return (
    <div>
      <h3 className="text-lg font-semibold text-muted text-white text-2xl">Filtro</h3>
      <div>
      <label htmlFor="initialDateInput" className="block text-sm font-medium text-white pt-3">
    Fecha Inicial
  </label>
        <input
          type="date"
          id="initialDateInput"
          className="mt-1 block w-full border border-border rounded-md p-2"
          value={initialDate}
          max={format(new Date(), 'yyyy-MM-dd')}
          onChange={handleInitialDateChange}
        />
      </div>
      <div>
      <label htmlFor="finalDateInput" className="block text-sm font-medium text-white pt-3">
    Fecha Final
  </label>
        <input
          type="date"
          id="finalDateInput"
          className="mt-1 block w-full border border-border rounded-md p-2"
          value={endDate}
          min={initialDate} // Final date cannot be earlier than the initial date
          max={format(new Date(), 'yyyy-MM-dd')}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <button
          id="myButton"
          className="bg-green-900 text-primary-foreground hover:bg-primary/80 w-full h-9 text-white rounded-lg"
          onClick={handleFilterClick}
        >
          Filtrar
        </button>
        <button
          id="ButtonDay"
          className="bg-black text-primary-foreground hover:bg-primary/80 w-full h-9 text-white rounded-lg my-2"
          onClick={handleClearClick}
        >
          Limpiar
        </button>
      </div>
      <h3 id="TipodeFiltro" className="text-lg font-semibold text-secondary m-2 text-center text-white">
        {filterMessage}
      </h3>
    </div>
  );
};

export default DateFilter;