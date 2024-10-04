// ActiveUsersTransactions.tsx
import React, { useEffect, useState } from 'react';
import BarChartActiveUsers from './BarChartActiveUsers';

interface UsersTransactionsProps {
    activeUsers: number;
    totalTransactions: number;
}

const UsersTransactions: React.FC <UsersTransactionsProps> = ({activeUsers, totalTransactions}) => {
    return (
        <div>          
             <h3 className="text-lg font-semibold text-secondary " style={{ color:'#00693c'}}>Usuarios Activos</h3>
            <p className="text-4xl font-bold text-primary-foreground pb-10">{activeUsers}</p> 
            {/*<BarChartActiveUsers activeUsers={activeUsers} inactiveUsers={inactiveUsers} />*/}
            <h3 className="text-lg font-semibold text-secondary " style={{ color:'#00693c'}}>Total de Transacciones</h3>
            <p className="text-4xl font-bold text-primary-foreground">{totalTransactions}</p>
        </div>
    );
};

export default UsersTransactions;
