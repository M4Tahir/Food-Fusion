import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout.tsx";
import DarkTestComponent from "../components/DarkTestComponent.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "test",
        element: <DarkTestComponent/>
      },
    ],
  },
]);

export default routes;
