import React, { useState } from "react";
import { Grid, Hidden } from "@material-ui/core";
import GitfyCard from "../GitfyCard";
import { Redirect } from "react-router-dom";

export default function ListProjects({ type, list }) {
  const [redirect, setRedirect] = useState({ item: null });
  const openItem = item => {
    setRedirect({ item });
  };
  return (
    <>
      {redirect.item && (
        <Redirect
          to={{
            pathname: `/projects/${redirect.item}/commits`
          }}
        />
      )}
      <Grid container spacing={2}>
        <Hidden mdDown>
          {list.map(v => (
            <Grid item xs={4} key={v.id}>
              <GitfyCard item={v} type={type} openItem={() => openItem(v.id)} />
            </Grid>
          ))}
        </Hidden>
        <Hidden lgUp>
          {list.map(v => (
            <Grid item xs={12} key={v.id}>
              <GitfyCard item={v} type={type} openItem={() => openItem(v.id)} />
            </Grid>
          ))}
        </Hidden>
      </Grid>
    </>
  );
}
