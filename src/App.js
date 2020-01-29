import React from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import HelloWorld from "./HelloWorld";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light"
        }
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <HelloWorld />
    </ThemeProvider>
  );
}

export default App;
