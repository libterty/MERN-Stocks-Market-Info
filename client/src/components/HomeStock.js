import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import HomeHistory from './HomeHistory';

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
    </div>
  );
}

// {
//     "symbol": "NDAQ",
//     "name": "Nasdaq, Inc.",
//     "currency": "USD",
//     "price": "98.62",
//     "price_open": "98.38",
//     "day_high": "99.05",
//     "day_low": "98.07",
//     "52_week_high": "105.26",
//     "52_week_low": "75.49",
//     "day_change": "0.29",
//     "change_pct": "0.29",
//     "close_yesterday": "98.33",
//     "market_cap": "16241530880",
//     "volume": "664894",
//     "volume_avg": "703650",
//     "shares": "164688000",
//     "stock_exchange_long": "NASDAQ Stock Exchange",
//     "stock_exchange_short": "NASDAQ",
//     "timezone": "EDT",
//     "timezone_name": "America/New_York",
//     "gmt_offset": "-14400",
//     "last_trade_time": "2019-10-18 16:00:01",
//     "pe": "30.58",
//     "eps": "3.23"
//   }

export default HomeStock;
