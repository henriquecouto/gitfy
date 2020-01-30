import React, { useState } from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import { Home as HomeIcon, Code as CodeIcon } from "@material-ui/icons";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./screens/Header";
import Home from "./screens/Home";
import Projects from "./screens/Projects";

export default function App() {
  const [themeType, setThemeType] = useState("dark");
  const [position, setPosition] = useState("");

  const handlePosition = newPosition => {
    setPosition(routes[newPosition].name);
  };

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

  const routes = {
    Home: {
      render: () => <Home setPosition={handlePosition} />,
      name: "Início",
      path: "/",
      icon: () => <HomeIcon />
    },
    Projects: {
      render: () => <Projects setPosition={handlePosition} />,
      name: "Projetos",
      path: "/projects",
      icon: () => <CodeIcon />
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header
          handleThemeType={handleThemeType}
          themeType={themeType}
          position={position}
          routes={routes}
        >
          {Object.keys(routes).map(route => (
            <Route exact path={routes[route].path} key={routes[route].name}>
              {routes[route].render()}
            </Route>
          ))}
        </Header>
      </Router>
    </ThemeProvider>
  );
}
