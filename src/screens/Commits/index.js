import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Grid, Typography, Button, IconButton, Fab } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useParams } from "react-router-dom";

import ListCards from "../../components/ListCards";
import { loadCommits, loadBranchs, addData } from "../../services/db";
import GitfyModal from "../../components/GitfyModal";

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
  const [branchs, setBranchs] = useState([]);
  const [modal, setModal] = useState({ open: false });
  const [formBranch, setFormBranch] = useState({ name: "" });
  const [selectedBranch, SetSelectedBranch] = useState({});

  useEffect(() => {
    setPosition("Projects");
  });

  useEffect(() => {
    const unsubscribe = loadCommits(setCommits, {
      projectId: projectId,
      branchId: "1",
      limit: 50
    });
    return () => unsubscribe();
  }, [projectId]);

  useEffect(() => {
    const unsubscribe = loadBranchs(setBranchs, {
      projectId: projectId
    });
    return () => unsubscribe();
  }, [projectId]);

  const handleModal = () => {
    setModal(v => ({ ...v, open: !v.open }));
  };

  const save = async () => {
    const result = await addData("branchs", { ...formBranch, projectId });
    if (result.status) {
      handleModal();
    } else {
      console.log(result.error);
    }
  };

  const onChangeFormBranch = ({ target: { id, value } }) => {
    setFormBranch(old => ({ ...old, [id]: value }));
  };

  const onChangeSelectedBranch = ({ target: { value } }) => {
    SetSelectedBranch(value);
  };

  return (
    <>
      <GitfyModal
        handleClose={handleModal}
        open={modal.open}
        title="Adicionar Branch"
        actions={[
          () => {
            return (
              <div>
                <Button onClick={handleModal}>Cancelar</Button>
                <Button variant="contained" onClick={save} color="primary">
                  Adicionar
                </Button>
              </div>
            );
          }
        ]}
      >
        <TextField
          id="name"
          label="Nome da Branch"
          autoFocus
          margin="normal"
          variant="outlined"
          onChange={onChangeFormBranch}
          value={formBranch.name}
        />
      </GitfyModal>

      {!branchs.length && (
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="column"
          spacing={6}
          onClick={handleModal}
          style={{ cursor: "pointer" }}
        >
          <Grid item>
            <Fab color="primary" size="large" onClick={handleModal}>
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item>
            <Typography variant="h4">
              É hora de criar a primeira Branch do Projeto{" "}
              <span role="img" aria-label="Emoji sorrindo">
                😄️
              </span>
            </Typography>
          </Grid>
        </Grid>
      )}

      {!!branchs.length && (
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
                  value={selectedBranch}
                  onChange={onChangeSelectedBranch}
                  variant="outlined"
                >
                  {branchs.map(option => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
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
      )}
    </>
  );
}
