import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import { theme } from "./utils/Theme";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "http://localhost:8080/graphql",
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider value={client}>
        <Router />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
