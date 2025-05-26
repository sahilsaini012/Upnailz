import React from "react";
import Header from "./Header";
import ForgotPassword from "../components/ForgotPassword";
import FormContainer from "../services/FormContainer";
import InputField from "../loginpagecontainer/InputField";
import ErrorMessage from "../loginpagecontainer/ErrorMessage";
import ResetPassword from "../components/ResetPassword";
import LoginForm from "../components/Login";
import PageNotFound from "../validators/PageNotFound";


// INDENTATION
export const Public = [
  {
    path: "/",
    element: <Header />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: '/',
        element: <LoginForm />
      },
      {
        path: '/login',
        element: <LoginForm />
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      },
      {
        path: '/formcontainer',
        element: <FormContainer />
      },
      {
        path: '/inputfield',
        element: <InputField />
      },
      {
        path: '/errormessage',
        element: <ErrorMessage />
      },
      {
        path: 'reset-password/:token',
        element: <ResetPassword />
      },
    ]
  }
];
