import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound/Notfound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoteContextProvider from "./Context/NoteContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <Notfound /> },
]);

export default function App() {
  return (
    <>
      <NoteContextProvider>
        <RouterProvider router={routes} />
        <ToastContainer />
      </NoteContextProvider>
    </>
  );
}
