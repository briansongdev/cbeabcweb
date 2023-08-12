import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";

const colors = {
  brand: {
    100: "#97DFFC",
  },
};

export const theme = extendTheme({
  colors,
  fonts: {
    heading: `'IBM Plex Sans', sans-serif`,
    body: `'IBM Plex Sans', sans-serif`,
  },
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          bg: "white",
        },
      },
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
