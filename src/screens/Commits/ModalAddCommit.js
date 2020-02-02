import React from "react";
import GitfyModal from "../../components/GitfyModal";
import { Button, TextField, Grid } from "@material-ui/core";
import FileCard from "./FileCard";

export default function ModalAddCommit({
  handle,
  open,
  save,
  onChange,
  onChangeFile,
  addFile,
  form
}) {
  return (
    <GitfyModal
      handleClose={handle}
      open={open}
      title="Adicionar Commit"
      actions={[
        () => (
          <Button variant="contained" onClick={addFile} color="primary">
            Adicionar arquivo
          </Button>
        ),
        () => (
          <div>
            <Button onClick={handle}>Cancelar</Button>
            <Button variant="contained" onClick={save} color="primary">
              Adicionar
            </Button>
          </div>
        )
      ]}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            id="desc"
            label="Descrição"
            autoFocus
            margin="normal"
            variant="outlined"
            onChange={onChange}
            value={form.name}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            id="hash"
            label="Hash"
            margin="normal"
            variant="outlined"
            onChange={onChange}
            value={form.hash}
            fullWidth
          />
        </Grid>
        {form.files.map((v, i) => (
          <Grid item key={i}>
            <FileCard position={i} file={v} onChangeFile={onChangeFile} />
          </Grid>
        ))}
      </Grid>
    </GitfyModal>
  );
}
