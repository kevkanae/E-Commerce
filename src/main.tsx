import "./index.css";
import React from "react";
import Router from "./Router";
import { theme } from "./utils/Theme";
import ReactDOM from "react-dom/client";
import { createClient, Provider } from "urql";
import { ChakraProvider } from "@chakra-ui/react";
import { useToken } from "./services/useToken.Hook";

const client = createClient({
  url: "http://localhost:8080/graphql",
  fetchOptions: () => {
    const token = useToken();
    return {
      credentials: "include",
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
