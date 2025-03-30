import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "./styles/global.css";
import App from "./App.tsx";
import store from "./store/store.ts";
import { ThemeProvider } from "./context/ThemeContext.tsx";

createRoot(document.getElementById("root")! as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
