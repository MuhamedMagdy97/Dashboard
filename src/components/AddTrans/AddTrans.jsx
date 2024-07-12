import React, { useState, useEffect } from "react";

function AddTrans() {
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAmount, setCustomerAmount] = useState("");
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState(1); // Initialize with ID 1

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!customerId.trim()) {
      setError("Customer ID is required");
      return;
    }

    if (!customerName.trim()) {
      setError("Customer Name is required");
      return;
    }

    if (!customerAmount.trim()) {
      setError("Customer Amount is required");
      return;
    }

    // Assuming your API endpoint for updating customer data
    const apiUrl = `http://localhost:4000/customers/${customerId}`;
    const transactionUrl = `http://localhost:4000/transactions/${transactionId}`;

    try {
      // Fetch customer data to check if customerId exists
      const response = await fetch(apiUrl);
      if (!response.ok) {
        setError("Customer ID does not exist");
        return;
      }

      // Update customer data
      const customerData = await response.json();
      const updatedCustomer = { ...customerData, name: customerName };
      await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCustomer),
      });

      // Create new transaction data
      const newTransaction = {
        id: transactionId, // Use the current transactionId
        customer_id: customerId,
        date: new Date().toISOString(),
        amount: customerAmount,
      };

      // Post new transaction
      await fetch(transactionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      // Clear form and errors after successful update
      setCustomerId("");
      setCustomerName("");
      setCustomerAmount("");
      setError("");

      // Increment transactionId for the next transaction
      setTransactionId(transactionId + 1);
    } catch (error) {
      setError("Failed to update customer data");
      console.error("Error updating customer data:", error);
    }
  };

  // This useEffect ensures that transactionId reflects the latest ID in transactions array on mount
  useEffect(() => {
    // Fetch transactions to get the latest ID
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:4000/transactions");
        if (!response.ok) {
          setError("Failed to fetch transactions");
          return;
        }
        const transactions = await response.json();
        if (transactions.length > 0) {
          // Set transactionId to the last transaction's ID + 1
          setTransactionId(transactions[transactions.length - 1].id + 1);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions");
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container">
      <h3 className="text-center text-main my-3 h1">
        Adding Transaction for Customer
      </h3>
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="form mt-5 ps-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="id" className="form-label">
                  Customer ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  aria-describedby="id"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Customer Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  aria-describedby="name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  value={customerAmount}
                  onChange={(e) => setCustomerAmount(e.target.value)}
                  aria-describedby="amount"
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="btn-cont text-center">
                <button type="submit" className="btn btn-primary me-1 w-75">
                  Edit Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTrans;
