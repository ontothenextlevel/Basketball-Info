import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PlayerListSection from "../components/PlayerListSection";
import PlayerDetailSection from "../components/PlayerDetailSection";
import GoUpButton from "../components/GoUpButton";

const Player = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route exact path="/" element={<PlayerListSection />} />
        <Route path="info/:playerid" element={<PlayerDetailSection />} />
      </Routes>

      <Footer />
      <GoUpButton />
    </div>
  );
};

export default Player;
