import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ArenaCategoryBlock = styled.div`
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  color: #000;
  margin: 10px 0;
  display: flex;
  z-index: 9999;
  button {
    background: none;
    font-family: "League Gothic", sans-serif;
  }
  .all_check {
    font-size: 35px;
    padding: 0px 20px;
    background: rgb(150, 150, 150);
    border-radius: 10px;
    margin: 0 7px;
    box-shadow: rgb(0 0 0 / 70%) 0px 1px 10px -1px;
    &:hover {
      background: rgb(200, 200, 200);
    }
    &.selected {
      background: rgb(255, 255, 255);
    }
  }
  .group_check {
    font-size: 35px;
    padding: 0px 5px 0 10px;
    background: rgb(150, 150, 150);
    border-radius: 10px;
    &:hover {
      background: rgb(200, 200, 200);
    }
    &.selected {
      background: rgb(255, 255, 255);
    }
  }
  .divi_check {
    font-size: 25px;
    background: #051c2d;
    border-radius: 5px;
    color: rgb(150, 150, 150);
    padding: 0px 5px;
    margin: 3px;
    &:hover {
      color: rgb(200, 200, 200);
    }
    &.selected {
      color: rgb(255, 255, 255);
    }
  }
  .check_area {
    display: flex;
    align-items: center;
    border-radius: 10px;
    background: rgb(150, 150, 150);
    padding-right: 5px;
    margin: 0 7px;
    box-shadow: rgb(0 0 0 / 70%) 0px 1px 10px -1px;
    &:has(.group_check:hover) {
      background: rgb(200, 200, 200);
    }
    &:has(.group_check.selected) {
      background: rgb(255, 255, 255);
    }
  }
`;

const ArenaCategory = () => {
  const [Conferences, setConferences] = useState({ West: true, East: true });
  const [Divisions, setDivisions] = useState({
    Northwest: true,
    Pacific: true,
    Southwest: true,
    Atlantic: true,
    Central: true,
    Southeast: true,
  });
  const navigate = useNavigate();

  // click all button
  const allSelect = () => {
    setConferences((prevConferences) => {
      return Object.keys(prevConferences).length === 0
        ? {
            West: true,
            East: true,
          }
        : {};
    });

    setDivisions((prevDivisions) => {
      return Object.keys(prevDivisions).length === 0
        ? {
            Northwest: true,
            Pacific: true,
            Southwest: true,
            Atlantic: true,
            Central: true,
            Southeast: true,
          }
        : {};
    });
  };

  //click  West and East button
  const groupSelect = (e) => {
    setConferences((prevConferences) => ({
      ...prevConferences,
      [e.target.value]: !Conferences[e.target.value],
    }));

    switch (e.target.value) {
      case "West":
        setDivisions((prevDivisions) => ({
          ...prevDivisions,
          Northwest: !Conferences["West"],
          Pacific: !Conferences["West"],
          Southwest: !Conferences["West"],
        }));
        break;
      case "East":
        setDivisions((prevDivisions) => ({
          ...prevDivisions,
          Atlantic: !Conferences["East"],
          Central: !Conferences["East"],
          Southeast: !Conferences["East"],
        }));
        break;

      default:
        break;
    }
  };

  // click Division Button
  const select = (e) => {
    const nowDivisions = {
      ...Divisions,
      [e.target.value]: !Divisions[e.target.value],
    };
    setDivisions(nowDivisions);

    setConferences((prevConferences) => ({
      ...prevConferences,
      East:
        nowDivisions["Atlantic"] &&
        nowDivisions["Central"] &&
        nowDivisions["Southeast"],
    }));

    setConferences((prevConferences) => ({
      ...prevConferences,
      West:
        nowDivisions["Northwest"] &&
        nowDivisions["Pacific"] &&
        nowDivisions["Southwest"],
    }));
  };

  // set URL Params
  useEffect(() => {
    const handleNavigate = () => {
      const trueDivision = Object.keys(Divisions).filter(
        (key) => Divisions[key] === true
      );
      const trueConference = Object.keys(Conferences).filter(
        (key) => Conferences[key] === true
      );

      navigate(`/arena?conference=${trueConference}&division=${trueDivision}`);
    };

    handleNavigate();
  }, [Divisions, Conferences, navigate]);

  return (
    <ArenaCategoryBlock className="row">
      <button
        onClick={allSelect}
        className={
          Conferences["West"] && Conferences["East"]
            ? "all_check selected"
            : "all_check"
        }
        value="all"
      >
        All
      </button>

      <div className="check_area">
        <button
          onClick={groupSelect}
          className={
            Conferences["West"] ? "group_check selected" : "group_check"
          }
          value="West"
        >
          WEST
        </button>
        <button
          onClick={select}
          className={
            Divisions["Northwest"] ? "divi_check selected" : "divi_check"
          }
          value="Northwest"
        >
          Northwest
        </button>
        <button
          onClick={select}
          className={
            Divisions["Pacific"] ? "divi_check selected" : "divi_check"
          }
          value="Pacific"
        >
          Pacific
        </button>
        <button
          onClick={select}
          className={
            Divisions["Southwest"] ? "divi_check selected" : "divi_check"
          }
          value="Southwest"
        >
          Southwest
        </button>
      </div>

      <div className="check_area">
        <button
          onClick={groupSelect}
          className={
            Conferences["East"] ? "group_check selected" : "group_check"
          }
          value="East"
        >
          EAST
        </button>
        <button
          onClick={select}
          className={
            Divisions["Atlantic"] ? "divi_check selected" : "divi_check"
          }
          value="Atlantic"
        >
          Atlantic
        </button>
        <button
          onClick={select}
          className={
            Divisions["Central"] ? "divi_check selected" : "divi_check"
          }
          value="Central"
        >
          Central
        </button>
        <button
          onClick={select}
          className={
            Divisions["Southeast"] ? "divi_check selected" : "divi_check"
          }
          value="Southeast"
        >
          Southeast
        </button>
      </div>
    </ArenaCategoryBlock>
  );
};

export default ArenaCategory;
