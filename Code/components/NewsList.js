import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import jsonList from "../db/jsonList.json";

const spin = keyframes`

from{
   transform:translate(-50%,-50%) rotateZ(0deg);
}
to{
  transform:translate(-50%,-50%) rotateZ(360deg);
  
}
`;
const NewsListBlock = styled.div`
  min-height: calc(100vh - 220px);
  background: #051c2d;
  positon: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 1s;

  &.load {
    opacity: 1;
  }

  .ball {
    position: absolute;
    z-index: 0;
    width: 600px;
    height: 600px;
    transition: 0.5s;

    &.off {
      position: absolute;
      transform: translateY(-100vh);
    }

    &::before {
      border-radius: 50%;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #07263d;
      opacity: 0.5;
    }

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      border-radius: 50%;
      z-index: -9;
      opacity: 0;
      transition: 0.75s;
      &.on {
        opacity: 1;
      }
    }

    .object {
      writing-mode: vertical-rl;
      font-size: 23px;
      color: #fff;
      position: absolute;
      transform: translateY(-50%);
      z-index: 9999999;
      textPath {
        transition: 0.5s;
      }
    }
    .text1 {
      left: 0;
      top: 25%;
    }
    .text2 {
      right: 0;
      top: 25%;
    }
    .text3 {
      left: 0;
      top: 50%;
    }
    .text4 {
      right: 0;
      top: 50%;
    }
    .text5 {
      left: 0;
      top: 75%;
    }
    .text6 {
      right: 0;
      top: 75%;
    }
    .line {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scaleY(0.8) scaleX(1.75);
      font-size: 28px;
      user-select: none;
      writing-mode: vertical-rl;
      text-orientation: upright;
      letter-spacing: -8px;
      word-spacing: -20px;
    }
    .circle {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      animation: 35s linear ${spin} infinite;
      user-select: none;
      .team {
        font-size: 31.7px;
        margin: 30px;
        transition: 0.5s;
      }
    }
  }
`;

const NewsList = (props) => {
  const [HoveredTitle, setHoveredTitle] = useState(null);

  // useRef multiple variables
  const refs = useRef(
    Array(6)
      .fill(null)
      .map(() => React.createRef())
  );

  const [Ball, setBall] = useState({});

  const [TextOpacity, setTextOpacity] = useState({
    text1: true,
    text2: true,
    text3: true,
    text4: true,
    text5: true,
    text6: true,
  });

  const [TeamOpacity, setTeamOpacity] = useState({});

  const [Time, setTime] = useState();

  // textPath StartOffset
  const [StartOffset, setStartOffset] = useState({
    text1: 0,
    text2: 0,
    text3: 0,
    text4: 0,
    text5: 0,
    text6: 0,
  });

  // set default data on the circle
  useEffect(() => {
    const defaultCircle = () => {
      const now = new Date();
      const options = {
        timeZone: "America/New_York",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h23",
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      const formattedDate = formatter.format(now).replace(/,/g, " - ");
      setTime(formattedDate);

      // make all TeamOpacity true
      const initialOpacity = {};
      jsonList.TeamList.forEach((item) => {
        initialOpacity[item.Name.toString().split(" ").pop()] = true;
      });
      setTeamOpacity(initialOpacity);
    };

    defaultCircle();
  }, []);

  // set line on the ball by article title
  useEffect(() => {
    if (props.Articles.length !== 0) {
      refs.current.forEach((textPathRef, index) => {
        const pathLength =
          textPathRef.current.ownerSVGElement.childNodes[0].getTotalLength();
        const textLength =
          textPathRef.current.parentNode.getComputedTextLength();

        // if title is too short, replace empty space with hyphen
        if (textLength < pathLength) {
          const remainingLength = pathLength - textLength;
          const addHyphen = "-".repeat(Math.round(remainingLength / 8));
          textPathRef.current.textContent += addHyphen;
        }
      });
    }
  }, [props.Articles]);

  // if title is too long, hover to flow to the left and show end of the title
  useEffect(() => {
    if (HoveredTitle) {
      const pathLength =
        HoveredTitle.ownerSVGElement.childNodes[0].getTotalLength();
      const textLength = HoveredTitle.parentNode.getComputedTextLength();
      const percentage = -(((textLength - pathLength) / pathLength) * 100);

      if (pathLength < textLength) {
        const intervalId = setInterval(() => {
          setStartOffset((prevStartOffset) => {
            const newStartOffset =
              prevStartOffset[HoveredTitle.ownerSVGElement.classList[0]] - 0.5;

            if (newStartOffset < percentage - 10) {
              return {
                ...prevStartOffset,
                [HoveredTitle.ownerSVGElement.classList[0]]: 0,
              };
            } else {
              return {
                ...prevStartOffset,
                [HoveredTitle.ownerSVGElement.classList[0]]: newStartOffset,
              };
            }
          });
        }, 50);

        return () => clearInterval(intervalId);
      }
    }
  }, [HoveredTitle]);

  // hover on the title
  const handleMouseEnter = (event) => {
    setHoveredTitle(event.target);

    // set background image
    setBall({
      [event.target.ownerSVGElement.classList[0]]: true,
    });

    // mouse on title to shade
    setTextOpacity({
      [event.target.ownerSVGElement.classList[0]]: true,
    });

    // make all TeamOpacity true
    const aboutThisTeam = {};
    const articleIndex =
      event.target.ownerSVGElement.classList[0].slice(-1) - 1;
    const thisArticle = props.Articles[articleIndex].categories;

    thisArticle
      .filter((category) => category.type === "team")
      .map((category) => {
        aboutThisTeam[category.description.toString().split(" ").pop()] = true;
        return null;
      });

    setTeamOpacity(aboutThisTeam);
  };

  // mouse leave to make default state
  const handleMouseLeave = () => {
    setStartOffset({
      text1: 0,
      text2: 0,
      text3: 0,
      text4: 0,
      text5: 0,
      text6: 0,
    });
    setBall({});
    setHoveredTitle(null);
    setTextOpacity({
      text1: true,
      text2: true,
      text3: true,
      text4: true,
      text5: true,
      text6: true,
    });

    // make all TeamOpacity true
    const initialOpacity = {};
    jsonList.TeamList.forEach((item) => {
      initialOpacity[item.Name.toString().split(" ").pop()] = true;
    });
    setTeamOpacity(initialOpacity);
  };

  const handleClick = (event) => {
    const articleIndex = parseInt(
      event.target.ownerSVGElement.classList[0].slice(-1)
    );
    props.setCurrentIndex(articleIndex);
  };

  return (
    <NewsListBlock className={props.ApiLoading ? "load" : " "}>
      <div className={props.CurrentIndex === 0 ? "ball" : "ball off"}>
        <img
          src={props.Articles[0]?.images[0]?.url}
          className={Ball["text1"] ? "bg bg1 on" : "bg bg1"}
          alt=""
        />
        <svg className="text1 object" width="300" height="105">
          <path id="myPath1" d="M 70 15 C 170 75, 195 80, 280 95" fill="none" />
          <text>
            <textPath
              ref={refs.current[0]}
              stroke="black"
              style={{
                cursor: "pointer",
                opacity: TextOpacity["text1"] ? "1" : "0.2",
              }}
              startOffset={StartOffset["text1"] + "%"}
              xlinkHref="#myPath1"
              fill="white"
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {props.Articles[0]?.headline}
            </textPath>
          </text>
        </svg>

        <img
          src={props.Articles[1]?.images[0]?.url}
          className={Ball["text2"] ? "bg bg2 on" : "bg bg2"}
          alt=""
        ></img>
        <svg className="text2 object" width="300" height="105">
          <path id="myPath2" d="M 20 95 C 110 75, 135 75, 230 15" fill="none" />
          <text>
            <textPath
              ref={refs.current[1]}
              stroke="black"
              style={{
                cursor: "pointer",
                opacity: TextOpacity["text2"] ? "1" : "0.2",
              }}
              startOffset={StartOffset["text2"] + "%"}
              xlinkHref="#myPath2"
              fill="white"
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {props.Articles[1]?.headline}
            </textPath>
          </text>
        </svg>

        <img
          src={props.Articles[2]?.images[0]?.url}
          className={Ball["text3"] ? "bg bg3 on" : "bg bg3"}
          alt=""
        ></img>
        <svg className="text3 object" width="300" height="100">
          <path id="myPath3" d="M 5 50 , 275 50" fill="none" />
          <text>
            <textPath
              ref={refs.current[2]}
              stroke="black"
              style={{
                cursor: "pointer",
                opacity: TextOpacity["text3"] ? "1" : "0.2",
              }}
              startOffset={StartOffset["text3"] + "%"}
              xlinkHref="#myPath3"
              fill="white"
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {props.Articles[2]?.headline}
            </textPath>
          </text>
        </svg>

        <img
          src={props.Articles[3]?.images[0]?.url}
          className={Ball["text4"] ? "bg bg4 on" : "bg bg4"}
          alt=""
        ></img>
        <svg className="text4 object" width="300" height="100">
          <path id="myPath4" d="M 20 50 , 295 50" fill="none" />
          <text>
            <textPath
              ref={refs.current[3]}
              stroke="black"
              style={{
                cursor: "pointer",
                opacity: TextOpacity["text4"] ? "1" : "0.2",
              }}
              startOffset={StartOffset["text4"] + "%"}
              xlinkHref="#myPath4"
              fill="white"
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {props.Articles[3]?.headline}
            </textPath>
          </text>
        </svg>

        <img
          src={props.Articles[4]?.images[0]?.url}
          className={Ball["text5"] ? "bg bg5 on" : "bg bg5"}
          alt=""
        ></img>
        <svg className="text5 object" width="300" height="115">
          <path id="myPath5" d="M 65 90 C 170 30, 195 35, 280 20" fill="none" />
          <text>
            <textPath
              ref={refs.current[4]}
              stroke="black"
              style={{
                cursor: "pointer",
                opacity: TextOpacity["text5"] ? "1" : "0.2",
              }}
              startOffset={StartOffset["text5"] + "%"}
              xlinkHref="#myPath5"
              fill="white"
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {props.Articles[4]?.headline}
            </textPath>
          </text>
        </svg>

        <img
          src={props.Articles[5]?.images[0]?.url}
          className={Ball["text6"] ? "bg bg6 on" : "bg bg6"}
          alt=""
        ></img>
        <svg className="text6 object" width="300" height="115">
          <path id="myPath6" d="M 20 20 C 105 35 ,130 30, 235 90" fill="none" />
          <text>
            <textPath
              ref={refs.current[5]}
              stroke="black"
              style={{
                cursor: "pointer",
                opacity: TextOpacity["text6"] ? "1" : "0.2",
              }}
              startOffset={StartOffset["text6"] + "%"}
              xlinkHref="#myPath6"
              fill="white"
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {props.Articles[5]?.headline}
            </textPath>
          </text>
        </svg>

        <svg className="line" width="50" height="755">
          <path id="myPath7" d="M 25 0 , 25 740" fill="none" />
          <text>
            <textPath stroke="black" href="#myPath7" fill="white">
              {Time + " EST - NBA NEWS"}
            </textPath>
          </text>
        </svg>
        <svg className="circle" width="680" height="680">
          <path
            id="myPath"
            d="M 340 340 m -310, 0 a 310,310 0 0,1 620,0 a 310,310 0 0,1 -620,0"
            fill="none"
          />
          <text>
            <textPath href="#myPath" fill="white">
              {jsonList.TeamList.map((item) => (
                <tspan
                  style={{
                    opacity: TeamOpacity[item.Name.toString().split(" ").pop()]
                      ? "1"
                      : "0.2",
                  }}
                  className="team"
                  key={item.Name.toString().split(" ").pop()}
                >
                  {" "}
                  {item.Name.split(" ").pop()}{" "}
                </tspan>
              ))}
            </textPath>
          </text>
        </svg>
      </div>
    </NewsListBlock>
  );
};

export default NewsList;
