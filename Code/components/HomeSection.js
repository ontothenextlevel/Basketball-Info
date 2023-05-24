import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { GoJersey } from "react-icons/go";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { ImNewspaper } from "react-icons/im";
import { AiOutlineHome } from "react-icons/ai";

const animation = keyframes`
  from {
    transform:rotate(0deg) scale(0.8); filter: blur(10px);
  }
  to{
    transform:rotate(720deg) scale(1); blur(9px);
  }
`;

const HomeSectionBlock = styled.div`
  .section1 {
    width: 100vw;
    height: 100vh;
    position: fixed;

    #main_blue {
      position: absolute;
      border-bottom: 100vh solid #1c4a8a;
      border-left: 40vw solid #1c4a8a;
      border-right: 20vw solid transparent;
      transition: 0.1s;
    }
    #main_red {
      position: absolute;
      border-top: 100vh solid #c7102e;
      border-left: 20vw solid transparent;
      border-right: 40vw solid #c7102e;
      transition: 0.1s;
    }
    #border {
      width: 100%;
      height: 100%;
      background: transparent;
      position: absolute;
      top: 0;
      border-radius: 0.5%;
      overflow: hidden;

      span {
        position: absolute;
        background: #fff;
        transition: 0.1s;
      }
      span:nth-child(1) {
        left: 0;
        top: 0;
        height: 3vh;
      }
      span:nth-child(2) {
        right: 0;
        bottom: 0;
        width: 3vh;
        height: 0%;
      }
      span:nth-child(3) {
        right: 0;
        bottom: 0;
        height: 3vh;
      }
      span:nth-child(4) {
        left: 0;
        top: 0;
        width: 3vh;
        height: 0%;
      }
    }
    #man {
      height: 90vh;
      position: absolute;
      top: 50%;
      left: 50%;
      color: #fff;
      transform: translate(-50%, -50%);
      color: #fff;
    }
    .home_logo {
      position: absolute;
      top: 5vh;
      left: 5vh;
      font-size: 3vh;
      text-shadow: -0.5px 0 #fff, 0 0.5px #fff, 0.5px 0 #fff, 0 -0.5px #fff;
      background: none;
      font-family: "League Gothic", sans-serif;
      white-space: nowrap;
      width: 0;
      overflow: hidden;
      transition: 0.5s;
      &.on {
        width: 15vh;
      }
    }
    .nav {
      position: absolute;
      top: 5vh;
      right: 5vh;
      display: flex;
      flex-direction: column;
      align-items: start;
      color: #fff;
      cursor: pointer;
      transition: 0.5s;

      .nav_icon {
        font-family: "League Gothic", sans-serif;
        font-size: 3vh;
        display: block;
        position: relative;

        .nav_icon_word {
          color: #fff;
          width: 7vh;
        }

        .nav_icon_effect {
          color: #051c2d;
          text-shadow: -0.5px 0 #fff, 0 0.5px #fff, 0.5px 0 #fff, 0 -0.5px #fff;
          position: absolute;
          top: 0;
          width: 7vh;
          overflow: hidden;
          transition: 0.5s;
        }
        &:hover {
          .nav_icon_effect {
            width: 0;
          }
        }
      }

      &.on {
        transform: scale(0);
      }
    }
    .nba_info {
      position: absolute;
      top: 45%;
      left: 50%;
      border-radius: 5px;
      width: 80vh;
      overflow: hidden;
      transform: translate(-50%, -50%);
      white-space: nowrap;
      color: #051c2d;
      font-weight: bold;
      .letter {
        font-size: 15vh;
        text-shadow: -1px 0 #fff, 0 1px #fff, 1px 0 #fff, 0 -1px #fff;
        text-align: center;
      }
      .circle {
        background: #fff;
        transition: 0.3s;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .icons {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        transform: scale(0);
        transition: 0.5s;

        .icon {
          font-size: 4vh;
          border-radius: 100px;
          position: relative;
          width: 12vh;
          height: 12vh;
          cursor: pointer;

          .word {
            font-size: 4vh;
            background: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            z-index: 999;
            border-radius: 100px;
            position: absolute;
            transform: scale(0.9) rotate(720deg);
          }

          .effect {
            background: linear-gradient(#c7102e, #1c4a8a);
            filter: blur(0px);
            transition: 1s;
            width: 100%;
            height: 100%;
            border-radius: 100px;
            position: absolute;
            transform: scale(0.8);
          }

          &:hover {
            .effect {
              animation: ${animation} 0.5s 1 ease forwards;
            }
            .word {
              .word_top {
                color: #c7102e;
              }
              .word_bot {
                color: #1c4a8a;
              }
            }
          }
        }
        &.on {
          transform: scale(1);
        }
      }
      span {
        position: absolute;
        background: #fff;
      }
      span:nth-child(1) {
        width: 100%;
        height: 1vh;
        left: 0;
        top: 0;
        border-radius: 5px 5px 0 0;
      }
      span:nth-child(2) {
        height: 100%;
        width: 1vh;
        right: 0;
        top: 0;
        border-radius: 0 5px 5px 0;
      }
      span:nth-child(3) {
        width: 100%;
        height: 1vh;
        bottom: 0;
        right: 0;
        border-radius: 0 0 5px 5px;
      }
      span:nth-child(4) {
        height: 100%;
        width: 1vh;
        left: 0;
        bottom: 0;
        border-radius: 5px 0 0 5px;
      }
    }

    #scroll_explore {
      position: absolute;
      bottom: 25%;
      left: 50%;
      transform: translateX(-50%);
      transition: opacity 0.5s;
      #scroll_text {
        font-size: 3vh;
        text-shadow: 0 0 1px #fff;
      }
      #scroll_mouse {
        width: 3vw;
        height: 8vh;
        border: 0.2vh solid black;
        margin: 0 auto;
        border-radius: 30px;
        position: relative;

        #scroll_ball {
          width: 0.7vw;
          height: 2.5vh;
          background: black;
          border-radius: 30px;
          position: absolute;
          left: 50%;
          top: 15%;
          transition: 0.2s;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
`;

const HomeSection = () => {
  // red, blue section for animation
  const mainBlue = useRef();
  const mainRed = useRef();

  // border line for animation
  const mainBorderTop = useRef();
  const mainBorderBot = useRef();
  const mainBorderLeft = useRef();
  const mainBorderRight = useRef();

  // scroll div
  const scrDiv = useRef();
  const scrBall = useRef();

  // spread background color
  const [CircleBg, setCircleBg] = useState(0);

  // icons on
  const [IconsOn, setIconsOn] = useState(false);

  // set postion of red/blue animation ( position right/left start at 96% )
  const [aniPos, setAniPos] = useState(86);

  //set length of border line animation (width/height start at 0% )
  const [lineLeng, setLineLeng] = useState(0);

  //set animation order
  const [aniTrig, setAniTrig] = useState(1);

  // first animation
  useEffect(() => {
    const firstAnimation = (e) => {
      // scroll direction
      const direction = e.deltaY > 0 ? "Scroll Down" : "Scroll Up";

      // main animation
      if (direction === "Scroll Up" && aniPos < 86) {
        setAniPos(aniPos + 2);
      } else if (direction === "Scroll Down" && aniPos > 42) {
        setAniPos(aniPos - 2);
      }

      // scroll ball animation
      if (aniPos === 86) {
        if (direction === "Scroll Up") {
          setTimeout(() => (scrBall.current.style.top = "15%"), 200);
          scrDiv.current.style.opacity = "1";
        } else if (direction === "Scroll Down") {
          scrBall.current.style.top = "85%";
          setTimeout(() => (scrDiv.current.style.opacity = "0"), 200);
        }
      }

      // set next animation
      if (aniPos === 42 && aniTrig === 1) {
        setAniTrig(2);
      }
    };

    if (aniTrig === 1) {
      window.addEventListener("mousewheel", firstAnimation);
      //scroll start animation
    }

    mainBlue.current.style.right = aniPos + "%";
    mainRed.current.style.left = aniPos + "%";
    return () => {
      window.removeEventListener("mousewheel", firstAnimation);
    };
  }, [aniPos, aniTrig]);

  // second animation
  useEffect(() => {
    const secondAnimation = (e) => {
      const direction = e.deltaY > 0 ? "Scroll Down" : "Scroll Up";

      if (direction === "Scroll Up" && lineLeng > 0) {
        setLineLeng(lineLeng - 2);
      } else if (direction === "Scroll Down" && lineLeng < 100) {
        setLineLeng(lineLeng + 2);
      }

      // control animation order
      if (lineLeng <= 0 && aniTrig === 2) {
        setAniTrig(1);
      }
      // end of main animation
      else if (lineLeng === 100 && aniTrig === 2) {
        setAniTrig(3);
      }
    };

    if (aniTrig === 2) {
      window.addEventListener("mousewheel", secondAnimation);
    }
    mainBorderTop.current.style.width = lineLeng + "%";
    mainBorderBot.current.style.width = lineLeng + "%";
    mainBorderLeft.current.style.height = lineLeng + "%";
    mainBorderRight.current.style.height = lineLeng + "%";
    return () => {
      window.removeEventListener("mousewheel", secondAnimation);
    };
  }, [lineLeng, aniTrig]);

  // third animation
  useEffect(() => {
    const thirdAnimation = (e) => {
      const direction = e.deltaY > 0 ? "Scroll Down" : "Scroll Up";

      if (direction === "Scroll Up" && CircleBg > 0) {
        setCircleBg(CircleBg - 5);
      } else if (direction === "Scroll Down" && CircleBg < 80) {
        setCircleBg(CircleBg + 5);
      }

      // control animation order
      if (CircleBg <= 0 && aniTrig === 3) {
        setAniTrig(2);
      }
      // end of main animation
      else if (CircleBg === 80 && aniTrig === 3) {
        setIconsOn(true);
      } else if (CircleBg < 80 || (CircleBg > 0 && aniTrig === 3)) {
        setIconsOn(false);
      }
    };

    if (aniTrig === 3) {
      window.addEventListener("mousewheel", thirdAnimation);
    }

    return () => {
      window.removeEventListener("mousewheel", thirdAnimation);
    };
  }, [CircleBg, aniTrig]);

  return (
    <HomeSectionBlock>
      <div className="section1">
        <div ref={mainBlue} id="main_blue"></div>
        <div ref={mainRed} id="main_red"></div>
        <div id="border">
          <span ref={mainBorderTop}></span>
          <span ref={mainBorderRight}></span>
          <span ref={mainBorderBot}></span>
          <span ref={mainBorderLeft}></span>
        </div>
        <img id="man" src="images/people.svg" alt="" />

        <button className={IconsOn === true ? "home_logo on" : "home_logo"}>
          <Link to="/">BASKETBALL INFO</Link>
        </button>

        <div className={IconsOn === true ? "nav on" : "nav"}>
          <div className="nav_icon">
            <div className="nav_icon_word">
              <Link to="/player">PLAYER</Link>
            </div>
            <div className="nav_icon_effect">PLAYER</div>
          </div>

          <div className="nav_icon">
            <div className="nav_icon_word">
              <Link to="/video">VIDEO</Link>
            </div>
            <div className="nav_icon_effect">VIDEO</div>
          </div>

          <div className="nav_icon">
            <Link className="nav_icon_word" to="/news">
              NEWS
            </Link>

            <div className="nav_icon_effect">NEWS</div>
          </div>

          <div className="nav_icon">
            <div className="nav_icon_word">
              <Link to="/arena">ARENA</Link>
            </div>
            <div className="nav_icon_effect">ARENA</div>
          </div>
        </div>

        <div className="nba_info">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <div className="letter">BASKETBALL INFO</div>

          <div
            className="circle"
            style={{ width: `${CircleBg}vh`, height: `${CircleBg}vh` }}
          ></div>

          <div className={IconsOn === true ? "icons on" : "icons"}>
            <Link to="/player">
              <div className="icon">
                <div className="word">
                  <GoJersey className="word_top" />
                  <div className="word_bot">PLAYER</div>
                </div>
                <div className="effect"></div>
              </div>
            </Link>
            <Link to="/video">
              <div className="icon">
                <div className="word">
                  <MdOutlineOndemandVideo className="word_top" />
                  <div className="word_bot">VIDEO</div>
                </div>
                <div className="effect"></div>
              </div>
            </Link>
            <Link to="/news">
              <div className="icon">
                <div className="word">
                  <ImNewspaper className="word_top" />
                  <div className="word_bot">NEWS</div>
                </div>
                <div className="effect"></div>
              </div>
            </Link>
            <Link to="/arena">
              <div className="icon">
                <div className="word">
                  <AiOutlineHome className="word_top" />
                  <div className="word_bot">ARENA</div>
                </div>
                <div className="effect"></div>
              </div>
            </Link>
          </div>
        </div>

        <div ref={scrDiv} id="scroll_explore">
          <p id="scroll_text">Scroll to Explore</p>
          <div id="scroll_mouse">
            <div ref={scrBall} id="scroll_ball"></div>
          </div>
        </div>
      </div>
    </HomeSectionBlock>
  );
};

export default HomeSection;
