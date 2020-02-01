import React, { useState, createRef, useEffect } from "react";
import { Paper, Grid, Divider, ButtonGroup, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "moment/locale/pt-br";

const useStyles = makeStyles(theme => ({
  paper: {
    height: 425,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.grey[600],
    borderStyle: "solid",
    borderWidth: 0.5,
    transition: "0.1s",
    "&:hover": {
      borderColor: theme.palette.common.white
    }
  },
  input: {
    padding: theme.spacing(2),
    backgroundColor: "#0000",
    width: "100%",
    border: "none",
    outline: "none",
    fontFamily: "roboto",
    color: theme.palette.text.primary,
    resize: "none",
    fontSize: theme.typography.body1.fontSize,
    lineHeight: theme.typography.body1.lineHeight
  }
}));

export default function FileCard({ path, content, onChange }) {
  const [edit, setEdit] = useState(true);

  const handleEdit = v => () => {
    setEdit(old => v || !old);
  };

  const classes = useStyles();
  return (
    <Paper className={[classes.paper].join(" ")} elevation={0}>
      <Grid container direction="column" justify="space-between">
        <Grid item>
          <Grid container alignItems="center">
            <Grid item xs>
              <input
                id="filePath"
                placeholder="Caminho do arquivo"
                onChange={onChange}
                value={path}
                className={classes.input}
              />
            </Grid>
            <Grid item>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
              >
                <Button
                  onClick={handleEdit(false)}
                  variant={!edit && "contained"}
                >
                  Ver
                </Button>
                <Button
                  onClick={handleEdit(true)}
                  variant={edit && "contained"}
                >
                  Editar
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" />
        <Grid item>
          {edit ? (
            <textarea
              id="doc"
              onChange={onChange}
              value={content}
              className={classes.input}
              rows={14}
            />
          ) : (
            <div className={classes.input}>{content}</div>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
