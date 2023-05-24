import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderBlock = styled.div`
  color: #fff;
  background: #051c2d;
  width: 100%;
  height: 70px;
  font-family: "League Gothic", sans-serif;
  font-weight: bold;
  font-size: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  z-index: 999999999;
  top: 0;

  white-space: nowrap;

  .logoArea {
    margin: 0 80px;
  }
  .depth1 {
    display: flex;
    margin: 0 60px;
    li {
      margin: 0 20px;
    }
  }
`;

const Header = () => {
  const handleLinkClick = (e) => {
    const currentURL = window.location.href;
    const thisButton = e.target.href.split("/").pop();

    if (currentURL.includes(thisButton)) {
      e.preventDefault();
    }
  };

  return (
    <HeaderBlock>
      <div className="logoArea">
        <Link to="/">BASKETBALL INFO</Link>
      </div>

      <ul className="depth1">
        <li>
          <Link to="/player" onClick={handleLinkClick}>
            PLAYER
          </Link>
        </li>
        <li>
          <Link to="/video" onClick={handleLinkClick}>
            VIDEO
          </Link>
        </li>
        <li>
          <Link to="/news" onClick={handleLinkClick}>
            NEWS
          </Link>
        </li>
        <li>
          <Link to="/arena" onClick={handleLinkClick}>
            ARENA
          </Link>
        </li>
      </ul>
    </HeaderBlock>
  );
};

export default Header;
