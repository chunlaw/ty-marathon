import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { AppContextProvider } from "./context/AppContext";
import { BrowserRouter } from "react-router-dom";
import { DbContextProvider } from "./context/DbContext.tsx";

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Chiron Hei HK WS"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
    ].join(","),
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DbContextProvider>
        <AppContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppContextProvider>
      </DbContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
