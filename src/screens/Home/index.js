import React, { useEffect } from "react";

export default function Home({ setPosition }) {
  useEffect(() => {
    setPosition("Início");
  });
  return <div>Hello Home</div>;
}
