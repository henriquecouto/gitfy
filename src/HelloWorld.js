import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default
  }
}));

export default function HelloWorld() {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <Typography color="textPrimary">Hello Gitfy</Typography>
    </Grid>
  );
}
