import React from "react";
import styled, { keyframes } from "styled-components";

const progress = keyframes`
from {
    width:0;
  }
  to{
    width:100%;
  }

`;

const VideoLoadingBlock = styled.div`
  position: sticky;
  top: 70px;
  width: 100%;
  height: 1px;
  background: red;
  z-index: 9999999999999999999999;
  display: none;
  &.on {
    display: block;
    animation: 1s ${progress} infinite;
  }
`;

const VideoLoading = (props) => {
  return (
    <VideoLoadingBlock
      className={props.Loading ? "on" : ""}
    ></VideoLoadingBlock>
  );
};

export default VideoLoading;
