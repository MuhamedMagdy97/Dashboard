import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const fetchCustomers = async () => {
  const response = await fetch("http://localhost:4000/customers");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const fetchTransactions = async () => {
  const response = await fetch("http://localhost:4000/transactions");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function Charts() {
  const customersQuery = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });

  const transactionsQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  const {
    data: customers,
    error: customersError,
    isLoading: customersLoading,
  } = customersQuery;
  const {
    data: transactions,
    error: transactionsError,
    isLoading: transactionsLoading,
  } = transactionsQuery;

  const [amounts, setAmounts] = useState([]);

  useEffect(() => {
    if (transactions) {
      // Initialize amounts state based on transactions
      setAmounts(transactions.map(() => 0));

      const timers = transactions.map((transaction, index) => {
        const targetAmount = transaction.amount;

        return setInterval(() => {
          setAmounts((prevAmounts) => {
            const newAmounts = [...prevAmounts];
            if (newAmounts[index] < targetAmount) {
              newAmounts[index] = Math.min(newAmounts[index] + 1, targetAmount);
            } else {
              clearInterval(timers[index]);
            }
            return newAmounts;
          });
        }, 1);
      });

      return () => timers.forEach((timer) => clearInterval(timer)); // Cleanup
    }
  }, [transactions]);

  if (customersLoading || transactionsLoading) {
    return <div>Loading...</div>;
  }

  if (customersError || transactionsError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center mt-5">
          <h2 className="h4 text-sub me-5 mb-5">Customer Charts</h2>
        </div>
      </div>
      <div className="row ms-5">
        <div className="col-md-9 ms-5">
          <table className="table">
            <thead className="text-center">
              <tr>
                <th className="border" scope="col">
                  Transaction Id
                </th>
                <th className="border" scope="col">
                  Name
                </th>
                <th className="border" scope="col">
                  Date
                </th>
                <th className="border" scope="col">
                  Chart
                </th>
              </tr>
            </thead>
            <tbody className="text-center border">
              {transactions.map((transaction, index) => {
                const customer = customers.find(
                  (cust) => cust.id == Number(transaction.customer_id)
                );

                const data = {
                  labels: [`Transaction ${transaction.id}`],
                  datasets: [
                    {
                      label: "Transaction Amount",
                      data: [amounts[index], 40000 - amounts[index]],
                      backgroundColor: [
                        "rgba(0, 123, 255, 0.6)",
                        "rgba(180, 110, 211, 0.6)",
                      ],
                      borderColor: "rgba(255,255,255,1)",
                      borderWidth: 1,
                    },
                  ],
                };

                const options = {
                  maintainAspectRatio: false,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: (context) => `Amount: ${context.raw}`,
                      },
                    },
                    legend: {
                      display: false,
                    },
                  },
                };

                return (
                  <tr className="border" key={transaction.id}>
                    <th scope="row">
                      <div className="text-center mt-5">{transaction.id}</div>
                    </th>
                    <td>
                      <div className="text-center mt-5">
                        {customer ? customer.name : "Unknown"}
                      </div>
                    </td>
                    <td>
                      <div className="text-center mt-5">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <div
                        className="ms-5 text-center"
                        style={{
                          position: "relative",
                          width: "100px",
                          height: "100px",
                        }}
                      >
                        <Pie data={data} options={options} />
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "#FFF",
                          }}
                        >
                          <strong>{amounts[index]}</strong>
                        </div>
                      </div>
                    </td>
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

export default Charts;
