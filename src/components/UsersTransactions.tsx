// ActiveUsersTransactions.tsx
import React, { useEffect, useState } from 'react';

interface UsersTransactionsProps {
    activeUsers: number;
    totalTransactions: number;
    historicalTotal: number;
}

const UsersTransactions: React.FC <UsersTransactionsProps> = ({activeUsers, totalTransactions, historicalTotal}) => {
    return (
        <div>
            {/* <h3 className="text-lg font-semibold text-secondary text-green-600">Usuarios Activos</h3>
            <p className="text-4xl font-bold text-primary-foreground">{activeUsers.toLocaleString()}</p> */}
            <h3 className="text-lg font-semibold text-secondary text-green-600">Total Histórico</h3>
            <p className="text-4xl font-bold text-primary-foreground">{historicalTotal.toLocaleString()}</p>
            
            <h3 className="text-lg font-semibold text-secondary text-green-600 pt-10">Total Diaria</h3>
            <p className="text-4xl font-bold text-primary-foreground">{totalTransactions.toLocaleString()}</p>
        </div>
    );
};

export default UsersTransactions;
