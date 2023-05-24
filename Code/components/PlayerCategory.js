import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";

import { AiFillCaretDown } from "react-icons/ai";
import { RiLoader3Line } from "react-icons/ri";
import jsonList from "../db/jsonList.json";

const spin = keyframes`
from {
    transform:rotate(0deg);
  }
  to{
    transform:rotate(720deg);
  }
`;

const PlayerCategoryBlock = styled.div`
  background: #051c2d;
  height: 60px;
  width: 600px;
  margin: 20px auto;
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  z-index: 99;

  .loading {
    position: absolute;
    color: #051c2d;
    right: -8%;
    font-size: 45px;
    animation: 2s ${spin} infinite;
  }

  .dropdown {
    .dropdown_button {
      padding: 0px 14px;
      color: #000;
      background: #fff;
      cursor: pointer;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &.confe_button {
        input {
          width: 100px;
        }
      }
      &.divi_button {
        input {
          width: 100px;
        }
      }
      &.team_button {
        input {
          width: 200px;
        }
      }
      input {
        font-size: 30px;
        font-family: "League Gothic", sans-serif;
        border: none;
        outline: 0;
        cursor: pointer;
        &::placeholder {
          color: #000;
        }
      }
      span {
        display: flex;
        font-size: 20px;
      }
    }

    ul {
      display: none;
      overflow-y: scroll;
      border-radius: 5px;
      box-shadow: 0 0 1px #000;
      position: absolute;
      padding: 0px 14px;
      background: #fff;

      &.divi_list {
        max-height: 135px;
      }
      &.team_list {
        max-height: 195px;
      }

      li {
        button {
          font-size: 15px;
          height: 30px;
          background: #fff;
          text-align: left;
          &.confe_list_button {
            width: 120px;
          }
          &.divi_list_button {
            width: 120px;
          }
          &.team_list_button {
            width: 220px;
          }
          &:hover {
            text-decoration: underline;
          }
        }

        &:nth-child(1) {
          button {
            font-weight: bold;
            border-bottom: 1px solid #b3b3b3;
          }
        }
      }

      &.on {
        display: block;
      }
    }
  }
`;

const PlayerCategory = (props) => {
  // set dropdown menu list
  const [ConfeList, setConfeList] = useState([]);
  const [DiviList, setDiviList] = useState([]);
  const [TeamList, setTeamList] = useState([]);

  // for drop down toggle
  const [ConfeTog, setConfeTog] = useState(false);
  const [DiviTog, setDiviTog] = useState(false);
  const [TeamTog, setTeamTog] = useState(false);

  // input on the drop down button
  const ConfeInp = useRef(null);
  const DiviInp = useRef(null);
  const [TeamInp, setTeamInp] = useState("Team");

  // get url query parameters
  const [searchParams] = useSearchParams();
  const confeParams = searchParams.get("conference");
  const diviParams = searchParams.get("division");
  const teamParams = searchParams.get("team");

  const navigate = useNavigate();

  useEffect(() => {
    const handleConfe = () => {
      // get Conference
      const allConfeSet = new Set(
        jsonList.TeamList.map((team) => team.Conference)
      );
      const allConfe = Array.from(allConfeSet);
      setConfeList(allConfe);
      // set input of Conference button
      if (confeParams === null) {
        ConfeInp.current.setAttribute("value", "Conference");
      } else if (confeParams !== null) {
        ConfeInp.current.setAttribute("value", confeParams);
      }
    };

    handleConfe();
  }, [confeParams]);

  useEffect(() => {
    const handleDivi = () => {
      // set Division toggle list
      // all Division List
      if (confeParams === null) {
        const allDiviSet = new Set(
          jsonList.TeamList.map((team) =>
            JSON.stringify({
              Conference: team.Conference,
              Division: team.Division,
            })
          )
        );
        const allDivi = Array.from(allDiviSet).map((jsonString) =>
          JSON.parse(jsonString)
        );
        setDiviList(allDivi);
      }
      // filtered Division List by clicked Conference
      else if (confeParams !== null) {
        const filteredDiviSet = new Set(
          jsonList.TeamList.filter(
            (team) => team.Conference === confeParams
          ).map((team) =>
            JSON.stringify({
              Conference: team.Conference,
              Division: team.Division,
            })
          )
        );

        const filteredDivi = Array.from(filteredDiviSet).map((jsonString) =>
          JSON.parse(jsonString)
        );
        setDiviList(filteredDivi);
      }

      // set input of Division button
      if (diviParams !== null) {
        DiviInp.current.setAttribute("value", diviParams);
      } else {
        DiviInp.current.setAttribute("value", "Division");
      }
    };

    handleDivi();
  }, [diviParams, confeParams]);

  useEffect(() => {
    const handleTeam = () => {
      // set Team toggle list
      // all Team List
      if (confeParams === null) {
        const allTeams = jsonList.TeamList.map(
          ({ Key, Name, Conference, Division }) => ({
            Key,
            Name,
            Conference,
            Division,
          })
        );
        setTeamList(allTeams);
      }
      // filtered Team List by clicked Division
      else if (confeParams !== null) {
        if (diviParams === null) {
          const filteredTeams = jsonList.TeamList.filter(
            (team) => team.Conference === confeParams
          ).map(({ Key, Name, Conference, Division }) => ({
            Key,
            Name,
            Conference,
            Division,
          }));
          setTeamList(filteredTeams);
        } else if (diviParams !== null) {
          const filteredTeams = jsonList.TeamList.filter(
            (team) => team.Division === diviParams
          ).map(({ Key, Name, Conference, Division }) => ({
            Key,
            Name,
            Conference,
            Division,
          }));
          setTeamList(filteredTeams);
        }
      }
      // set input of Team button
      if (teamParams !== null) {
        const thisTeamName = jsonList.TeamList.filter(
          (team) => team.Key === teamParams
        )[0].Name;
        setTeamInp(thisTeamName);
      } else {
        setTeamInp("Team");
      }
    };

    handleTeam();
  }, [teamParams, diviParams, confeParams]);

  //click conference on the list
  const clickConfe = (e) => {
    const value = e.target.value;
    // set url query parameters
    if (value !== "Conference") {
      navigate(`/player?conference=${value}`);
    } else {
      navigate(`/player`);
    }

    setConfeTog(false);
  };

  //click division on the list
  const clickDivi = (e) => {
    const value = e.target.value;

    // set url query parameters
    if (value !== "Division") {
      const thisConfe = DiviList.filter((el) => el.Division === value)[0]
        .Conference;
      navigate(`/player?conference=${thisConfe}&division=${value}`);
    } else {
      navigate(`/player`);
    }

    setDiviTog(false);
  };

  const clickTeam = (e) => {
    const letter = e.target.innerHTML;
    const value = e.target.value;

    // prenvent next click on same team
    if (TeamInp !== letter && value !== "Team") {
      // close all of list
      setTeamTog(false);
      setDiviTog(false);
      setConfeTog(false);

      const thisTeam = TeamList.filter((el) => el.Key === value)[0];
      const thisConfe = thisTeam.Conference;
      const thisDivi = thisTeam.Division;

      // set url query parameters
      navigate(
        `/player?conference=${thisConfe}&division=${thisDivi}&team=${value}`
      );
    }
  };

  return (
    <PlayerCategoryBlock>
      <div className="confe_dropdown dropdown">
        <div
          className="dropdown_button confe_button"
          onClick={() => {
            setConfeTog((ConfeTog) => !ConfeTog);
          }}
        >
          <input ref={ConfeInp} placeholder="Conference" readOnly></input>
          <span>
            <AiFillCaretDown />
          </span>
        </div>

        <ul className={ConfeTog === true ? "confe_list on" : "confe_list"}>
          <li>
            <button
              className="confe_list_button"
              value="Conference"
              onClick={clickConfe}
            >
              Conference
            </button>
          </li>
          {ConfeList.map((data, index) => (
            <li key={data}>
              <button
                className="confe_list_button"
                value={data}
                onClick={clickConfe}
              >
                {data}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="divi_dropdown dropdown">
        <button
          className="dropdown_button divi_button"
          onClick={() => {
            setDiviTog((DiviTog) => !DiviTog);
          }}
        >
          <input ref={DiviInp} placeholder="Division" readOnly></input>
          <span>
            <AiFillCaretDown />
          </span>
        </button>
        <ul className={DiviTog === true ? "divi_list on" : "divi_list"}>
          <li>
            <button
              className="divi_list_button"
              value="Division"
              onClick={clickDivi}
            >
              Division
            </button>
          </li>
          {DiviList.map((data, index) => (
            <li key={data.Division}>
              <button
                className="divi_list_button"
                value={data.Division}
                onClick={clickDivi}
              >
                {data.Division}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="team_dropdown dropdown">
        <button
          className="dropdown_button team_button"
          onClick={() => {
            setTeamTog((TeamTog) => !TeamTog);
          }}
        >
          <input value={TeamInp} readOnly></input>
          <span>
            <AiFillCaretDown />
          </span>
        </button>
        <ul className={TeamTog === true ? "team_list on" : "team_list"}>
          <li>
            <button
              className="team_list_button"
              value="Team"
              onClick={clickTeam}
              readOnly
            >
              Team
            </button>
          </li>
          {TeamList.map((data, index) => (
            <li key={data.Key}>
              <button
                className="team_list_button"
                value={data.Key}
                onClick={clickTeam}
              >
                {data.Name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {props.Loading === true ? <RiLoader3Line className="loading" /> : null}
    </PlayerCategoryBlock>
  );
};

export default PlayerCategory;
