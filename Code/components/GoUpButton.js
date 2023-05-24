import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { IoMdBasketball } from "react-icons/io";
import { GiBasketballBasket } from "react-icons/gi";
import { ImArrowUp } from "react-icons/im";

const bang = keyframes`
  from {
    box-shadow: 0 0 blue, 0 0 #00ff84, 0 0 #002bff, 0 0 #ff009d, 0 0 #ffb300, 0 0 #ff006e, 0 0 #ff4000, 0 0 #ff00d0, 0 0 #00f6ff, 0 0 #99ff00, 0 0 #ff0400, 0 0 #6200ff, 0 0 #00ddff, 0 0 #00ffd0, 0 0 #00ffdd, 0 0 #a6ff00, 0 0 #0d00ff, 0 0 #005eff, 0 0 #ff00a6, 0 0 #ff004c, 0 0 #ff6600, 0 0 #ff0066, 0 0 #00ffa2, 0 0 #b700ff, 0 0 #9000ff, 0 0 #00bbff, 0 0 #ff002f, 0 0 #ffae00, 0 0 #f600ff, 0 0 #c800ff, 0 0 #d4ff00, 0 0 #ea00ff, 0 0 #ff00d4, 0 0 #00fff2, 0 0 #000dff, 0 0 #9dff00, 0 0 #a6ff00, 0 0 #0099ff, 0 0 #ea00ff, 0 0 #00fffb, 0 0 #00ff73, 0 0 #0088ff, 0 0 #0062ff, 0 0 #b300ff, 0 0 #9000ff, 0 0 #ff6600, 0 0 #1e00ff, 0 0 #c800ff, 0 0 #00ffc8, 0 0 #00ff33, 0 0 #ff008c;;
  }
`;

const gravity = keyframes`
  from {
    opacity: 1;
  }
  to {
    transform: translateY(100px);
    
    opacity: 0;
  }
`;

const increase = keyframes`

50%{
  transform: scale(1.3);
}
100%{
  transform: scale(1);
  
}
`;

const GoUpButtonBlock = styled.div`
  height: 100%;

  .rimArea {
    position: absolute;
    top: 92%;
    right: 2%;
    width: 80px;
    z-index: 9999999999;
    transform: translateY(-50%);

    .rimIcon {
      font-size: 60px;
      transform: scale(1.5);
      display: block;
      margin: 0 auto;
    }

    .scoreBoard {
      width: 80px;
      height: 50px;
      color: red;
      font-weight: bold;
      font-family: "Orbitron", sans-serif;
      text-align: center;
      position: absolute;
      &.scoring {
        animation: 0.5s ${increase} 1;
      }
    }

    .pyro {
      margin: 0 auto;
      opacity: 0;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      box-shadow: -10px -58.66667px blue, 128px -6.66667px #00ff84,
        80px 6.33333px #002bff, -3px -138.66667px #ff009d,
        -9px -117.66667px #ffb300, -40px -143.66667px #ff006e,
        106px -21.66667px #ff4000, 70px -181.66667px #ff00d0,
        -2px -168.66667px #00f6ff, 100px -188.66667px #99ff00,
        -59px -17.66667px #ff0400, -1px -169.66667px #6200ff,
        45px -87.66667px #00ddff, -42px -150.66667px #00ffd0,
        -40px -27.66667px #00ffdd, -85px -65.66667px #a6ff00,
        -78px 0.33333px #0d00ff, 2px -189.66667px #005eff,
        59px -215.66667px #ff00a6, 58px -0.66667px #ff004c,
        -124px 14.33333px #ff6600, 87px -155.66667px #ff0066,
        -91px -72.66667px #00ffa2, 116px -16.66667px #b700ff,
        30px -96.66667px #9000ff, 15px -65.66667px #00bbff,
        8px -181.66667px #ff002f, 34px -1.66667px #ffae00,
        26px -68.66667px #f600ff, -53px -86.66667px #c800ff,
        -98px -67.66667px #d4ff00, -24px -207.66667px #ea00ff,
        -26px -212.66667px #ff00d4, 89px -6.66667px #00fff2,
        81px -108.66667px #000dff, -12px -81.66667px #9dff00,
        29px -192.66667px #a6ff00, 46px -2.66667px #0099ff,
        -46px -106.66667px #ea00ff, -53px -73.66667px #00fffb,
        -118px -176.66667px #00ff73, 52px -163.66667px #0088ff,
        124px -60.66667px #0062ff, 104px -32.66667px #b300ff,
        31px -48.66667px #9000ff, 91px -115.66667px #ff6600,
        71px -18.66667px #1e00ff, 80px -13.66667px #c800ff,
        79px 60.33333px #00ffc8, -8px -183.66667px #00ff33,
        0px -6.66667px #ff008c;

      &.firework {
        animation: 1s ${bang} ease-out 1, 1s ${gravity} ease-in 1;
      }
    }
  }

  .ballArea {
    z-index: 999999999999;
    position: fixed;
    top: 92%;
    right: 2%;
    width: 80px;
    height: 50px;
    transform: translateY(-50%);
    .ballText {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 28px;
      font-weight: bold;
      color: #000;
      width: 50px;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      padding: 10px;
      transition: 1s;
    }
    .ballButton {
      font-size: 50px;
      color: #e16330;
      transition: 0.6s;
      display: block;
      margin: 0 auto;
    }
  }
`;

const GoUpButton = () => {
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false);
  const [BtnEffect, setBtnEffect] = useState(false);
  const [FirstBtnStatus, setFirstBtnStatus] = useState(false);
  const [Score, setScore] = useState(0);
  const [BtnOn, setBtnOn] = useState(false);
  const scored = ("00" + Score).slice(-2);

  const [BodyHeight, setBodyHeight] = useState(document.body.offsetHeight);

  // to observe body height for setState
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === document.body) {
          setBodyHeight(entry.contentRect.height);
        }
      }
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.unobserve(document.body);
    };
  }, []);

  // set button state by contents height
  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight; // 100vh
      const footerHeight = 150;

      if (windowHeight + footerHeight < BodyHeight) {
        setBtnOn(true);
      } else {
        setBtnOn(false);
      }
    };

    handleResize();
  }, [BodyHeight]);

  // click to top
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setBtnStatus(true);
  };

  // first scroll to appear go top button
  useEffect(() => {
    const firstScroll = () => {
      setFirstBtnStatus(true);
    };

    if (FirstBtnStatus === false) {
      window.addEventListener("scroll", firstScroll);
    }

    return () => {
      window.removeEventListener("scroll", firstScroll);
    };
  });

  // make button state default to scroll after click button and reach on top
  useEffect(() => {
    const scrollDefualt = () => {
      setBtnStatus(false);
      setBtnEffect(false);
    };

    if (ScrollY === 0 && BtnStatus === true) {
      setScore((prevScore) => prevScore + 1);
      setBtnEffect(true);
      window.addEventListener("scroll", scrollDefualt);
    }
    return () => {
      window.removeEventListener("scroll", scrollDefualt);
    };
  }, [ScrollY, BtnStatus]);

  // set now scroll
  useEffect(() => {
    const handleFollow = () => {
      setScrollY(window.pageYOffset);
    };

    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

  return (
    <GoUpButtonBlock
      style={{ display: FirstBtnStatus && BtnOn ? "block" : "none" }}
    >
      <div title="Scroll To Active" className="rimArea">
        <div
          className={BtnEffect === true ? "scoreBoard scoring" : "scoreBoard"}
        >
          {scored}
        </div>
        <div className={BtnEffect === true ? "pyro firework" : "pyro"}></div>
        <GiBasketballBasket className="rimIcon" />
      </div>

      <div className="ballArea">
        <IoMdBasketball
          className="ballButton"
          style={{ transform: BtnEffect ? "scale(0)" : "scale(1.4)" }}
        />

        <ImArrowUp
          className="ballText"
          onClick={handleTop}
          style={{
            opacity: BtnStatus ? "0" : "1",
            top: BtnStatus ? "-100px" : "",
          }}
        />
      </div>
    </GoUpButtonBlock>
  );
};

export default GoUpButton;
