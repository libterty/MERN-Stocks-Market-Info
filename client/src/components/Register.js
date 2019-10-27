import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import history from '../history';

function Register() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [data, setData] = useState(false);

  useEffect(() => {
    if (isRegister) {
      fetch(`${document.location.origin}/api/v1/users/register`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, confirmPassword })
      })
        .then(res =>
          res.status === 201
            ? localStorage.setItem(
                'data',
                JSON.stringify(res.headers.get('x-access-token'))
              )
            : res.json()
        )
        .then(json =>
          typeof json === 'undefined' ? setData(true) : alert(json.message)
        );
    }
  }, [isRegister]);

  useEffect(() => {
    if (data) {
      history.push('/');
      setIsRegister(false);
    }
  }, [data]);

  return (
    <div className="container mb-3 Login">
      <div className="row mt-t">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3"> Register </h1>
            <Form action="/api/v1/users/register" method="POST">
              <FormGroup>
                <Label htmlFor="name"> Username </Label>
                <Input
                  type="name"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </FormGroup>
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
              <FormGroup>
                <Label htmlFor="confirmPassword"> confirmPassword </Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Enter your confirmPassword"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
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
                    password !== confirmPassword
                      ? alert('confirm your password')
                      : setIsRegister(true);
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

export default Register;
