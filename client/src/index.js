import 'babel-core/register';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import App from './components/App';
import StockItem from './components/StockItem';
import Login from './components/Login';
import history from './history';
import './assets/main.css';

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route exact path="/stocks/:symbol">
        <StockItem />
      </Route>
      <Route exact path="/users/login">
        <Login />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
