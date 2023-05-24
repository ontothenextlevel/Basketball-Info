import React from "react";
import styled from "styled-components";
import { BsGithub } from "react-icons/bs";

const FooterBlock = styled.div`
  width: 100%;
  height: 150px;
  background: #051c2d;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  color: rgb(220, 220, 220);
  .footer_top {
    flex: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .link {
      font-size: 40px;
      margin-bottom: 10px;
    }
    .copyright {
      margin-bottom: 10px;
      a {
        text-decoration: underline;
      }
    }
  }
  .footer_bot {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    p {
      margin: 0 10px;
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  return (
    <FooterBlock>
      <div className="footer_top">
        <div className="link">
          <BsGithub />
        </div>
        <div className="copyright">
          copyright all rights reserverd ©{" "}
          <a
            href="https://github.com/ontothenextlevel"
            target="_blank"
            rel="noopener noreferrer"
          >
            ontothenextlevel
          </a>
        </div>
      </div>
      <div className="footer_bot">
        <p>
          <a
            href="https://sportsdata.io/nba-api"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sportsdata.io NBA API
          </a>
        </p>
        <p>
          <a
            href="https://developers.google.com/youtube/v3?hl=ko"
            target="_blank"
            rel="noopener noreferrer"
          >
            Youtube Data API v3
          </a>
        </p>
        <p>
          <a
            href="https://gist.github.com/akeaswaran/b48b02f1c94f873c6655e7129910fc3b"
            target="_blank"
            rel="noopener noreferrer"
          >
            ESPN NBA API
          </a>
        </p>
        <p>
          <a
            href="https://developers.google.com/maps?hl=ko"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Maps API
          </a>
        </p>
      </div>
    </FooterBlock>
  );
};

export default Footer;
