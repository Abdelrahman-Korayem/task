import React, { useState, useEffect } from 'react';

function CustomerTable({ customers, transactions, onSelectCustomer }) {
  const [filterName, setFilterName] = useState('');
  const [filterAmount, setFilterAmount] = useState('');
  const [customerAmounts, setCustomerAmounts] = useState({});

  useEffect(() => {
    const calculateCustomerAmounts = () => {
      const amounts = transactions.reduce((acc, transaction) => {
        const { customer_id, amount } = transaction;
        if (!acc[customer_id]) {
          acc[customer_id] = 0;
        }
        acc[customer_id] += amount;
        return acc;
      }, {});
      setCustomerAmounts(amounts);
    //   console.log(amounts,'amounts');
      console.log(transactions,'transactions from customer table');
    };
    calculateCustomerAmounts();
  }, [transactions]);

  const filteredCustomers = customers.filter(customer => {
    const totalAmount = customerAmounts[customer.id] || 0;
    return (
      customer.name.toLowerCase().includes(filterName.toLowerCase()) &&
      (filterAmount === '' || totalAmount.toString().includes(filterAmount))
    );
  });

  return (
    <div className="mb-4">
    <div className="mb-2 flex space-x-4 ">
      <input 
        type="text"
        placeholder="Filter by name"
        value={filterName}
        onChange={e => setFilterName(e.target.value)}
        className="border p-2 rounded w-full text-center"
      />
      <input
        type="text"
        placeholder="Filter by amount"
        value={filterAmount}
        onChange={e => setFilterAmount(e.target.value)}
        className="border p-2 rounded w-full text-center"
      />
    </div>
    <table className="min-w-full bg-white border border-gray-300 rounded text-center">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b bg-gray-100 text-center">Name</th>
          <th className="py-2 px-4 border-b bg-gray-100 text-center">Total Transaction Amount</th>
        </tr>
      </thead>
      <tbody>
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map(customer => (
            <tr 
              key={customer.id} 
             
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="py-2 px-4 border-b">{customer.name}</td>
              <td className="py-2 px-4 border-b">{customerAmounts[customer.id] || 0}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={2} className="py-2 px-4 border-b text-center text-gray-500">No customers found.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  
  );
}

export default CustomerTable;
