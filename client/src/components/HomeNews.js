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
    fetch(
      `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${process.env.news_key}`
    )
      .then(res => res.json())
      .then(json => setArticles(json.articles));
  }, []);

  return (
    <div className="HomeNews col-md-10 col-sm-10">
      <h2>Daily Finance News</h2>
      {articles.map(article => {
        return (
          <Card key={article.url} className="col-md-5 col-sm-10 mb-2 HomeNews-item">
            <a href={article.url}>
              <CardImg
                top
                width="25%"
                src={article.urlToImage}
                alt={article.source.name}
              />
              <CardBody>
                <CardTitle>{article.title}</CardTitle>
                <CardSubtitle>
                  {article.author !== null ? article.author : 'No Author'}
                </CardSubtitle>
                <CardText>{article.description}</CardText>
              </CardBody>
            </a>
          </Card>
        );
      })}
    </div>
  );
}

export default HomeNews;
