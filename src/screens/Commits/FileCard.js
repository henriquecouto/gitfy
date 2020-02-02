import React, { useState } from "react";
import { Paper, Grid, Divider, ButtonGroup, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Markdown from "react-markdown";
import "moment/locale/pt-br";

import Editor from "react-ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-tomorrow_night";

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
  },
  view: {
    padding: theme.spacing(0, 2),
    height: 367,
    overflow: "auto"
  }
}));

export default function FileCard({ path, content, onChange, onChangeDoc }) {
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
                style={{ marginRight: 10 }}
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
            <Editor
              mode="markdown"
              theme="tomorrow_night"
              onChange={onChangeDoc}
              value={content}
              name="editor"
              editorProps={{ $blockScrolling: false, $highlightPending: true }}
              fontSize={16}
              height="367px"
              width="100%"
            />
          ) : (
            <Grid container className={classes.view}>
              <Grid item>
                <Markdown source={content} escapeHtml={false} />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
