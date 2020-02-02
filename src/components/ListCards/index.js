import React, { useState } from "react";
import { Grid, Hidden } from "@material-ui/core";
import GitfyCard from "../GitfyCard";
import { Redirect } from "react-router-dom";

export default function ListCards({ type, list }) {
  const [redirect, setRedirect] = useState({ item: null, superItem: null });
  const openItem = item => () => {
    setRedirect({ item: item.id, superItem: item.projectId });
  };
  return (
    <>
      {redirect.item && type === "project" && (
        <Redirect
          to={{
            pathname: `/projects/${redirect.item}/commits`
          }}
        />
      )}
      {redirect.item && type === "commit" && (
        <Redirect
          to={{
            pathname: `/projects/${redirect.superItem}/commits/${redirect.item}`
          }}
        />
      )}
      <Grid container spacing={2}>
        <Hidden mdDown>
          {list.map(v => (
            <Grid item xs={4} key={v.id}>
              <GitfyCard item={v} type={type} openItem={openItem(v)} />
            </Grid>
          ))}
        </Hidden>
        <Hidden lgUp>
          {list.map(v => (
            <Grid item xs={12} key={v.id}>
              <GitfyCard item={v} type={type} openItem={openItem(v)} />
            </Grid>
          ))}
        </Hidden>
      </Grid>
    </>
  );
}
