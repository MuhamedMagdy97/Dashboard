import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Customers from "./components/Customers/Customers";
import Transactions from "./components/Transactions/Transactions";
import AddingCustomer from "./components/AddingCustomer/AddingCustomer";
import AddTrans from "./components/AddTrans/AddTrans";
import Charts from "./components/Charts/Charts";

function App() {
  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
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
        {
          path: "/AddTrans",
          element: <AddTrans />,
        },
        {
          path: "/Charts",
          element: <Charts />,
        },
        {
          path: "*",
          element: <Navigate to="/" />,
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
