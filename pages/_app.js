import "@/styles/globals.css";
import { ChakraProvider, theme } from "@chakra-ui/react";
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

export const newTheme = extendTheme({
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
    NumberInput: {
      parts: ["field", "stepper"],
      sizes: {
        noBorder: {
          stepper: {
            ...theme.components.NumberInput.sizes.md.stepper,
            _first: {
              borderTopEndRadius: "none",
            },
            _last: {
              ...theme.components.NumberInput.sizes.md.stepper._last,
              borderBottomEndRadius: "none",
            },
          },
          field: {
            ...theme.components.NumberInput.sizes.md.field,
            borderRadius: "none",
          },
        },
      },
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={newTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
