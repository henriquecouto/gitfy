import React, { useState } from "react";
import GitfyModal from "../../components/GitfyModal";
import { Button, TextField } from "@material-ui/core";

export default function ModalAdd({ state, handle, add }) {
  const [form, setForm] = useState({ name: "", desc: "", lang: "" });

  const onChange = ({ target: { id, value } }) => {
    setForm(old => ({ ...old, [id]: value }));
  };

  const save = async () => {
    await add(form);
  };

  return (
    <GitfyModal
      title="Adicionar Projeto"
      open={state.open}
      handleClose={handle}
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
      <TextField
        id="name"
        label="Nome do Projeto"
        autoFocus
        fullWidth
        margin="normal"
        variant="outlined"
        onChange={onChange}
        value={form.name}
      />
      <TextField
        id="desc"
        label="Descrição"
        fullWidth
        margin="normal"
        variant="outlined"
        onChange={onChange}
        value={form.desc}
      />
      <TextField
        id="lang"
        label="Linguagem"
        fullWidth
        margin="normal"
        variant="outlined"
        onChange={onChange}
        value={form.lang}
      />
    </GitfyModal>
  );
}
