import React, { useState, useEffect } from 'react';
import { format, isToday, parseISO, subDays } from 'date-fns';

interface DateFilterProps {
  onFilter: (initialDate: string, endDate:string) => void;
  onClear: () => void;
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
    const selectedInitialDate = format(initialDate, 'dd/MM/yyyy');
    const selectedEndDate = format(endDate, 'dd/MM/yyyy');
    console.log('selected nueva fecha para mandar al hook', selectedInitialDate, selectedEndDate);
   if (endDate < initialDate) {
      setFilterMessage('La fecha final no puede ser anterior a la fecha inicial.');
      return;
    }
    setFilterMessage('Se está filtrando por fecha');
    onFilter(selectedInitialDate, selectedEndDate);
    return true;
  };

  // boton de limpiar filtro
  const handleClearClick = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const yesterdayFormatted = format(subDays(new Date(), 1), 'yyyy-MM-dd'); // Calculate yesterday's date
    setInitialDate(today);
    setEndDate(yesterdayFormatted)
    setFilterMessage('Estos son los últimos datos');
    onClear();
  };


    // Handle initial date change and update final date if necessary
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
      <h3 className="text-lg font-semibold text-muted text-white text-2xl">Filtro de fechas</h3>
      <div>
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
      <h3 id="TipodeFiltro" className="text-lg font-semibold text-secondary m-10 text-center text-white">
        {filterMessage}
      </h3>
    </div>
  );
};

export default DateFilter;