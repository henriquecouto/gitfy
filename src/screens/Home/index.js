import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import ListCards from "../../components/ListCards";
import { loadProjects, loadCommits } from "../../services/db";

export default function Home({ setPosition }) {
  const [projects, setProjects] = useState([]);
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const unsubscribe = loadProjects(setProjects, { limit: 6 });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = loadCommits(setCommits, { limit: 6 });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setPosition("Home");
  });

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Typography variant="h4">Projetos recentes</Typography>
      </Grid>
      <Grid item>
        <ListCards type={"project"} list={projects} />
      </Grid>
      <Grid item />
      <Grid item>
        <Typography variant="h4">Commits recentes</Typography>
      </Grid>
      <Grid item>
        <ListCards type={"commit"} list={commits} />
      </Grid>
    </Grid>
  );
}
