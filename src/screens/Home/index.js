import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import ListCards from "../../components/ListCards";
import { loadProjects } from "../../services/db";

const commits = [
  {
    name: "Commit 1",
    desc:
      "Esse é o primeiro commit do projeto mais topper que você já viu/verá na face da terra",
    user: "The god",
    date: new Date(),
    id: "#734jhfd"
  },
  {
    name: "Commit 2",
    desc:
      "Esse é o segundo commit do projeto mais topper que você já viu/verá na face da terra",
    user: "The god",
    date: new Date(),
    id: "#jh35kdi"
  },
  {
    name: "Commit 3",
    desc:
      "Esse é o terceito commit do projeto mais topper que você já viu/verá na face da terra",
    user: "The god",
    date: new Date(),
    id: "#01284jrh"
  },
  {
    name: "Commit 4",
    desc:
      "Esse é o quarto commit do projeto mais topper que você já viu/verá na face da terra",
    user: "The god",
    date: new Date(),
    id: "#07hskfh"
  },
  {
    name: "Commit 5",
    desc:
      "Esse é o quinto commit do projeto mais topper que você já viu/verá na face da terra",
    user: "The god",
    date: new Date(),
    id: "#1kjdhah"
  },
  {
    name: "Commit 6",
    desc:
      "Esse é o sexto commit do projeto mais topper que você já viu/verá na face da terra",
    user: "The god",
    date: new Date(),
    id: "#d987jmfh"
  }
];

export default function Home({ setPosition }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const unsubscribe = loadProjects(setProjects, { limit: 6 });
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
      <Grid item>{/* <ListCards type={"commit"} list={commits} /> */}</Grid>
    </Grid>
  );
}
