import React, { useEffect, useState, useRef, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import jsonList from "../db/jsonList.json";

const screw = keyframes`
  from {
    transform:rotate(0deg);
    
  }
  to {
    
    transform:rotate(360deg);
  }
`;
const grow = keyframes`
  from {
    transform:scale(0) rotate(0deg);
    
  }
  to {
    
    transform:scale(1) rotate(360deg);
  }
`;

const VideoListBlock = styled.div`
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 10px;

  .video {
    display: flex;
    border-radius: 15px;
    background: #fff;
    z-index: 9999999;
    margin: 30px 0;
    cursor: pointer;
    padding: 10px;
    &:hover {
      .video_left {
        .play {
          .button {
            opacity: 1;
          }
        }
      }
    }

    .video_left {
      position: relative;
      flex: 1;

      .thumbnail {
        width: 100%;
        border-radius: 5px;
      }

      .play {
        color: #fff;
        width: 100%;
        .button {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.5);
          width: 30%;
          height: 40%;
          padding: 5% 10%;
          border-radius: 10%;
          opacity: 0;
          &:hover {
            background: red;
            transition: background 0.5s;
          }
        }
      }
      .played {
        position: absolute;
        top: 3%;
        right: 3%;
        color: #fff;
        background: #051c2d;
        width: 10%;
        height: 18%;
        padding: 1%;
        border-radius: 10%;
        display: none;
      }
    }

    .video_right {
      padding: 2px 10px;
      margin-left: 10px;
      position: relative;
      flex: 3;
      .title {
        font-size: 30px;
        font-weight: bold;
        display: block;
        cursor: pointer;
        letter-spacing: 0.5px;
        &:hover {
          text-decoration: underline;
        }
      }
      .published {
        font-size: 14px;
        margin: 5px 0 30px 0px;
        font-family: "Roboto", sans-serif;
        font-weight: bold;
      }
      .description {
        font-family: "Roboto", sans-serif;
        font-weight: bold;
        font-size: 1em;
      }
    }

    &.watched {
      .video_left {
        .thumbnail {
          opacity: 0.8;
        }
        .played {
          display: block;
        }
      }
      .video_right {
        opacity: 0.5;
      }
    }
  }
  .video_pannel {
    padding: 7px 30px 7px 30px;
    background: #fff;
    color: #051c2d;
    border-radius: 10px;
    font-size: 40px;
    text-align: center;
    margin: 0 auto;
  }

  .video_loading {
    position: relative;
    display: block;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    .icons {
      font-size: 50px;
      display: none;

      &.load {
        animation: 1s ${screw} infinite, 0.5s ${grow} 1;
        color: #051c2d;
        display: inline-block;
      }
      &.error {
        color: red;
        animation: 0.5s ${grow} 1;
        display: inline-block;
      }
    }
  }

  &.on {
    width: 400px;
    min-height: calc(100vh - 70px);
    background: #051c2d;
    padding: 25px 25px 25px 12.5px;
    .video_pannel {
      font-size: 25px;
    }
    .video {
      padding: 8px;
      .video_left {
        flex: 1;
      }
      .video_right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0;
        padding-right: 0;
        .title {
          font-size: 18px;
        }
        .published {
          font-size: 12px;
          margin: 0;
        }
        .description {
          display: none;
        }
      }
    }
    .video_loading {
      .icons {
        font-size: 40px;
        &.load {
          color: #fff;
        }
        &.error {
        }
      }
    }
  }
`;

const VideoList = (props) => {
  const [Videos, setVideos] = useState([]);
  const [PageTok, setPageTok] = useState([]);
  const [Message, setMessage] = useState("Newest NBA Video");

  const PrevParams = useRef(null);

  // for scroll to call next video
  const [ReLoad, setReLoad] = useState(true);

  // watched video style
  const [Watched, setWatched] = useState({});

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const teamParams = searchParams.get("team");

  const mounted = useRef(null);
  const apiLoading = useRef(null);

  // youtube api basic params
  const params = useRef({
    key: "MY KEY",
    channelId: "UCWJ2lWNubArHWmf3FIHbfcQ",
    part: "snippet",
    maxResults: 10,
    type: "video",
    pageToken: PageTok,
  });

  const getVideo = useCallback(async () => {
    props.setLoading(true);
    try {
      const videos = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        { params: params.current }
      );

      // set videos
      setVideos(videos.data.items);

      // set page token for next video list
      setPageTok(videos.data.nextPageToken);

      // permission to moreVideo
      setReLoad(true);

      props.setLoading(false);
    } catch (error) {
      props.setLoading(false);
    }
  }, [props]);

  // first call api with mount this component
  useEffect(() => {
    params.current = {
      ...params.current,
      order: "date",
    };

    if (!mounted.current) {
      mounted.current = true;
      getVideo();
      setMessage("Newest NBA Video");
    }
  }, [getVideo]);

  useEffect(() => {
    // new params with clicked teamParams
    params.current = {
      ...params.current,
      q: jsonList.TeamList.find((obj) => obj.Key === teamParams)?.Name,
      order: "relevance",
    };

    if (teamParams !== null && PrevParams.current !== teamParams) {
      getVideo();
      // Stored for comparison with previous parameters
      PrevParams.current = teamParams;
      // set message on top of list
      const thisTeam = jsonList.TeamList.find(
        (item) => item.Abbreviation === teamParams
      )?.Name;
      setMessage(thisTeam + " Famous Video");
    }
  }, [getVideo, teamParams]);

  // next more video
  const moreVideo = async () => {
    props.setLoading(true);

    apiLoading.current = true;
    try {
      const videos = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        { params: params.current }
      );

      // new state with origin list
      setVideos([...Videos, ...videos.data.items]);

      // new token for next call
      setPageTok(videos.data.nextPageToken);

      props.setLoading(false);
      apiLoading.current = false;
    } catch (error) {
      props.setLoading(false);
      apiLoading.current = false;
    }
  };

  // infinite scroll to call next video
  useEffect(() => {
    // new params with clicked teamParams
    params.current = {
      ...params.current,
      q: jsonList.TeamList.find((obj) => obj.Key === teamParams)?.Name,
      order: "relevance",
    };

    const scrollMore = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (
        scrollTop + clientHeight >= scrollHeight &&
        ReLoad === true &&
        apiLoading.current !== true
      ) {
        moreVideo();
      }
    };
    window.addEventListener("scroll", scrollMore);
    return () => {
      window.removeEventListener("scroll", scrollMore);
    };
  });

  // change published date format
  const timeAgo = (obj) => {
    const objDate = new Date(obj);
    const nowDate = new Date();

    // now date
    const nowYear = nowDate.getUTCFullYear();
    const nowMonth = nowDate.getUTCMonth() + 1;
    const nowDay = nowDate.getUTCDate();
    const nowHours = nowDate.getUTCHours();
    const nowMinutes = nowDate.getUTCMinutes();

    // video published date
    const objYear = objDate.getUTCFullYear();
    const objMonth = objDate.getUTCMonth() + 1;
    const objDay = objDate.getUTCDate();
    const objHours = objDate.getUTCHours();
    const objMinutes = objDate.getUTCMinutes();

    // first compare year
    if (nowYear > objYear) {
      const yearGap = nowYear - objYear;
      switch (yearGap) {
        case 1:
          return "a year ago";
        default:
          return yearGap + " years ago";
      }
    } else {
      // second compare month
      if (nowMonth > objMonth) {
        const monthGap = nowMonth - objMonth;
        switch (monthGap) {
          case 1:
            return "a month ago";
          default:
            return monthGap + " months ago";
        }
      } else {
        if (nowDay > objDay) {
          // third compare day
          const dayGap = nowDay - objDay;
          if (dayGap === 1) {
            return "a day ago";
          } else if (dayGap > 1 && dayGap < 7) {
            return dayGap + " days ago";
          } else if (dayGap >= 7 && dayGap < 14) {
            return "a week ago";
          } else if (dayGap >= 14 && dayGap < 21) {
            return "2 weeks ago";
          } else if (dayGap >= 21 && dayGap < 28) {
            return "3 weeks ago";
          } else if (dayGap >= 28) {
            return "4 weeks ago";
          }
        } else {
          if (nowHours > objHours) {
            // forth compare day
            const hourGap = nowHours - objHours;
            switch (hourGap) {
              case 1:
                return "a hour ago";
              default:
                return hourGap + " hours ago";
            }
          } else {
            if (nowMinutes > objMinutes) {
              // last compare minute
              const minuteGap = nowMinutes - objMinutes;
              switch (minuteGap) {
                case 1:
                  return "a minute ago";
                default:
                  return minuteGap + " minutes ago";
              }
            }
          }
        }
      }
    }
  };

  const clickVideo = (data, e) => {
    // make object
    const object = {};
    object.url = data.id.videoId;
    object.thumbnail = data.snippet.thumbnails.medium.url;
    object.title = data.snippet.title;
    object.published = data.snippet.publishTime;
    object.description = data.snippet.description;

    props.setVideo(object);

    // clicked video on top
    const thisTop = e.currentTarget.getBoundingClientRect().top;
    const absolTop = window.pageYOffset + thisTop - 70; // -70 > because of header
    window.scrollTo({ top: absolTop, left: 0 });

    // set state of watched video
    setWatched(() => ({
      ...Watched,
      [data.id.videoId]: true,
    }));

    navigate(`/video/play/${data.id.videoId}`);
  };

  return (
    <VideoListBlock className={props.PlayerOn ? "on" : ""}>
      <div className="video_pannel">{Message}</div>
      <div className={props.PlayerOn ? "" : "row"}>
        {Videos.map((data, index) => (
          <div
            className={
              Watched[`${data.id.videoId}`] ? "video watched" : "video"
            }
            onClick={(e) => clickVideo(data, e)}
            id={data.id.videoId}
            key={index}
          >
            <div className="video_left">
              <img
                className="thumbnail"
                src={data.snippet.thumbnails.medium.url}
                alt=""
              />
              <div className="play">
                <FaPlay className="button" />
              </div>
              <BsEye className="played" />
            </div>

            <div className="video_right">
              <div className="title">{data.snippet.title}</div>
              <div className="published">
                {timeAgo(data.snippet.publishTime)}
              </div>
              <div className="description">{data.snippet.description}</div>
            </div>
          </div>
        ))}
      </div>
    </VideoListBlock>
  );
};

export default VideoList;
