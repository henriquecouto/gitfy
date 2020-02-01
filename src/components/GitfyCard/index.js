import React from "react";
import { Typography, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import "moment/locale/pt-br";

const useStyles = makeStyles(theme => ({
  paper: {
    height: 250,
    padding: theme.spacing(3),
    cursor: "pointer"
  }
}));

export default function GitfyCard({ type, item, openItem }) {
  const classes = useStyles();
  console.log(item);
  return (
    <Paper className={classes.paper} onClick={openItem}>
      <Grid
        container
        direction="column"
        justify="space-between"
        style={{ height: "100%" }}
      >
        <Grid item>
          <Grid container justify="space-between" alignItems="flex-start">
            {type === "project" && (
              <Typography variant="h6">{item.name}</Typography>
            )}
            {type === "commit" && (
              <Typography variant="h6">{item.desc}</Typography>
            )}
            {type === "commit" && (
              <Typography variant="subtitle2">
                {type === "project" ? item.id : item.hash}
              </Typography>
            )}
          </Grid>
          {type === "project" && (
            <Typography variant="subtitle1">
              {item.desc.substring(0, 100)}
            </Typography>
          )}
        </Grid>
        <Grid item>
          <Grid container justify="flex-end">
            {type === "project" && (
              <Typography variant="subtitle2">{item.lang}</Typography>
            )}
            {type === "commit" && (
              <Typography variant="subtitle2">
                {item.user} em {moment(item.date).format("llll")}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
