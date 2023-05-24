import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { BsTriangleFill } from "react-icons/bs";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { TiArrowRightThick } from "react-icons/ti";

const twoSecond = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const grow = keyframes`
  from {
    font-size:50px;
  }
  to {
    font-size:65px;
  }
`;

const NewsControlBlock = styled.div`
  width: 100%;
  height: 100%;
  color: #fff;
  user-select: none;
  .prev {
    position: absolute;
    left: 3%;
    z-index: 99999999999;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    .ballIcon {
      font-size: 50px;
      position: absolute;
      margin-left: 8px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #051c2d;
    }
    .arrowIcon {
      font-size: 100px;
      transform: rotate(-90deg);
    }
  }
  .next {
    position: absolute;
    right: 3%;
    z-index: 99999999999;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    .ballIcon {
      font-size: 50px;
      position: absolute;
      margin-right: 8px;
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
      color: #051c2d;
    }
    .arrowIcon {
      font-size: 100px;
      transform: rotate(90deg);
    }
  }

  .button {
    position: relative;
    margin: 20px 0 20px 0;
    cursor: pointer;
    .ballIcon {
      opacity: 0;
      &:active {
        animation: 3s ${twoSecond} 1, 1s ${grow} 1s 1;
      }
    }
  }

  .click {
    font-size: 20px;
    display: flex;
    align-items: center;
  }
  .press {
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  &.off {
    display: none;
  }
`;

const NewsControl = (props) => {
  const [Timer, setTimer] = useState(null);

  const [TwoSecond, setTwoSecond] = useState();

  //click prev button
  const handlePrevMouseUp = () => {
    clearTimeout(Timer);
    if (Timer && TwoSecond === true) {
      setTimer(null);
    } else if (TwoSecond === false) {
      props.setCurrentIndex((prevIndex) =>
        prevIndex > 1 ? prevIndex - 1 : props.Articles.length
      );
    }
  };

  // click next button
  const handleNextMouseUp = () => {
    clearTimeout(Timer);
    if (Timer && TwoSecond === true) {
      setTimer(null);
    } else if (TwoSecond === false) {
      props.setCurrentIndex((prevIndex) =>
        prevIndex < props.Articles.length ? prevIndex + 1 : 1
      );
    }
  };

  // press button in 2s go to news main
  const handleMouseDown = () => {
    setTimer(
      setTimeout(() => {
        props.setCurrentIndex(0);
        setTimer(null);
        setTwoSecond(true);
      }, 2000)
    );
    setTwoSecond(false);
  };

  return (
    <NewsControlBlock className={props.CurrentIndex === 0 ? "off" : ""}>
      <div className="prev">
        <div className="click">
          CLICK <TiArrowRightThick />{" "}
          {props.CurrentIndex === 1
            ? props.Articles.length
            : props.CurrentIndex - 1}
        </div>
        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handlePrevMouseUp}
          className="button"
        >
          <BsTriangleFill className="arrowIcon" />
          <MdOutlineSportsBasketball className="ballIcon" />
        </div>
        <div className="press">
          PRESS 2s <TiArrowRightThick /> <MdOutlineSportsBasketball />{" "}
        </div>
      </div>
      <div className="next">
        <div className="click">
          CLICK <TiArrowRightThick />{" "}
          {props.CurrentIndex === props.Articles.length
            ? 1
            : props.CurrentIndex + 1}
        </div>
        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleNextMouseUp}
          className="button"
        >
          <BsTriangleFill className="arrowIcon" />
          <MdOutlineSportsBasketball className="ballIcon" />
        </div>

        <div className="press">
          PRESS 2s <TiArrowRightThick /> <MdOutlineSportsBasketball />{" "}
        </div>
      </div>
    </NewsControlBlock>
  );
};

export default NewsControl;
