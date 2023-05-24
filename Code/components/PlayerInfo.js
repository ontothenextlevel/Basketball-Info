import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { BsFillPersonFill } from "react-icons/bs";
import { ImArrowDown } from "react-icons/im";
import { TiNews } from "react-icons/ti";
import { ImArrowLeft } from "react-icons/im";
import { RiLoader3Line } from "react-icons/ri";

import jsonList from "../db/jsonList.json";

const spin = keyframes`
from {
    transform:rotate(0deg) ;
  }
  to{
    transform:rotate(720deg) ;
  }
`;

const PlayerInfoBlock = styled.div`
  background: #051c2d;

  padding: 15px 100px;
  color: #fff;
  border: 20px solid #051c2d;
  border-radius: 50px;
  letter-spacing: 1px;
  margin: 30px auto 30px auto;
  position: relative;
  font-size: 30px;
  width: 100%;
  z-index: 99999;

  .icons {
    background: #fff;
    color: #000;
    padding: 3px 10px 5px 10px;
    border-radius: 50px;
  }
  .value {
    text-align: center;
    display: block;
    padding: 0 10px;
    width: 100%;
  }
  .info_cancel {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    font-size: 45px;
    color: #000;
    width: 80px;
    height: 80px;
    background: #fff;
    border-radius: 1px 25px 1px 40px;
    overflow: hidden;
    .info_back {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) translateX(70px);
      transition: transform 0.5s;
      font-size: 35px;
    }
    .info_move {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: transform 0.5s;
    }
    &:hover {
      .info_back {
        transform: translate(-50%, -50%);
      }
      .info_move {
        transform: translate(-50%, -50%) translateX(-70px);
      }
    }
  }

  .info_number {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 90px;
    width: 130px;
    height: 130px;
    background: #fff;
    text-align: center;
    line-height: 130px;
    color: #051c2d;
    border-radius: 25px 1px 40px 1px;
    .info_loading {
      margin-top: 22px;
      animation: 2s ${spin} infinite;
    }
  }

  .info_name {
    font-size: 80px;
    text-align: center;
  }

  .info_personal {
    display: flex;
    justify-content: space-around;
    margin: 40px 0 40px 0;
    white-space: nowrap;
    .left_contents {
      color: #000;
      position: relative;
      background: #fff;
      border-radius: 5px;
      color: #051c2d;
      .photo {
        font-size: 400px;
        color: #000;
        width: 370px;
      }
      .position {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 60px;
        padding: 5px 15px;
      }
      .team {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 60px;
        padding: 5px 15px;
      }
      .salary {
        position: absolute;
        bottom: 0%;
        left: 50%;
        font-size: 40px;
        transform: translateX(-50%);
        padding: 5px 0;
      }
    }
    .info_right_contents {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      div {
        border: 2px solid #fff;
        border-radius: 50px;
        display: flex;
        align-items: center;
        width: 400px;
      }
    }
  }

  .info_news {
    .news {
      font-size: 50px;
      display: flex;
      justify-content: center;
      align-items: center;

      .load {
        font-size: 30px;
        margin-left: 10px;
        width: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        cursor: pointer;
        .arrow {
          transform: scaleY(0.8);
          &.on {
            transform: scaleY(0.8) translateY(50px);
            transition: all 0.5s;
          }
        }
        .paper {
          position: absolute;
          display: none;
          &.on {
            position: absolute;
            display: block;
          }
        }
        .board {
          width: 100%;
          height: 4px;
          background: #fff;
          display: block;
        }
      }
    }
    .icons {
      background: #051c2d;
      color: #fff;
    }

    .article {
      background: #fff;
      color: #000;
      border-radius: 40px;
      position: relative;
      border: 6px solid #fff;
      margin: 30px 0;

      .article_top {
        display: flex;
        justify-content: space-between;
        .title {
          background: #000;
          color: #fff;
          padding: 10px;
          border-radius: 35px 5px 35px 5px;
          font-size: 35px;
        }
        .time {
          padding: 10px;
          font-size: 25px;
        }
      }

      .content {
        margin: 20px 0;
        padding: 0 10px;
        font-family: "Roboto", sans-serif;
        letter-spacing: 0;
        font-size: 1em;
      }

      .article_bottom {
        display: flex;
        justify-content: space-between;
        font-size: 25px;
        div {
          border: 2px solid #000000;
          border-radius: 50px;
          display: flex;
          align-items: center;
        }
        .topic {
          border-radius: 5px 35px 5px 35px;
          .icons {
            border-radius: 0 30px 30px 50px;
            padding: 3px 10px 5px 11px;
            background: #000;
            color: #fff;
          }
          .value {
            padding: 0 12px 0 10px;
          }
        }
        .source {
          border-radius: 35px 5px 35px 5px;
          .icons {
            border-radius: 50px 30px 30px 0px;
            padding: 3px 10px 5px 11px;
            background: #000;
            color: #fff;
          }
          .value {
            padding: 0 12px 0 10px;
          }
        }
      }
    }
  }

  &.on {
    background-image: linear-gradient(
      to top left,
      #${(props) => props.TeamColor.base} 50%,
      #051c2d 50%
    );
    background-size: 200% 200%;
    background-position: bottom right;
    transition: all 0.5s;
    color: #${(props) => props.TeamColor.name};
    border: 20px solid #${(props) => props.TeamColor.neck};
    .icons {
      background: #${(props) => props.TeamColor.border};
      color: #${(props) => props.TeamColor.base};
      transition: all 0.5s;
    }
    .info_number {
      background: #${(props) => props.TeamColor.number};
      color: #${(props) => props.TeamColor.base};
      transition: all 0.5s;
    }
    .info_cancel {
      background: #${(props) => props.TeamColor.number};
      color: #${(props) => props.TeamColor.base};
      transition: all 0.5s;
    }

    .info_personal {
      .info_right_contents {
        div {
          border: 2px solid #${(props) => props.TeamColor.border};
          transition: border 0.5s;
        }
      }
    }
    .info_news {
      .news {
        .load {
          .board {
            background: #${(props) => props.TeamColor.name};
            transition: background 0.5s;
          }
        }
      }
    }
  }
`;

const PlayerInfo = () => {
  // set player news
  const [News, setNews] = useState([]);

  // set player Info
  const [Info, setInfo] = useState([]);

  // set team colors
  const [TeamColor, setTeamColor] = useState([]);

  // get query parameters on url
  const { playerid } = useParams();

  const [NewsIcon, setNewsIcon] = useState({});

  const [PlayerOn, setPlayerOn] = useState();

  // set query parameters
  const navigate = useNavigate();

  const apiKey = "MY KEY";

  const getPlayerNews = async () => {
    setNewsIcon({ arrow: true });
    try {
      const playerNews = await axios.get(
        `https://api.sportsdata.io/v3/nba/scores/json/NewsByPlayerID/${playerid}?key=${apiKey}`
      );
      setNews(playerNews.data);
      setNewsIcon({ arrow: true, paper: true });
    } catch (error) {
      alert("Please Retry");
    }
  };

  useEffect(() => {
    const getPlayerInfo = async () => {
      try {
        const playerInfo = await axios.get(
          `https://api.sportsdata.io/v3/nba/scores/json/Player/${playerid}?key=${apiKey}`
        );
        setInfo(playerInfo.data);
        setPlayerOn(true);
      } catch (error) {}
    };

    // for call api prevent undefined param
    if (playerid !== undefined) {
      getPlayerInfo();
    }
  }, [playerid]);

  // get Team Color by Player
  useEffect(() => {
    if (Info) {
      const thisTeam = jsonList.TeamList.find((item) => item.Key === Info.Team);
      if (thisTeam) {
        setTeamColor(thisTeam.Color);
      }
    }
  }, [Info]);

  const poundTokg = (obj) => {
    if (obj) {
      const kg = Math.round(0.453592 * obj);
      return kg + "kg";
    }
  };

  const inchTocm = (obj) => {
    if (obj) {
      const cm = Math.round(2.54 * obj);
      return cm + "cm";
    }
  };

  const cutBack = (obj) => {
    if (obj) {
      const objString = obj + "";
      const cutted = objString.substr(0, 10);
      return cutted;
    }
  };

  const setComma = (obj) => {
    if (obj) {
      const objString = obj + "";
      const comma = objString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return comma + "$";
    }
  };

  const closeInfo = () => {
    const playerTeam = jsonList.TeamList.find((data) => data.Key === Info.Team);
    const thisDivi = playerTeam.Division;
    const thisConfe = playerTeam.Conference;
    navigate(
      `/player?conference=${thisConfe}&division=${thisDivi}&team=${Info.Team}`
    );
  };

  return (
    <PlayerInfoBlock
      TeamColor={TeamColor}
      className={PlayerOn ? "row on" : "row"}
    >
      <div className="info_number">
        {Info.Jersey !== undefined ? (
          Info.Jersey
        ) : (
          <RiLoader3Line className="info_loading" />
        )}
      </div>
      <div className="info_name">
        {Info.YahooName !== undefined ? Info.YahooName : "Player Information"}
      </div>
      <div className="info_cancel" onClick={closeInfo}>
        <ImArrowLeft className="info_move" />
        <div className="info_back">BACK</div>
      </div>

      <div className="info_personal">
        <div className="left_contents">
          <div className="position">{Info.Position}</div>
          <div className="team">{Info.Team}</div>
          <BsFillPersonFill className="photo" />
          <div className="salary">{setComma(Info.Salary)}</div>
        </div>

        <div className="info_right_contents">
          <div className="country">
            <span className="icons">Country</span>
            <span className="value">{Info.BirthCountry}</span>
          </div>
          <div className="state">
            <span className="icons">State</span>
            <span className="value">{Info.BirthState}</span>
          </div>
          <div className="city">
            <span className="icons">City</span>
            <span className="value">{Info.BirthCity}</span>
          </div>

          <div className="date">
            <span className="icons">Date</span>
            <span className="value">{cutBack(Info.BirthDate)}</span>
          </div>

          <div className="college">
            <span className="icons">College</span>
            <span className="value">{Info.College}</span>
          </div>
          <div className="physical">
            <span className="icons">Height</span>
            <span className="value">{inchTocm(Info.Height)}</span>
            <span className="icons">Weight</span>
            <span className="value">{poundTokg(Info.Weight)}</span>
          </div>
        </div>
      </div>
      <div className="info_news">
        <div className="news">
          <div>PERSONAL NEWS</div>
          <div className="load" onClick={getPlayerNews}>
            <div className={NewsIcon["paper"] ? "paper on" : "paper"}>
              <TiNews />
            </div>
            <div className={NewsIcon["arrow"] ? "arrow on" : "arrow"}>
              <ImArrowDown />
            </div>
            <span className="board"></span>
          </div>
        </div>
        {News.length > 0 && (
          <div className="article">
            <div className="article_top">
              <div className="title">{News[0].Title}</div>
              <div className="time">{News[0].TimeAgo}</div>
            </div>

            <div className="content">{News[0].Content}</div>

            <div className="article_bottom">
              <div className="topic">
                <span className="icons">Topic</span>
                <span className="value">{News[0].Categories}</span>
              </div>

              <div className="source">
                <span className="icons">Source</span>
                <span className="value">{News[0].OriginalSource}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </PlayerInfoBlock>
  );
};

export default PlayerInfo;
