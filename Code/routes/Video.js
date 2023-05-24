import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import VideoCategory from "../components/VideoCategory";
import VideoList from "../components/VideoList";
import VideoPlayer from "../components/VideoPlayer";
import VideoLoading from "../components/VideoLoading";

const VideoBlock = styled.div`
  background: #051c2d;
`;

const Video = () => {
  const [Video, setVideo] = useState([]);
  const [CateOn, setCateOn] = useState(true);
  const [PlayerOn, setPlayerOn] = useState();
  const [Loading, setLoading] = useState();

  return (
    <VideoBlock>
      <Header />
      <VideoLoading Loading={Loading} />
      <VideoCategory
        PlayerOn={PlayerOn}
        CateOn={CateOn}
        setCateOn={setCateOn}
      />
      <Routes>
        <Route
          path="play/:videoid"
          element={
            <VideoPlayer
              setCateOn={setCateOn}
              setPlayerOn={setPlayerOn}
              Video={Video}
            />
          }
        />
      </Routes>
      <VideoList
        setLoading={setLoading}
        PlayerOn={PlayerOn}
        setVideo={setVideo}
      />
    </VideoBlock>
  );
};

export default Video;
