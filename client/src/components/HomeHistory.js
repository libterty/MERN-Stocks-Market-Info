import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';

function HomeHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.worldtradingdata.com/api/v1/history?symbol=NDAQ&api_token=${process.env.worldtrade_key}`
    )
      .then(res => res.json())
      .then(json => setHistory(json.history));
  }, []);

  //   console.log('history', history)

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
            label: '# of Votes',
            data: Vals.map(val => {
              return val.close;
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
    <div className="HomeHistory">
      <div>NASQ HISTORY</div>
      <canvas id="historyChart" width="1600" height="800" />
    </div>
  );
}

export default HomeHistory;
