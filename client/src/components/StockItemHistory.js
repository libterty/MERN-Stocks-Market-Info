import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';

function StockItemHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const indexSymbol = document.location.pathname.replace(/\/stocks\//, '');
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${indexSymbol}&apikey=${process.env.aplha_ventage}&datatype=json`
    )
      .then(res => res.json())
      .then(json => setHistory(json['Weekly Adjusted Time Series']));
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('historyChart').getContext('2d');
    const Keys = Object.keys(history);
    const Vals = Object.values(history);
    const historyChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Keys.map(key => {
          return key;
        }).reverse(),
        datasets: [
          {
            label: 'History Index Table',
            data: Vals.map(val => {
              return val['4. close'];
            }).reverse(),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  });

  return (
    <div className="StockItemHistory">
      <div>{document.location.pathname.replace(/\/stocks\//, '')} HISTORY</div>
      <canvas id="historyChart" width="1600" height="800" />
    </div>
  );
}

export default StockItemHistory;
