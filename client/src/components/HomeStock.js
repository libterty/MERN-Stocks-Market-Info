import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import HomeHistory from './HomeHistory';
import HomeNews from './HomeNews';

function HomeStock() {
  const [item, setItem] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.worldtradingdata.com/api/v1/stock?symbol=NDAQ&api_token=${process.env.worldtrade_key}`
    )
      .then(res => res.json())
      .then(json => setItem(json.data));
  }, []);

  return (
    <div className="HomeStock row">
      <div className="col-md-4">
        <h2>Real Time Quote</h2>
        {item.map(t => {
          return (
            <Table key={t.symbol}>
              <tbody>
                <tr>
                  <th>Price</th>
                  <td>{t.price}</td>
                </tr>
                <tr>
                  <th>Currency</th>
                  <td>{t.currency}</td>
                </tr>
                <tr>
                  <th>Open</th>
                  <td>{t.price_open}</td>
                </tr>
                <tr>
                  <th>High</th>
                  <td>{t.day_high}</td>
                </tr>
                <tr>
                  <th>Low</th>
                  <td>{t.day_low}</td>
                </tr>
                <tr>
                  <th>Year High</th>
                  <td>{t['52_week_high']}</td>
                </tr>
                <tr>
                  <th>Year Low</th>
                  <td>{t['52_week_high']}</td>
                </tr>
                <tr>
                  <th>Day Change</th>
                  <td>{t.day_change}</td>
                </tr>
                <tr>
                  <th>Change PCT</th>
                  <td>{t.change_pct}</td>
                </tr>
                <tr>
                  <th>Close Yesterday</th>
                  <td>{t.close_yesterday}</td>
                </tr>
                <tr>
                  <th>Market Cap</th>
                  <td>{t.market_cap}</td>
                </tr>
                <tr>
                  <th>Volume</th>
                  <td>{t.volume}</td>
                </tr>
                <tr>
                  <th>Shares</th>
                  <td>{t.shares}</td>
                </tr>
              </tbody>
            </Table>
          );
        })}
      </div>
      <HomeHistory />
      <hr className="col-md-12" />
      <HomeNews />
    </div>
  );
}

export default HomeStock;
