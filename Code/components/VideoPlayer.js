import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

const VideoPlayerBlock = styled.div`
  float: left;
  z-index: 9999;
  position: sticky;
  top: 70px;
  width: calc(100vw - 400px);
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  transition: width 0.5s;
  padding: 25px 12.5px 25px 25px;

  .player {
    position: relative;
    width: 100;
    padding-bottom: 56.25%;
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .explain {
    .title {
      font-size: 40px;
      color: #fff;
      margin: 15px 0px;
    }
    .additional {
      background: #fff;
      border-radius: 15px;
      padding: 5px 10px 5px 10px;
      .description {
        font-size: 1em;
        color: #000;
        font-family: "Roboto", sans-serif;
        font-weight: bold;
        margin: 10px 0 0 0;
      }
      .date {
        font-size: 1em;
      }
    }
  }

  .back {
    position: absolute;
    top: -69.5px;
    left: 10px;
    z-index: 99999;
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

const VideoPlayer = (props) => {
  const [Video, setVideo] = useState([]);

  const { videoid } = useParams();

  const { setPlayerOn, setCateOn } = props;
  //interaction with other component
  useEffect(() => {
    setPlayerOn(true);
    setCateOn(false);

    return () => {
      setPlayerOn(false);
      setCateOn(true);
    };
  }, [setPlayerOn, setCateOn]);

  // youtube api params
  const params = {
    key: "MY KEY",
    fields: "items(snippet(title,description,thumbnails,publishedAt))",
    part: "snippet",
    type: "video",
    id: `${videoid}`,
  };

  useEffect(() => {
    const getVideo = async () => {
      const video = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        { params: params }
      );
      setVideo(video.data.items[0].snippet);
    };

    if (!props.Video || props.Video.length === 0) {
      getVideo();
    }
  });

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

  return (
    <VideoPlayerBlock>
      <div className="player">
        <iframe
          src={`https://www.youtube.com/embed/${videoid}?autoplay=1`}
          width="560"
          height="315"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="explain">
        <div className="title">
          {props.Video.title ? props.Video.title : Video.title}
        </div>
        <div className="additional">
          <div className="date">
            {props.Video.published
              ? props.Video.published
              : timeAgo(Video.publishedAt)}
          </div>
          <div className="description">
            {props.Video.description
              ? props.Video.description
              : Video.description}
          </div>
        </div>
      </div>
    </VideoPlayerBlock>
  );
};

export default VideoPlayer;
