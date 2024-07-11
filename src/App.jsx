import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";



function App() {
  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path:"/",
          element:<Home/>,
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
