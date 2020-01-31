import React, { useState } from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import { Home as HomeIcon, Code as CodeIcon } from "@material-ui/icons";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./screens/Home";
import Projects from "./screens/Projects";
import Commits from "./screens/Commits";

export default function App() {
  const [themeType, setThemeType] = useState("dark");
  const [position, setPosition] = useState("");

  const handlePosition = newPosition => {
    setPosition(routesDrawer[newPosition].name);
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

  const routesDrawer = {
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

  const routes = {
    Commits: {
      render: () => <Commits setPosition={handlePosition} />,
      name: "Commits",
      path: "/projects/:projectId/commits",
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
          routes={routesDrawer}
        >
          {Object.keys(routesDrawer).map(route => (
            <Route
              exact
              path={routesDrawer[route].path}
              key={routesDrawer[route].name}
            >
              {routesDrawer[route].render()}
            </Route>
          ))}
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
