import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout.tsx";
import { Home, PageNotFound } from "../pages";

const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "recipes",
        element: <p>Some recipes.</p>
      }

    ]

  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <p>Login Page</p>
      },
      {
        path: "signup",
        element: <p>Signup Page</p>

      }
    ]
  }

]);

export default routes;
