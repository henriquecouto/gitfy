import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Grid, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

import searchCommits from "../../temp/commits";
import ListCards from "../../components/ListCards";

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
  const { projectId } = useParams();
  const classes = useStyles();
  const [commits, setCommits] = useState([]);
  const [currency, setCurrency] = useState("EUR");

  const loadCommits = () => {
    const finded = searchCommits.filter(v => {
      if (v.projectId === projectId) {
        return v;
      }
    });
    setCommits(finded);
  };

  const handleChange = event => {
    setCurrency(event.target.value);
  };

  useEffect(() => {
    setPosition("Projects");
  });
  useEffect(() => {
    loadCommits();
  }, [projectId]);

  console.log(commits);

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
      <Grid item>
        <ListCards type={"commit"} list={commits} />
      </Grid>
    </Grid>
  );
}
