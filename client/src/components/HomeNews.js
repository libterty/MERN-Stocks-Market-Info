import React, { useState, useEffect } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle
} from 'reactstrap';

function HomeNews() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const q = `${new Date().getFullYear()}-${new Date().getMonth() +
      1}-${new Date().getDate()}`;
    fetch(
      `https://newsapi.org/v2/everything?domains=wsj.com&from=${q}&to=${q}&sortBy=popularity&apiKey=${process.env.news_key}`
    )
      .then(res => res.json())
      .then(json => setArticles(json.articles));
  }, []);

  return (
    <div className="HomeNews col-md-12 col-sm-12">
      <h2>Daily Finance News</h2>
      {articles.splice(0, 4).map(article => {
        return (
          <Card
            key={article.url}
            className="col-md-3 col-sm-2 mb-2 HomeNews-item"
          >
            <a href={article.url}>
              <CardImg
                top
                width="25%"
                src={article.urlToImage}
                alt={article.source.name}
              />
              <CardBody>
                <CardTitle>Title: {article.title}</CardTitle>
                <CardSubtitle>
                  Author:
                  {article.author !== null ? article.author : 'No Author'}
                </CardSubtitle>
              </CardBody>
            </a>
          </Card>
        );
      })}
    </div>
  );
}

export default HomeNews;
