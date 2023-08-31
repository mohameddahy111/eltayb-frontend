import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Verify from "../pages/Verify";
import Users from "../admin/page/Users";
import Prodecter from "../components/Prodecter";
import UserDetials from "../admin/page/UserDetials";
import Productes from "../admin/page/Productes";
import ProducteDetials from "../admin/page/producteDetials";
import TableOfProductes from "../components/TableOfProductes";
import AddProducte from "../components/AddProducte";
import EidteProducte from "../components/EidteProducte";
import Category from "../components/Category";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/verify/:token",
        element: <Verify />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <Prodecter>
        {" "}
        <Layout />
      </Prodecter>
    ),
    children: [
      {
        path: "/admin/users",
        element: <Users />,
      },
      {
        path: "/admin/users/:id",
        element: <UserDetials />,
      },
      {
        path: "/admin/productes/",
        element: <Productes />,
        children: [
          {
            index: true,
            element: <TableOfProductes />,
          },
          { path: "/admin/productes/add", element: <AddProducte /> },
          { path: "/admin/productes/edite/:id", element: <EidteProducte /> },
          { path: "/admin/productes/category", element: <Category /> },
        ],
      },
      {
        path: "/admin/producte/:id",
        element: <ProducteDetials />,
      },
    ],
  },
]);
