import React from "react";
import Header from "./Header";
import Customers from "../components/Klanten";
import LoginForm from "../components/Login";
import { Navigate } from "react-router-dom";
import PageNotFound from "../validators/PageNotFound";
import Promotions from "../components/Promoties";
import Dates from "../components/Afspraken";
import Klanten from "../components/Klanten";
import Afspraken from "../components/Afspraken";
import Promoties from "../components/Promoties";




// INDENTATION
export const ProtectedRoutes = [
  {
    path: "/",
    element: <Header />,
    errorElement: <PageNotFound/>,
    children: [
      {
        path: "/",
        element: <LoginForm />
      },
      {
        path: '/login',
        element: <LoginForm />
      },
      {
        path: '/afspraken',
        element: <Afspraken />
      },
      {
        path: '/klanten',
        element: <Klanten />
      },
      {
        path: '/promoties',
        element: <Promoties/>
      },
      {
        path: '/*',
        element: <Navigate to='/login' />
      }
    ]
  }
];
