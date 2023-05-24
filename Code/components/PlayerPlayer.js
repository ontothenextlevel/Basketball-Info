import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import jsonList from "../db/jsonList.json";

const PlayerPlayersBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index: 9;
  .uniform {
    margin: 30px;
    user-select: none;
    cursor: pointer;
    position: relative;
    width: 180px;
    height: 230px;
    background: #${(props) => props.TeamColor.base};
    overflow: hidden;
    &:hover {
      transform: scale(1.1);
      transition: 0.2s;
    }

    .neck {
      width: 80px;
      height: 65px;
      background: #fff;
      border-radius: 50%;
      border: 4px solid #${(props) => props.TeamColor.neck};
      position: absolute;
      top: -20%;
      left: 50%;
      transform: translateX(-50%);
    }
    .right_arm {
      height: 130px;
      width: 70px;
      border-radius: 0 0 50% 0;
      background: #fff;
      border: 5px solid #${(props) => props.TeamColor.arm};
      position: absolute;
      top: -5%;
      left: -25%;
    }
    .left_arm {
      height: 130px;
      width: 70px;
      border-radius: 0 0 0 50%;
      background: #fff;
      border: 5px solid #${(props) => props.TeamColor.arm};
      position: absolute;
      top: -5%;
      right: -25%;
    }
    .number {
      text-align: center;
      display: block;
      font-size: 80px;
      position: absolute;
      top: 29%;
      left: 50%;
      transform: translateX(-50%);
      color: #${(props) => props.TeamColor.number};
      -webkit-text-stroke: 1.5px #${(props) => props.TeamColor.border};
    }
    .name {
      position: absolute;
      top: 15%;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      color: #${(props) => props.TeamColor.name};
      white-space: nowrap;
    }

    &.on {
    }
    &.off {
      display: none;
    }
  }

  .explain {
    &.on {
      width: 100%;
      height: 100%;
      background: black;
    }
  }
`;

const PlayerPlayer = (props) => {
  // get team players
  const [Players, setPlayers] = useState([]);

  // team index

  const [Color, setColor] = useState([]);

  // get query parameters on url
  const [searchParams] = useSearchParams();

  const teamParams = searchParams.get("team");

  // set query parameters
  const navigate = useNavigate();

  const { setLoading } = props;

  useEffect(() => {
    const getPlayer = async () => {
      setLoading(true);

      try {
        const players = await axios.get(
          `https://api.sportsdata.io/v3/nba/scores/json/Players/${teamParams}?key=/* MY KEY */`
        );
        setPlayers({
          team: teamParams,
          players: players.data,
        });

        // store api data on local storage
        const apiToJson = JSON.stringify({
          team: teamParams,
          players: players.data,
        });
        localStorage.setItem("teamData", apiToJson);

        // get  team color

        const color = jsonList.TeamList.filter(
          (item) => item.Key === teamParams
        )[0].Color;
        setColor(color);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert("Please Retry");
      }
    };

    if (teamParams !== null) {
      const getLocalData = localStorage.getItem("teamData");
      const storedTeam = JSON.parse(getLocalData);

      if (storedTeam !== undefined && storedTeam?.team === teamParams) {
        const color = jsonList.TeamList.filter(
          (item) => item.Key === teamParams
        )[0].Color;
        setColor(color);

        setPlayers(storedTeam);
      } else {
        getPlayer();
      }
    }
  }, [teamParams, setLoading]);

  // set font size on uniform back name
  const getFontSize = (data) => {
    const fontSize = 33; //px
    const pxGap = 0.5; // approximately increase font 1px > increse 0.5width
    const letterWidth = 10; // approximately one letter is 10px width
    const standardLeng = 12; // approximately 12 letters in box
    const containWidth = 100;
    // if under 11 letter set default size
    if (data.LastName.length <= standardLeng) {
      return `${fontSize}px`;
    }
    // if over 11 letters set calculated size
    else if (data.LastName.length > standardLeng) {
      const thisLetterWidth = containWidth / data.LastName.length;
      const fontGap = (letterWidth - thisLetterWidth) / pxGap;
      const thisFontSize = Math.round(fontSize - fontGap);
      return `${thisFontSize}px`;
    }
  };

  const picking = (data) => {
    navigate(`/player/info/${data.PlayerID}`);
  };

  return (
    <PlayerPlayersBlock TeamColor={Color} className="row">
      {Players?.players?.map((data) => (
        <div
          className="uniform"
          onClick={() => picking(data)}
          key={data.PlayerID}
        >
          <div className="neck"></div>
          <div className="right_arm"></div>
          <div className="left_arm"></div>
          <div className="name" style={{ fontSize: getFontSize(data) }}>
            {data.LastName}
          </div>
          <div className="number">{data.Jersey}</div>
        </div>
      ))}
    </PlayerPlayersBlock>
  );
};

export default PlayerPlayer;
