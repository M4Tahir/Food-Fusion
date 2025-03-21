import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.tsx";
import { useState } from "react";

function App() {
  const a = useState(1);
  
  return <RouterProvider router={routes} />;
}

export default App;
