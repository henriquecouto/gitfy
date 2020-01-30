import React from "react";
import {
  Typography,
  Toolbar,
  IconButton,
  AppBar,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Menu as MenuIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Inbox as InboxIcon,
  Mail as MailIcon
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}));

export default function Header({
  children,
  handleThemeType,
  themeType,
  position,
  routes
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Grid container alignItems="center">
                <IconButton className={classes.menuButton}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="textPrimary">
                  {position}
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
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {Object.keys(routes).map(route => (
            <ListItem
              button
              key={routes[route].name}
              component={Link}
              to={routes[route].path}
            >
              <ListItemText primary={routes[route].name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
