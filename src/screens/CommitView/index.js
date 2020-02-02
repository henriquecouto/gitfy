import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadCommit, loadBranch } from "../../services/db";
import { Grid, Typography } from "@material-ui/core";
import Markdown from "react-markdown";

export default function CommitView({ setPosition }) {
  const { commitId } = useParams();
  const [commit, setCommit] = useState({});
  const [branch, setBranch] = useState({});

  useEffect(() => {
    setPosition("Commit");
  }, [setPosition]);

  useEffect(() => {
    const unsubscribe = loadCommit(setCommit, { commitId });
    return () => unsubscribe();
  }, [commitId]);

  useEffect(() => {
    if (commit && commit.branchId) {
      const unsubscribe = loadBranch(setBranch, { branchId: commit.branchId });
      return () => unsubscribe();
    }
  }, [commit]);

  return (
    !!commit && (
      <Grid container justify="center" direction="column">
        <Grid item>
          <Grid container justify="space-between">
            <Grid item>
              <Typography>Arquivo: {commit.filePath}</Typography>
            </Grid>
            <Grid item>
              <Typography>Branch: {branch.name}</Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Markdown source={commit.doc} escapeHtml={false} />
        </Grid>
      </Grid>
    )
  );
}
