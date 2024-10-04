import React, { useState, useEffect } from "react";
import { format, isToday, parseISO, startOfDay, subDays } from "date-fns";

interface DateFilterProps {
  onFilter: (initialDate: string, endDate: string) => void;
  onClear: (initialDate: string, endDate: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onFilter, onClear }) => {
  const yesterday = subDays(new Date(), 1);
  const formattedYesterday = format(yesterday, "yyyy-MM-dd"); //para enviar al hook
  const today = format(new Date(), "yyyy-MM-dd"); //para enviar al hook

  const [initialDate, setInitialDate] = useState<string>(formattedYesterday); // Fecha inicial
  const [endDate, setEndDate] = useState<string>(today); // Fecha final

  // Boton de filtrar
  const handleFilterClick = () => {
    const initialDateObj = parseISO(initialDate);
    const endDateObj = parseISO(endDate);

    const selectedInitialDate = format(
      startOfDay(initialDateObj),
      "dd/MM/yyyy"
    );
    const selectedEndDate = format(startOfDay(endDateObj), "dd/MM/yyyy");

    const selectedInitialDateFormatted = format(
      startOfDay(initialDateObj),
      "yyyy-MM-dd"
    );
    const selectedEndDateFormatted = format(
      startOfDay(endDateObj),
      "yyyy-MM-dd"
    );

    setInitialDate(selectedInitialDateFormatted);
    setEndDate(selectedEndDateFormatted);
    onFilter(selectedInitialDate, selectedEndDate);
    return true;
  };

  // boton de limpiar filtro
  const handleClearClick = () => {
    const todayFormatted = format(startOfDay(new Date()), "yyyy-MM-dd");
    const yesterdayFormatted = format(today, "yyyy-MM-dd"); // Calculate yesterday's date

    const todayObject = parseISO(todayFormatted);
    const yesterdayObject = parseISO(yesterdayFormatted);

    const selectedInitialDate = format(
      startOfDay(yesterdayObject),
      "dd/MM/yyyy"
    );
    const selectedEndDate = format(startOfDay(todayObject), "dd/MM/yyyy");

    setInitialDate(yesterdayFormatted);
    setEndDate(today);
    onClear(selectedInitialDate, selectedEndDate);
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
    <div className="flex gap-3 mt-2 items-center">
      <div>
        <label
          htmlFor="initialDateInput"
          className="block text-sm font-medium text-white pt-3  text-green-800" style={{ color:'#00693c'}}
        >
          Fecha Inicial
        </label>
        <input
          type="date"
          id="initialDateInput"
          className="mt-1 block w-full border border-border rounded-md p-2"
          value={initialDate}
          max={format(new Date(), "yyyy-MM-dd")}
          onChange={handleInitialDateChange}
        />
      </div>
      <div>
        <label
          htmlFor="finalDateInput"
          className="block text-sm font-medium text-white pt-3  text-green-800"style={{ color:'#00693c'}}
        >
          Fecha Final
        </label>
        <input
          type="date"
          id="finalDateInput"
          className="mt-1 block border border-border rounded-md p-2"
          value={endDate}
          min={initialDate} // Final date cannot be earlier than the initial date
          max={format(new Date(), "yyyy-MM-dd")}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className=" grid grid-cols-2 gap-3 mt-10" style={{ width: "250px"}}>
        <button style={{ background:'#00693c'}}
          id="myButton"
          className="bg-green-900 text-primary-foreground hover:bg-primary/80 w-full h-9 text-white rounded-lg"
          onClick={handleFilterClick}
        >
          Filtrar
        </button>
        <button style={{ background:'#222222'}}
          id="ButtonDay"
          className="bg-black text-primary-foreground hover:bg-primary/80 w-full h-9 text-white rounded-lg "
          onClick={handleClearClick}
        >
          Últimos Datos
        </button>
      </div>
    </div>
  );
};

export default DateFilter;
