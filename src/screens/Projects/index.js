import React, { useEffect } from "react";

export default function Projects({ setPosition }) {
  useEffect(() => {
    setPosition("Projects");
  });
  return <div>Hello Projetos</div>;
}