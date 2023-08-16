import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Verify from "../pages/Verify";
import Users from "../admin/page/Users";
import Prodecter from "../components/Prodecter";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/signup',
        element:<Signup/>
      },
      {
        path:'/verify/:token',
        element:<Verify/>
      },
    ]
  },
  {
    path:'/admin',
    element:<Prodecter> <Layout/></Prodecter> ,
    children:[
    {
      path :'/admin/users',
      element:<Users/>
    }
    ]

  },
]);
