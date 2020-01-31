import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import ListProjects from "../../components/ListProjects";

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

export default function Projects({ setPosition }) {
  useEffect(() => {
    setPosition("Projects");
  });
  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Typography variant="h4">Projetos</Typography>
      </Grid>
      <Grid item>
        <ListProjects type={"project"} list={projects} />
      </Grid>
      <Grid item />
    </Grid>
  );
}
