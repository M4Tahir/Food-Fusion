import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout.tsx";
import { DarkTestComponent } from "../components";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "recipes",
        element: <p>Some recipes.</p>
      },
      {
        path: "test",
        element: <DarkTestComponent />
      }
    ]

  },
  {
    path: "/login",
    element: <p>Login Page</p>
  },
  {
    path: "/signup",
    element: <p>Login Page</p>

  }
]);

export default routes;
