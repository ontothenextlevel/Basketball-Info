import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import NewsList from "./NewsList";
import NewsArticle from "./NewsArticle";
import NewsControl from "./NewsControl";

const NewsSectionBlock = styled.div`
  min-height: calc(100vh - 220px);
  background: #051c2d;
  position: relative;
`;

const NewsSection = () => {
  const [Articles, setArticles] = useState([]);

  const [CurrentIndex, setCurrentIndex] = useState(0);

  const mounted = useRef(false);

  const [ApiLoading, setApiLoading] = useState(false);

  // call news api in here to convey to child component
  const getNews = async () => {
    const response = await axios.get(
      "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news"
    );
    setApiLoading(true);
    setArticles(response.data.articles);
  };

  useEffect(() => {
    mounted.current = true;
    getNews();
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <NewsSectionBlock>
      <NewsControl
        Articles={Articles}
        CurrentIndex={CurrentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <NewsList
        Articles={Articles}
        setCurrentIndex={setCurrentIndex}
        CurrentIndex={CurrentIndex}
        ApiLoading={ApiLoading}
      />

      {Articles.map((article, index) => (
        <NewsArticle
          key={index}
          article={article}
          left={`${(index + 1 - CurrentIndex) * 100}vw`}
        />
      ))}
    </NewsSectionBlock>
  );
};

export default NewsSection;
