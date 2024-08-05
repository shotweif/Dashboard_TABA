// ActiveUsersTransactions.tsx
import React, { useEffect, useState } from 'react';

var activeUsers = "3,456";
var totalTransactions = "1,768";
var historicalTotal = "1000,768";

const UsersTransactions: React.FC = () => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-secondary text-green-600">Usuarios Activos</h3>
            <p className="text-4xl font-bold text-primary-foreground">{activeUsers}</p>

            <h3 className="text-lg font-semibold text-secondary text-green-600 pt-10">Total de Transacciones</h3>
            <p className="text-4xl font-bold text-primary-foreground">{totalTransactions}</p>

            <h3 className="text-lg font-semibold text-secondary text-green-600 pt-10">Total Histórico</h3>
            <p className="text-4xl font-bold text-primary-foreground">{historicalTotal}</p>
        </div>
    );
};

export default UsersTransactions;
