import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Grid, Typography, Button, Fab } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useParams } from "react-router-dom";

import ListCards from "../../components/ListCards";
import { loadCommits, loadBranchs, addData } from "../../services/db";
import ModalAddBranch from "./ModalAddBranch";
import ModalAddCommit from "./ModalAddCommit";

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
  const [modalBranch, setModalBranch] = useState({ open: false });
  const [modalCommit, setModalCommit] = useState({ open: false });
  const [formBranch, setFormBranch] = useState({ name: "" });
  const [formCommit, setFormCommit] = useState({
    desc: "",
    hash: "",
    filePath: "",
    doc: ""
  });
  const [selectedBranch, SetSelectedBranch] = useState("");

  const handleBranchs = values => {
    SetSelectedBranch(!!values[0] && values[0]);
    setBranchs(values);
  };

  useEffect(() => {
    setPosition("Projects");
  });

  useEffect(() => {
    if (selectedBranch) {
      const unsubscribe = loadCommits(setCommits, {
        projectId: projectId,
        branchId: selectedBranch.id,
        limit: 50
      });
      return () => unsubscribe();
    }
  }, [projectId, selectedBranch]);

  useEffect(() => {
    const unsubscribe = loadBranchs(handleBranchs, {
      projectId: projectId
    });

    return () => unsubscribe();
  }, [projectId]);

  const handleModalBranch = () => {
    setModalBranch(v => ({ ...v, open: !v.open }));
  };

  const handleModalCommit = () => {
    setModalCommit(v => ({ ...v, open: !v.open }));
  };

  const saveBranch = async () => {
    const result = await addData("branchs", { ...formBranch, projectId });
    if (result.status) {
      handleModalBranch();
    } else {
      console.log(result.error);
    }
  };

  const saveCommit = async () => {
    const result = await addData("commits", {
      ...formCommit,
      projectId,
      branchId: selectedBranch.id
    });
    if (result.status) {
      handleModalCommit();
    } else {
      console.log(result.error);
    }
  };

  const onChangeFormBranch = ({ target: { id, value } }) => {
    setFormBranch(old => ({ ...old, [id]: value }));
  };

  const onChangeFormCommit = ({ target: { id, value } }) => {
    setFormCommit(old => ({ ...old, [id]: value }));
  };

  const onChangeDoc = code => {
    setFormCommit(old => ({ ...old, doc: code }));
  };

  const onChangeSelectedBranch = ({ target: { value } }) => {
    SetSelectedBranch(value);
  };

  return (
    <>
      <ModalAddBranch
        open={modalBranch.open}
        handle={handleModalBranch}
        save={saveBranch}
        onChange={onChangeFormBranch}
        form={formBranch}
      />

      <ModalAddCommit
        open={modalCommit.open}
        handle={handleModalCommit}
        save={saveCommit}
        onChange={onChangeFormCommit}
        onChangeDoc={onChangeDoc}
        form={formCommit}
      />

      {!branchs.length && (
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="column"
          spacing={2}
          onClick={handleModalBranch}
          style={{ cursor: "pointer" }}
        >
          <Grid item>
            <Fab color="primary" size="large">
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item>
            <Typography variant="h4">
              Crie a primeira Branch do seu Projeto{" "}
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
            <Grid container alignItems="center" justify="center" spacing={3}>
              <Grid item xs>
                <TextField
                  className={classes.root}
                  id="filled-select-currency"
                  select
                  value={selectedBranch}
                  onChange={onChangeSelectedBranch}
                  variant="outlined"
                  style={{ width: "100%" }}
                  size="small"
                >
                  {branchs.map(option => {
                    return (
                      <MenuItem key={option.id} value={option}>
                        Branch: {option.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleModalBranch}
                >
                  Nova branch
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleModalCommit}
                >
                  Novo commit
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {!commits.length && (
            <Grid item>
              <Grid
                container
                alignItems="center"
                justify="center"
                direction="column"
                spacing={2}
                onClick={handleModalCommit}
                style={{ cursor: "pointer" }}
              >
                <Grid item>
                  <Fab color="primary" size="large">
                    <AddIcon />
                  </Fab>
                </Grid>
                <Grid item>
                  <Typography variant="h4">
                    Crie o primeiro Commit da sua Branch{" "}
                    <span role="img" aria-label="Emoji sorrindo">
                      😄️
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}

          {!!commits.length && (
            <Grid item>
              <Typography variant="h4">Commits</Typography>
            </Grid>
          )}
          <Grid item>
            <ListCards type={"commit"} list={commits} />
          </Grid>
        </Grid>
      )}
    </>
  );
}
