import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import ListCards from "../../components/ListCards";

import { db } from "../../services/firebase";
import ModalAdd from "./ModalAdd";

export default function Projects({ setPosition }) {
  const [modal, setModal] = useState({ open: false });
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    setPosition("Projects");
  });

  const handleModal = () => {
    setModal(modal => ({ ...modal, open: !modal.open }));
  };

  const addProject = async project => {
    console.log("a");
    await db.collection("projects").add({
      ...project,
      user: "1"
    });
    handleModal();
  };

  const loadProjects = () => {
    db.collection("projects")
      .where("user", "==", "1")
      .get()
      .then(querySnapshot => {
        const result = [];
        querySnapshot.forEach(doc => {
          result.push({ id: doc.id, ...doc.data() });
        });
        setProjects(result);
      });
  };

  useEffect(() => {
    loadProjects();
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
