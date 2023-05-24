import React from "react";
import styled from "styled-components";

const NewsArticleBlock = styled.div`
  min-height: calc(100vh - 220px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: ${({ left }) => left};
  width: 100vw;
  transition: left 1s;

  .title {
    display: inline-block;
    color: #fff;
    font-size: 30px;
    padding: 10px 20px 10px 20px;
    border: 3px solid #fff;
    border-bottom: none;
    border-radius: 40px 5px 0 0;
    width: 600px;
  }
  .image {
    width: 600px;
    border: 3px solid #fff;
  }
  .contents {
    width: 600px;
    background: white;
    border-radius: 0 0 5px 5px;
    padding: 10px;
    .description {
      color: black;
      font-size: 1em;
      font-family: "Roboto", sans-serif;
    }

    .hashtag {
      margin: 10px 0 0 0;
      span {
        display: inline-block;
        color: #fff;
        padding: 5px;
        background: #07263d;
        margin: 5px;
        border-radius: 7px;
      }
      span:first-child {
        margin-left: 0;
      }
    }
  }
`;

const NewsArticle = (props) => {
  const forNbaTime = (time) => {
    const utcDate = new Date(time);
    const offset = -4;
    const easternDate = new Date(utcDate.getTime() + offset * 60 * 60 * 1000);
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = easternDate.toLocaleString("en-US", options);
    return formattedDate + " EST";
  };

  return (
    <NewsArticleBlock left={props.left}>
      <div className="title">{props.article?.headline}</div>
      <img className="image" src={props.article?.images[0]?.url} alt="" />
      <div className="contents">
        <div className="description">{props.article?.description}</div>
        <div className="hashtag">
          {props.article?.categories
            .filter((category) => category.description)
            .map((category) => (
              <span key={category.description}>
                {"#" + category.description}
              </span>
            ))}
        </div>
        <div style={{ float: "right" }}>
          {forNbaTime(props.article?.published)}
        </div>
      </div>
    </NewsArticleBlock>
  );
};

export default NewsArticle;
