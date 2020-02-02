import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadCommit, loadBranch, loadProject } from "../../services/db";
import { Grid, Typography, Divider, Paper, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Markdown from "react-markdown";

const useStyles = makeStyles(theme => ({
  fileGrid: {
    padding: theme.spacing(2)
  },
  filePaper: {
    margin: theme.spacing(1, 0)
  }
}));

const PaperFile = ({ file }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.filePaper}>
      <Grid
        container
        className={classes.fileGrid}
        direction="column"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h6">Arquivo: {file.path}</Typography>
        </Grid>
        <Divider variant="fullWidth" />
        <Grid item>
          <Markdown source={file.doc} escapeHtml={false} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default function CommitView({ setPosition }) {
  const { commitId, projectId } = useParams();
  const [commit, setCommit] = useState(null);
  const [branch, setBranch] = useState({});
  const [project, setProject] = useState({});

  useEffect(() => {
    setPosition("Commit");
  }, [setPosition]);

  useEffect(() => {
    const unsubscribe = loadCommit(setCommit, { commitId });
    return () => unsubscribe();
  }, [commitId]);

  useEffect(() => {
    const unsubscribe = loadProject(setProject, { projectId });
    return () => unsubscribe();
  }, [projectId]);

  useEffect(() => {
    if (commit && commit.branchId) {
      const unsubscribe = loadBranch(setBranch, { branchId: commit.branchId });
      return () => unsubscribe();
    }
  }, [commit]);

  return (
    !!commit && (
      <Grid container justify="center" direction="column" spacing={4}>
        <Grid item>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6">Projeto: {project.name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">Branch: {branch.name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">Descrição: {commit.desc}</Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            {commit.files.map((v, i) => (
              <React.Fragment key={i}>
                <Hidden mdDown>
                  <Grid item xs={4} key={i}>
                    <PaperFile file={v} />
                  </Grid>
                </Hidden>
                <Hidden lgUp>
                  <Grid item xs={12}>
                    <PaperFile file={v} />
                  </Grid>
                </Hidden>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    )
  );
}
