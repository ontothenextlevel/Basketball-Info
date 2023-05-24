import React from "react";
import Header from "../components/Header";
import { useLoadScript } from "@react-google-maps/api";
import ArenaMap from "../components/ArenaMap.js";
import ArenaCategory from "../components/ArenaCategory";

const Arena = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "MY KEY",  
  });

  return (
    <div>
      <Header />
      <ArenaCategory />
      {isLoaded ? <ArenaMap /> : null}
    </div>
  );
};

export default Arena;
