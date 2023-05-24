import React, { useState } from "react";
import styled from "styled-components";
import PlayerCategory from "./PlayerCategory";
import PlayerPlayer from "./PlayerPlayer";

const PlayerListSectionBlock = styled.div`
  min-height: calc(100vh - 240px);
`;

const PlayerListSection = () => {
  const [Loading, setLoading] = useState();

  return (
    <PlayerListSectionBlock>
      <PlayerCategory Loading={Loading} />
      <PlayerPlayer setLoading={setLoading} />
    </PlayerListSectionBlock>
  );
};

export default PlayerListSection;
