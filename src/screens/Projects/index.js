import React, { useEffect, useState, useContext } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import ListCards from "../../components/ListCards";

import { db } from "../../services/firebase";
import ModalAdd from "./ModalAdd";
import { loadData } from "../../services/db";

export default function Projects({ setPosition }) {
  const [modal, setModal] = useState({ open: false });
  const [projects, setProjects] = useState([]);

  const handleModal = () => {
    setModal(modal => ({ ...modal, open: !modal.open }));
  };

  const addProject = async project => {
    await db.collection("projects").add({
      ...project,
      user: "1",
      registrationDate: new Date()
    });
    handleModal();
  };

  useEffect(() => {
    const unsubscribe = loadData(setProjects);
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
