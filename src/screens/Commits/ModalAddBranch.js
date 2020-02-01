import React from "react";
import GitfyModal from "../../components/GitfyModal";
import { Button, TextField, Grid } from "@material-ui/core";

export default function ModalAddBranch({ handle, open, save, onChange, form }) {
  return (
    <GitfyModal
      handleClose={handle}
      open={open}
      title="Adicionar Branch"
      actions={[
        () => {
          return (
            <div>
              <Button onClick={handle}>Cancelar</Button>
              <Button variant="contained" onClick={save} color="primary">
                Adicionar
              </Button>
            </div>
          );
        }
      ]}
    >
      <Grid container direction="column">
        <TextField
          id="name"
          label="Nome"
          autoFocus
          margin="normal"
          variant="outlined"
          onChange={onChange}
          value={form.name}
        />
      </Grid>
    </GitfyModal>
  );
}
