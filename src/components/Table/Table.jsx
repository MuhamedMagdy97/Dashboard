import React from "react";
import { useCustomers } from "../../Hooks/useCustomers";
import { useTransactions } from "../../Hooks/useTransactions";

function Table() {
  const {
    data: customers,
    error: customersError,
    isLoading: customersLoading,
  } = useCustomers();
  const {
    data: transactions,
    error: transactionsError,
    isLoading: transactionsLoading,
  } = useTransactions();

  if (customersLoading || transactionsLoading) {
    return <div>Loading...</div>;
  }

  if (customersError) {
    return <div>Error fetching customers: {customersError.message}</div>;
  }

  if (transactionsError) {
    return <div>Error fetching transactions: {transactionsError.message}</div>;
  }

  // Combine customer and transaction data
  const combinedData = transactions.map(function (transaction) {
    const customer = customers.find(function (cust) {
      return cust.id === String(transaction.customer_id);
    });
    return {
      ...transaction,
      customerName: customer ? customer.name : "Unknown",
    };
  });

  return (
    <div className="Table">
      <div className="row">
        <div className="col-md-8">
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {combinedData.map(function (entry) {
                return (
                  <tr key={entry.id}>
                    <th scope="row">{entry.id}</th>
                    <td>{entry.customerName}</td>
                    <td>{entry.amount}</td>
                    <td>{new Date(entry.date).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
