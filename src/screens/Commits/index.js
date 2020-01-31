import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Grid, Typography } from "@material-ui/core";

const currencies = [
  {
    value: "USA"
  },
  {
    value: "EUR"
  },
  {
    value: "BTC"
  },
  {
    value: "JPY"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    width: 350
  }
}));

export default function Commits({ setPosition }) {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("EUR");

  const handleChange = event => {
    setCurrency(event.target.value);
  };

  useEffect(() => {
    setPosition("Projects");
  });
  return (
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Typography variant="h5">Selecionar Branch</Typography>
          </Grid>
          <Grid item>
            <TextField
              className={classes.root}
              id="filled-select-currency"
              select
              value={currency}
              onChange={handleChange}
              variant="outlined"
            >
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h4">Commits</Typography>
      </Grid>
    </Grid>
  );
}
