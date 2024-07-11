import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Customers from "./components/Customers/Customers";
import Transactions from "./components/Transactions/Transactions";
import AddingCustomer from "./components/AddingCustomer/AddingCustomer";

function App() {
  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/Customers",
          element: <Customers />,
        },
        {
          path: "/Transactions",
          element: <Transactions />,
        },
        {
          path: "/AddingCustomer",
          element: <AddingCustomer />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  );
}

export default App;
