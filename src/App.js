import React, { useState } from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./screens/Header";
import Home from "./screens/Header/Home";

export default function App() {
  const [themeType, setThemeType] = useState("dark");
  const [position, setPosition] = useState("");

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
      <Header
        handleThemeType={handleThemeType}
        themeType={themeType}
        position={position}
      >
        <Router>
          <Route path="/">
            <Home setPosition={v => setPosition(v)} />
          </Route>
        </Router>
      </Header>
    </ThemeProvider>
  );
}
