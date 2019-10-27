import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import history from '../history';

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(false);

  useEffect(() => {
    if (isLogin) {
      fetch(`${document.location.origin}/api/v1/users/signin`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
        .then(res =>
          res.status === 200
            ? localStorage.setItem(
                'data',
                JSON.stringify(res.headers.get('x-access-token'))
              )
            : res.json()
        )
        .then(json =>
          typeof json === 'undefined' ? setData(true) : alert(json.message)
        );
      // .then(res => res.headers.get('x-access-token'))
      // .then(data => {
      //   localStorage.setItem('data', JSON.stringify(data));
      //   // setIsLogin(true);
      //   history.push('/');
      // })
      // .catch(err => console.log(err));
    }
  }, [isLogin]);

  useEffect(() => {
    if (data) {
      history.push('/');
      setIsLogin(false);
    }
  }, [data]);

  return (
    <div className="container mb-3 Login">
      <div className="row mt-t">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3"> Log In </h1>
            <Form action="/api/v1/users/signin" method="POST">
              <FormGroup>
                <Label htmlFor="email"> Email </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password"> Password </Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </FormGroup>
              <Button
                color="success"
                size="lg"
                onClick={e => {
                  e.preventDefault();
                  if (!e.target.checkValidity()) {
                    e.stopPropagation();
                  } else {
                    setIsLogin(true);
                  }
                }}
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
