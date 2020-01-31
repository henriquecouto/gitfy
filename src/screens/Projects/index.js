import React, { useEffect } from "react";
import { Grid, Hidden, Typography, Divider } from "@material-ui/core";
import GitfyCard from "../../components/GitfyCard";


const ListProjects = ({ type, list }) => {
  const openItem = (item)=>{
    console.log(item)
  }
  return (
    <Grid container spacing={2}>
      <Hidden mdDown>
        {list.map(v => (
          <Grid item xs={4} key={v.id}>
            <GitfyCard item={v} type={type} openItem={()=>openItem(type+String(v.id))}/>
          </Grid>
        ))}
      </Hidden>
      <Hidden lgUp>
        {list.map(v => (
          <Grid item xs={12} key={v.id}>
            <GitfyCard item={v} type={type} openItem={()=>openItem(type+String(v.id))}/>
          </Grid>
        ))}
      </Hidden>
    </Grid>
  );
};

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
