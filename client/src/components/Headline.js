import React, { useState, useEffect } from 'react';

function Headline() {
  const [spy, setSpy] = useState({});
  const [dia, setDia] = useState({});
  const [fbt, setFbt] = useState({});

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=${process.env.aplha_ventage}`
    )
      .then(res => res.json())
      .then(json => setSpy(json['Global Quote']));
  }, []);

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=DIA&apikey=${process.env.aplha_ventage}`
    )
      .then(res => res.json())
      .then(json => setDia(json['Global Quote']));
  }, []);

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=FBT&apikey=${process.env.aplha_ventage}`
    )
      .then(res => res.json())
      .then(json => setFbt(json['Global Quote']));
  }, []);

  console.log('spy', spy['10. change percent']);

  return (
    <div className="inline index-data">
      <ul className="index_data-items">
        <li className="index_data-item">
          <a href="#!" className="index_data-item__link">
            <span className="index_data-item__name">標準普爾500指數</span>
            {parseFloat(spy['10. change percent']) > 0 ? (
              <span className="index-data__item__change index-data__item__change--up">
                {`+${spy['10. change percent']}`}
              </span>
            ) : (
              <span className="index-data__item__change index-data__item__change--down">
                {`-${spy['10. change percent']}`}
              </span>
            )}
          </a>
        </li>
        <li className="index_data-item">
          <a href="#!" className="index_data-item__link">
            <span className="index_data-item__name">道瓊工業平均指數</span>
            {parseFloat(dia['10. change percent']) > 0 ? (
              <span className="index-data__item__change index-data__item__change--up">
                {`+${dia['10. change percent']}`}
              </span>
            ) : (
              <span className="index-data__item__change index-data__item__change--down">
                {`-${dia['10. change percent']}`}
              </span>
            )}
          </a>
        </li>
        <li className="index_data-item">
          <a href="#!" className="index_data-item__link">
            <span className="index_data-item__name">美國NYSE指數</span>
            {parseFloat(fbt['10. change percent']) > 0 ? (
              <span className="index-data__item__change index-data__item__change--up">
                {`+${fbt['10. change percent']}`}
              </span>
            ) : (
              <span className="index-data__item__change index-data__item__change--down">
                {`-${fbt['10. change percent']}`}
              </span>
            )}
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Headline;
