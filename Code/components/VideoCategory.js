import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import jsonList from "../db/jsonList.json";
import Footer from "./Footer";

const VideoCategoryBlock = styled.div`
  height: calc(100vh - 70px);
  width: 250px;
  float: left;
  margin-left: -250px;
  transition: margin 0.5s;
  position: sticky;
  top: 70px;
  z-index: -9;
  color: #fff;
  padding: 10px 25px 50px 25px;
  background: #051c2d;
  z-index: 999999999;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &.on {
    margin-left: 0px;
  }
  &.fixed {
    position: fixed;
    top: 70px;
    left: 0;
    z-index: 9999999999;
  }
  .east,
  .west {
    font-size: 35px;
    text-align: center;
  }
  ul {
    margin: 15px 0;
    position: relative;
    padding: 15px 0;
    div {
      font-size: 20px;
      position: absolute;
      top: -6%;
      left: -5%;
      background: #051c2d;
      padding: 0px 10px 0px 0px;
      z-index: 9;
    }
    .teams {
      button {
        width: 100%;
        background: none;
        color: #fff;
        font-size: 16px;
        padding: 10px 3px;
        text-align: left;
        border-radius: 10px;
        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      }
      &.on {
        button {
          background: #fff;
          color: #000;
        }
      }
    }
    span {
      display: inline-block;
      width: 100%;
      height: 1px;
      background: #fff;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  .shadow {
    width: 0;
    height: calc(100vh - 70px);
    background: #051c2d;
    opacity: 0.5;
    position: fixed;
    right: 0;
    top: 70px;
    transition: all 0.5s;
    &.on {
      width: calc(100vw - 250px);
    }
  }
  .back {
    color: #fff;
    transition: transform 0.5s;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999999;
    .open {
      transform: scale(0.6);
      width: 70px;
      height: 70px;
      cursor: pointer;
      &:hover {
        .bar1 {
          height: 10px;
          width: 30px;
          transform: rotateZ(-35deg) translate(-31px, -17px);
        }
        .bar2 {
          width: 70px;
          height: 10px;
        }
        .bar3 {
          height: 10px;
          width: 30px;
          transform: rotateZ(35deg) translate(-31px, 17px);
        }
      }
    }
    .open .bar {
      display: block;
      height: 4px;
      width: 50px;
      background: #fff;
      border-radius: 2px;
      position: absolute;
      transition: all 0.3s;
    }
    .open .bar1 {
      left: 50%;
      top: 25%;
      transform: translateX(-50%);
    }
    .open .bar2 {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .open .bar3 {
      left: 50%;
      bottom: 25%;
      transform: translateX(-50%);
    }
  }
`;

const VideoCategory = (props) => {
  const navigate = useNavigate();

  const [List, setList] = useState([]);
  const [IsOn, setIsOn] = useState({});

  // jsonlist set state
  useEffect(() => {
    setList(jsonList.TeamList);
  }, []);

  // click hamberger menu to disappear / appear this component
  const sideSlide = () => {
    props.setCateOn(!props.CateOn);
  };

  // pick teams
  const picking = (data) => {
    setIsOn({
      [data.Name]: true,
    });

    window.scrollTo(0, 0);

    navigate(`/video?team=${data.Abbreviation}`);
  };

  return (
    <VideoCategoryBlock
      className={`${props.CateOn ? "on" : ""} ${props.PlayerOn ? "fixed" : ""}`}
    >
      <div
        className="back"
        style={{ transform: props.CateOn ? "" : "rotateY(180deg)" }}
        onClick={sideSlide}
      >
        <div className="open">
          <span className="bar bar1"></span>
          <span className="bar bar2"></span>
          <span className="bar bar3"></span>
        </div>
      </div>
      <div
        className={`shadow ${
          props.CateOn === true && props.PlayerOn === true ? "on" : ""
        }`}
        onClick={sideSlide}
      ></div>
      <div className="wrap_east">
        <div className="east">EAST</div>

        <ul className="atlantic_list">
          <div>ATLANTIC</div>
          {List.filter((data) => data.Division === "Atlantic").map((data) => (
            <li
              className={IsOn[`${data.Name}`] ? "teams on" : "teams"}
              key={data.Name}
            >
              <button value={data.Name} onClick={() => picking(data)}>
                {data.Name}
              </button>
            </li>
          ))}
          <span></span>
        </ul>

        <ul className="central_list">
          <div>CENTRAL</div>
          {List.filter((data) => data.Division === "Central").map((data) => (
            <li
              className={IsOn[`${data.Name}`] ? "teams on" : "teams"}
              key={data.Name}
            >
              <button value={data.Name} onClick={() => picking(data)}>
                {data.Name}
              </button>
            </li>
          ))}
          <span></span>
        </ul>

        <ul className="southeast_list">
          <div>SOUTHEAST</div>
          {List.filter((data) => data.Division === "Southeast").map((data) => (
            <li
              className={IsOn[`${data.Name}`] ? "teams on" : "teams"}
              key={data.Name}
            >
              <button value={data.Name} onClick={() => picking(data)}>
                {data.Name}
              </button>
            </li>
          ))}
          <span></span>
        </ul>
      </div>
      <div className="wrap_west">
        <div className="west">WEST</div>

        <ul className="northwest_list">
          <div>NORTHWEST</div>
          {List.filter((data) => data.Division === "Northwest").map(
            (data, index) => (
              <li
                className={IsOn[`${data.Name}`] ? "teams on" : "teams"}
                key={data.Name}
              >
                <button value={data.Name} onClick={() => picking(data)}>
                  {data.Name}
                </button>
              </li>
            )
          )}
          <span></span>
        </ul>

        <ul className="pacific_list">
          <div>PACIFIC</div>
          {List.filter((data) => data.Division === "Pacific").map(
            (data, index) => (
              <li
                className={IsOn[`${data.Name}`] ? "teams on" : "teams"}
                key={data.Name}
              >
                <button value={data.Name} onClick={() => picking(data)}>
                  {data.Name}
                </button>
              </li>
            )
          )}
          <span></span>
        </ul>

        <ul className="southwest_list">
          <div>SOUTHWEST</div>
          {List.filter((data) => data.Division === "Southwest").map(
            (data, index) => (
              <li
                className={IsOn[`${data.Name}`] ? "teams on" : "teams"}
                key={data.Name}
              >
                <button value={data.Name} onClick={() => picking(data)}>
                  {data.Name}
                </button>
              </li>
            )
          )}
          <span></span>
        </ul>
      </div>
      <Footer />
    </VideoCategoryBlock>
  );
};

export default VideoCategory;
