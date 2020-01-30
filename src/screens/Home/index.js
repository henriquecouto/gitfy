import React, { useEffect } from "react";

export default function Home({ setPosition }) {
  useEffect(() => {
    setPosition("Home");
  });
  return <div>Hello Home</div>;
}
