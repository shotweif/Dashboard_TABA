import React, { useState, useEffect } from 'react';

const DateFilter: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(''); // Fecha seleccionada
  const [filterMessage, setFilterMessage] = useState<string>(''); // Mensaje de accion

  // Declaracion de la fecha actual
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  // Boton de filtrar
  const handleFilterClick = () => {
    console.log(`Fecha seleccionada: ${selectedDate}`);
    setFilterMessage('Se está filtrando por fecha');
  };

  // boton de limpiar filtro
  const handleClearClick = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setFilterMessage('Estos son los últimos datos');
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-muted text-white text-2xl">Filtro de fechas</h3>
      <div>
        <input type="date" id="dateInput" className="mt-1 block w-full border border-border rounded-md p-2" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <button id="myButton" className="bg-green-900 text-primary-foreground hover:bg-primary/80 w-full h-9 text-white rounded-lg" onClick={handleFilterClick} >
          Filtrar
        </button>
        <button id="ButtonDay" className="bg-black text-primary-foreground hover:bg-primary/80 w-full h-9 text-white rounded-lg my-2" onClick={handleClearClick} >
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
