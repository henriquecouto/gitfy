import React, { useState } from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import Header from "./screens/Header";

export default function App() {
  const [themeType, setThemeType] = useState("dark");
  const handleThemeType = () => {
    setThemeType(v => (v === "light" ? "dark" : "light"));
  };
  const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: ${themeType})`);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "light" : "dark"
        }
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Header handleThemeType={handleThemeType} themeType={themeType}>
        Hello World
      </Header>
    </ThemeProvider>
  );
}
