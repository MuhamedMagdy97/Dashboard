import React from "react";
import { useCustomers } from "../../Hooks/useCustomers";
import { useTransactions } from "../../Hooks/useTransactions";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function Table({ showActions, showCustomerId, searchTerm }) {
  const navigate = useNavigate();
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

  const handleEdit = (id) => {
    navigate(`/AddTrans?customerId=${id}`);
  };

  const handleDelete = async (transactionId) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      await fetch(`http://localhost:4000/transactions/${transactionId}`, {
        method: "DELETE",
      });
      refetchTransactions();
    }
  };

  if (customersLoading || transactionsLoading) {
    return <LoadingSpinner />;
  }

  if (customersError) {
    return <div className="text-center">{customersError.message}</div>;
  }

  if (transactionsError) {
    return <div className="text-center">{transactionsError.message}</div>;
  }

  const combinedData = transactions.map((transaction) => {
    const customer = customers.find(
      (cust) => cust.id === String(transaction.customer_id)
    );
    return {
      ...transaction,
      customerName: customer ? customer.name : "Unknown",
    };
  });

  const filteredData = combinedData.filter((entry) => {
    const nameMatch = entry.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const amountMatch = entry.amount.toString().includes(searchTerm);
    return nameMatch || amountMatch;
  });

  return (
    <div className="table-responsive">
      <table className="table text-center brd-rad">
        <thead className="border">
          <tr>
            <th scope="col">{showCustomerId ? "CustomerId" : "TransactionId"}</th>
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
          {filteredData.map((entry) => (
            <tr key={entry.id}>
              <th scope="row">{showCustomerId ? entry.customer_id : entry.id}</th>
              <td>{entry.customerName}</td>
              <td>{entry.amount}</td>
              <td>{new Date(entry.date).toLocaleDateString()}</td>
              {showActions && (
                <>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(entry.customer_id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(entry.id)}
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
  );
}

export default Table;
