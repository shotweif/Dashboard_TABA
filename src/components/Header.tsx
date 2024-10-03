import React from "react";
import imageLogo from "../assets/logoProdubanco.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  // Navegación
  const navigate = useNavigate();
  const location = useLocation();

  const HomePage = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const TestingPage = () => {
    if (location.pathname !== "/pagina-de-prueba") {
      navigate("/pagina-de-prueba");
    }
  };

  return (
    <div className="block relative w-full shadow bg-white text-green-800 cursor-default p-4">
      <div className="w-full grid grid-cols-6 border-solid border-[1px] border-gray-300">
        <div className="col-span-4 w-full flex items-center">
          <img src={imageLogo} className="h-10 px-4" />
          <h2 className="text-xl font-bold text-primary text-green-800 leading-10">
            Monitoreo de transacciones WIP
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
