import React from "react";
import styled from "styled-components";
import PlayerInfo from "./PlayerInfo";

const PlayerDetailSectionBlock = styled.div`
  min-height: calc(100vh - 240px);
`;

const PlayerDetailSection = () => {
  return (
    <PlayerDetailSectionBlock>
      <PlayerInfo />
    </PlayerDetailSectionBlock>
  );
};

export default PlayerDetailSection;
