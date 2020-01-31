import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import ListCards from "../../components/ListCards";

const projects = [
  {
    name: "Projeto Topper",
    desc: "Esse é o projeto mais topper que você já viu/verá na face da terra",
    lang: "God's Lang",
    id: 1
  },
  {
    name: "Projeto Mais Foda",
    desc:
      "Esse é o projeto mais foda que o mais topper que você já viu/verá na face da terra",
    lang: "Nordic God's Lang",
    id: 2
  },
  {
    name: "Projeto Topper",
    desc: "Esse é o projeto mais topper que você já viu/verá na face da terra",
    lang: "God's Lang",
    id: 3
  },
  {
    name: "Projeto Mais Foda",
    desc:
      "Esse é o projeto mais foda que o mais topper que você já viu/verá na face da terra",
    lang: "Nordic God's Lang",
    id: 4
  },
  {
    name: "Projeto Topper",
    desc: "Esse é o projeto mais topper que você já viu/verá na face da terra",
    lang: "God's Lang",
    id: 5
  },
  {
    name: "Projeto Mais Foda",
    desc:
      "Esse é o projeto mais foda que o mais topper que você já viu/verá na face da terra",
    lang: "Nordic God's Lang",
    id: 6
  }
];

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
