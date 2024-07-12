import React, { useState } from "react";
import { useCustomers } from "../../Hooks/useCustomers";
import { useTransactions } from "../../Hooks/useTransactions";

function Table({ showActions }) {
  const {
    data: customers,
    error: customersError,
    isLoading: customersLoading,
  } = useCustomers();
  const {
    data: transactions,
    error: transactionsError,
    isLoading: transactionsLoading,
    refetch: refetchTransactions,
  } = useTransactions();

  const [editId, setEditId] = useState(null); 
  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleDelete = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      await fetch(`http://localhost:4000/customers/${customerId}`, {
        method: "DELETE",
      });

      const customerTransactions = transactions.filter(
        (transaction) => transaction.customer_id === customerId
      );
      const deletePromises = customerTransactions.map((transaction) =>
        fetch(`http://localhost:4000/transactions/${transaction.id}`, {
          method: "DELETE",
        })
      );
      await Promise.all(deletePromises);

      refetchTransactions();
    }
  };

  if (customersLoading || transactionsLoading) {
    return <div>Loading...</div>;
  }

  if (customersError) {
    return <div>Error fetching customers: {customersError.message}</div>;
  }

  if (transactionsError) {
    return (
      <div>Error fetching transactions: {transactionsError.message}</div>
    );
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
        <div className="col-md-9">
          <table className="table text-center">
            <thead className="border">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
                {showActions && (
                  <>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {combinedData.map((entry) => (
                <tr key={entry.id}>
                  <th scope="row">{entry.id}</th>
                  <td>{entry.customerName}</td>
                  <td>{entry.amount}</td>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                  {showActions && (
                    <>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleEdit(entry.id)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(entry.customer_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
