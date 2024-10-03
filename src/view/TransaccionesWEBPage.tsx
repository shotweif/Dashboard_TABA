import React, { useState } from "react";
import DateFilter from "../components/DateFilter";
import TransaccionesWEP from "./TransaccionesWEP";
import { format, subDays, startOfDay } from "date-fns";
import Header from "../components/Header";

const TransaccionesWEPPage: React.FC = () => {
  const yesterday = subDays(new Date(), 1);
  const formattedYesterday = format(startOfDay(yesterday), "dd/MM/yyyy");
  const today = format(startOfDay(new Date()), "dd/MM/yyyy");

  const [initialDate, setInitialDate] = useState<string>(formattedYesterday);
  const [endDate, setEndDate] = useState<string>(today);

  const handleFilterClick = (
    filterInitialDate: string,
    filterEndDate: string
  ) => {
    setInitialDate(filterInitialDate);
    setEndDate(filterEndDate);
  };

  const handleClearClick = (
    filterInitialDate: string,
    filterEndDate: string
  ) => {
    setInitialDate(filterInitialDate);
    setEndDate(filterEndDate);
  };

  return (
    <div>
      {/* Header */}
      <Header></Header>
      <div className="">
        <div className="col-span-1 pl-9">
          <DateFilter onFilter={handleFilterClick} onClear={handleClearClick} />
        </div>
        {/* You can pass additional components here if needed */}
      </div>
      <TransaccionesWEP initialDate={initialDate} endDate={endDate} />
    </div>
  );
};

export default TransaccionesWEPPage;
