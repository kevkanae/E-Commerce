import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import { theme } from "./utils/Theme";
import { createClient, Provider } from "urql";
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
