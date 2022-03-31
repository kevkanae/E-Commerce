import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { theme } from "../utils/Theme";
import "../styles/main.scss";
import "@fontsource/poppins";
import "@fontsource/pacifico";
import { Provider } from "react-redux";
import { store } from "../redux/Store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}
export default MyApp;
