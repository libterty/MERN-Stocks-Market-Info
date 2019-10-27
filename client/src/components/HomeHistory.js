import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';

function HomeHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=NDAQ&apikey=${process.env.aplha_ventage}&datatype=json`
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
            label: 'Nadsaq Index',
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
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100,
                stepSize: 20
              }
            }
          ]
        }
      }
    });
  });

  return (
    <div className="HomeHistory col-md-7">
      <div>NADSQ HISTORY</div>
      <canvas id="historyChart" width="auto" height="auto" />
    </div>
  );
}

export default HomeHistory;
