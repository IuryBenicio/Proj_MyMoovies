import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalStyles } from "./GlobalStyles";
import { Provider } from "react-redux";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./app";
// import Header from "./components/Header/header";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
