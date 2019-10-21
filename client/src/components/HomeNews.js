import React, { useState, useEffect } from 'react';

function HomeNews() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${process.env.news_key}`
    )
      .then(res => res.json())
      .then(json => console.log(json));
  }, []);

  return (
    <div className="HomeNews">
      <div>News</div>
    </div>
  );
}

export default HomeNews;
