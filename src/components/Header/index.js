import React, { useState } from "react";
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
  CssBaseline,
  Hidden,
  SwipeableDrawer,
  ListItemIcon
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Menu as MenuIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon
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
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawer(v => !v);
  };

  const MenuList = () => (
    <List>
      {Object.keys(routes).map(route => (
        <ListItem
          button
          key={routes[route].name}
          component={Link}
          to={routes[route].path}
        >
          <ListItemIcon>{routes[route].icon()}</ListItemIcon>
          <ListItemText primary={routes[route].name} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Grid container alignItems="center">
                <Hidden smUp>
                  <IconButton
                    className={classes.menuButton}
                    onClick={toggleDrawer}
                  >
                    <MenuIcon />
                  </IconButton>
                </Hidden>
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
      <Hidden xsDown>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <MenuList />
        </Drawer>
      </Hidden>
      <Hidden smUp>
        <SwipeableDrawer
          open={drawer}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
        >
          <div className={classes.toolbar} />
          <MenuList />
        </SwipeableDrawer>
      </Hidden>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
