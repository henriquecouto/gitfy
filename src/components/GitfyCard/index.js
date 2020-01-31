import React from "react";
import { Typography, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    height: "auto",
    width: "auto",
    padding: theme.spacing(3)
  }
}));

export default function GitfyCard({ item }) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <Typography variant="h6">Titulo {item}</Typography>
          <Typography variant="subtitle1">
            {`A descrição do projeto ${item} deverá ser mostrada aqui de acordo com o a descrição do github dsaoud dsaiduas iodu asdusaou`.substring(
              0,
              100
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container justify="flex-end">
            <Typography variant="subtitle2">Linguagem {item}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
