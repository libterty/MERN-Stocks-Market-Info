import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    fetch(`${document.location.origin}/api/v1/users/signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.headers.get('x-access-token'))
      .then(data => localStorage.setItem('data', JSON.stringify(data)))
      .catch(err => console.log(err));
  };

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
                <Button color="success" size="lg" onClick={loginUser}>
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
