import React from "react";
import GitfyModal from "../../components/GitfyModal";
import { Button, TextField, Grid } from "@material-ui/core";
import FileCard from "./FileCard";

export default function ModalAddCommit({ handle, open, save, onChange, form }) {
  return (
    <GitfyModal
      handleClose={handle}
      open={open}
      title="Adicionar Commit"
      actions={[
        () => (
          <Button variant="contained" onClick={save} color="primary">
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
      <Grid container direction="column">
        <TextField
          id="desc"
          label="Descrição"
          autoFocus
          margin="normal"
          variant="outlined"
          onChange={onChange}
          value={form.name}
        />
        <TextField
          id="hash"
          label="Hash"
          margin="normal"
          variant="outlined"
          onChange={onChange}
          value={form.hash}
        />
        <FileCard path={form.filePath} content={form.doc} onChange={onChange} />
      </Grid>
    </GitfyModal>
  );
}
