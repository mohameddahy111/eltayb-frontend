import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StorgStateProvider } from "./context/StorgState";
import { SnackbarProvider } from "notistack";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <StorgStateProvider>
        <App />
      </StorgStateProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
