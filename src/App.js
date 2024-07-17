import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerTable from './components/CustomerTable';
import TransactionGraph from './components/TransactionGraph';
import './App.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersResponse = await axios.get('http://localhost:8000/customers');
        const transactionsResponse = await axios.get('http://localhost:8000/transactions');
        setCustomers(customersResponse.data);
        setTransactions(transactionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className='text-3xl font-bold mb-4'>Customer Transactions</h1>
      <CustomerTable 
        customers={customers}
        transactions={transactions}
      />
      <TransactionGraph transactions={transactions} customers={customers} />
    </div>
  );
}

export default App;
