import React, { useState, useEffect } from 'react';
import { format, isToday, parseISO } from 'date-fns';

interface DateFilterProps {
  onFilter: (date: string) => void;
  onClear: () => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onFilter, onClear }) => {
  const [selectedDate, setSelectedDate] = useState<string>(''); // Fecha seleccionada
  const [filterMessage, setFilterMessage] = useState<string>(''); // Mensaje de accion

  // Declaracion de la fecha actual
  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    setSelectedDate(today);
  }, []);

  // Boton de filtrar
  const handleFilterClick = () => {
    // const selected = parseISO(selectedDate);
    // console.log('selected nueva fecha', selected);
    // if (!isToday(selected)) {
    //    setFilterMessage('Fecha incorrecta o fuera de rango');
    //    return false;
    //  }
    setFilterMessage('Se está filtrando por fecha');
    onFilter(selectedDate);
    return true;
  };

  // boton de limpiar filtro
  const handleClearClick = () => {
    console.log('holaaaaaaaaaaaaaaaaa click');
    const today = format(new Date(), 'yyyy-MM-dd');
    setSelectedDate(today);
    setFilterMessage('Estos son los últimos datos');
    onClear();
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-muted text-white text-2xl">Filtro de fechas</h3>
      <div>
        <input
          type="date"
          id="dateInput"
          className="mt-1 block w-full border border-border rounded-md p-2"
          value={selectedDate}
          max={format(new Date(), 'yyyy-MM-dd')}
          onChange={(e) => setSelectedDate(e.target.value)}
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
