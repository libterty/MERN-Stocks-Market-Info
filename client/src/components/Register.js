import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import history from '../history';

function Register() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = () => {
    fetch(`${document.location.origin}/api/v1/users/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, confirmPassword })
    })
      .then(res => res.headers.get('x-access-token'))
      .then(data => {
        localStorage.setItem('data', JSON.stringify(data));
        setIsRegister(true);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (isRegister) {
      history.push('/');
    }
  }, [isRegister]);

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
                />
              </FormGroup>
              <Button color="success" size="lg" onClick={registerUser}>
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
