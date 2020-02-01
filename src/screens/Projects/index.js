import React, { useEffect, useState, useContext } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import ListCards from "../../components/ListCards";

import { db } from "../../services/firebase";
import ModalAdd from "./ModalAdd";
import { loadProjects, addData } from "../../services/db";

export default function Projects({ setPosition }) {
  const [modal, setModal] = useState({ open: false });
  const [projects, setProjects] = useState([]);

  const handleModal = () => {
    setModal(modal => ({ ...modal, open: !modal.open }));
  };

  const addProject = async project => {
    const result = await addData("projects", project);
    if (result.status) {
      handleModal();
    } else {
      console.log("erro");
    }
  };

  useEffect(() => {
    const unsubscribe = loadProjects(setProjects, { limit: 50 });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setPosition("Projects");
  });

  return (
    <>
      <ModalAdd state={modal} handle={handleModal} add={addProject} />
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Grid container justify="space-between" alignItems="center">
            <Typography variant="h4">Projetos</Typography>
            <Button variant="contained" onClick={handleModal} color="primary">
              Adicionar Projeto
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <ListCards type={"project"} list={projects} />
        </Grid>
        <Grid item />
      </Grid>
    </>
  );
}
