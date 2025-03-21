import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "test",
        element: (
          <p className="p-2 p-6 text-xl font-bold text-sky-900">
            Hello, from test
          </p>
        ),
      },
    ],
  },
]);

export default routes;
