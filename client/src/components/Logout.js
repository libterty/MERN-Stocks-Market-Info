import React, { useState, useEffect } from 'react';
import { Form, Button } from 'reactstrap';
import history from '../history';

function Logout() {
  const jwt = JSON.parse(localStorage.getItem('data'));
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    if (!jwt) {
      history.push('/users/login');
    }
  }, [isLogout]);

  const logoutUser = () => {
    fetch(`${document.location.origin}/api/v1/users/logout`, {
      headers: {
        'Content-type': 'application/json',
        'x-access-token': JSON.parse(localStorage.getItem('data'))
      }
    })
      .then(res => {
        res.json();
        localStorage.clear('data');
      })
      .then(json => {
        console.log('logout info', json);
        setIsLogout(true);
      });
  };

  const directToLogin = () => {
    if (isLogout) {
      history.push('/users/login');
    }
  };

  return (
    <div className="Logout">
      {isLogout ? (
        <Form className="login-user-btn">
          <Button
            size="sm"
            type="button"
            color="success"
            onClick={directToLogin}
          >
            Login
          </Button>
        </Form>
      ) : (
        <Form className="logout-user-btn">
          <Button size="sm" type="submit" color="danger" onClick={logoutUser}>
            Logout
          </Button>
        </Form>
      )}
    </div>
  );
}

export default Logout;
