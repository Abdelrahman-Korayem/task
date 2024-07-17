import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function TransactionGraph({ transactions, customers }) {
  // Prepare data for all customers
  const dataMap = {};

  // Initialize data map with dates as keys
  transactions.forEach(transaction => {
    const { date, customer_id, amount } = transaction;

    if (!dataMap[date]) {
      dataMap[date] = { date };
      customers.forEach(customer => {
        dataMap[date][customer.id] = 0;
      });
    }

    dataMap[date][customer_id] += amount;
  });

  // Convert data map to array
  const data = Object.values(dataMap);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          {customers.map(customer => (
            <linearGradient key={customer.id} id={`color${customer.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={`#${Math.floor(Math.random()*16777215).toString(16)}`} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={`#${Math.floor(Math.random()*16777215).toString(16)}`} stopOpacity={0}/>
            </linearGradient>
          ))}
        </defs>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        {customers.map(customer => (
          <Area
            key={customer.id}
            type="monotone"
            dataKey={customer.id}
            stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}
            fillOpacity={1}
            fill={`url(#color${customer.id})`}
            name={customer.name}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default TransactionGraph;
