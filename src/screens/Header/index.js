import React from "react";
import {
  Typography,
  Toolbar,
  IconButton,
  AppBar,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Menu as MenuIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

export default function Header({ children, handleThemeType, themeType }) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Grid container alignItems="center">
                <IconButton className={classes.menuButton}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="textPrimary">
                  Photos
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton
                className={classes.menuButton}
                onClick={handleThemeType}
              >
                {themeType === "light" ? (
                  <Brightness4Icon />
                ) : (
                  <Brightness7Icon />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
}
