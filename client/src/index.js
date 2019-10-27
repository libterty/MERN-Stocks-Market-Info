import 'babel-core/register';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import App from './components/App';
import StockItem from './components/StockItem';
import Login from './components/Login';
import Register from './components/Register';
import history from './history';
import './assets/main.css';

const jwt = JSON.parse(localStorage.getItem('data'));

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path="/">
        {/* {jwt === null ? <Redirect to="/users/login" /> : <App />} */}
        <App />
      </Route>
      <Route exact path="/stocks/:symbol">
        {jwt === null ? <Redirect to="/users/login" /> : <StockItem />}
      </Route>
      <Route exact path="/users/login">
        {jwt !== null ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route exact path="/users/register">
        {jwt !== null ? <Redirect to="/" /> : <Register />}
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
