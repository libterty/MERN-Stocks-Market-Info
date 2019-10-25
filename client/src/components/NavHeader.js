import React, { useState, useEffect, useRef } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
// import history from 'history';
// import Headline from './Headline';
import Logout from './Logout';

function NavHeader() {
  const inputRef = useRef();
  const [stocks, setStocks] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [name, setName] = useState('');
  const [update, setUpdate] = useState({});
  const [isShow, setIsShow] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    fetch(`${document.location.origin}/api/v1/stocks`, {
      headers: {
        'x-access-token': JSON.parse(localStorage.getItem('data'))
      }
    })
      .then(res => res.json())
      .then(json => setStocks(json));
  }, [update]);

  useEffect(() => {
    if (isCreate) {
      fetch(`${document.location.origin}/api/v1/stocks/newStock`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          'x-access-token': JSON.parse(localStorage.getItem('data'))
        },
        body: JSON.stringify({ name })
      })
        .then(res => res.json())
        .then(json => {
          setUpdate(json);
          setIsShow(true);
          setName('');
        });
    }
  }, [isCreate]);

  useEffect(() => {
    if (isDelete) {
      fetch(`http://localhost:3002/api/v1/stocks/:id/`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': JSON.parse(localStorage.getItem('data'))
        }
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }, [isDelete]);

  const toggleNavbar = () => setCollapsed(!collapsed);

  useEffect(() => {
    if (isShow) {
      alert(update.message);
      setIsShow(false);
    }
  }, [isShow]);

  return (
    <Navbar color="faded" light>
      <NavbarBrand href="/" className="mr-auto">
        <i className="fas fa-chart-line">Stock Markets</i>
      </NavbarBrand>
      {/* <Headline /> */}
      <NavbarToggler onClick={toggleNavbar} className="mr-2" />
      <Collapse isOpen={!collapsed} navbar>
        <Form action="/api/v1/stocks/newStock" method="POST">
          <FormGroup>
            <Label for="stock">
              <i className="far fa-paper-plane">&nbsp;Stock Code</i>
            </Label>
            <Input
              ref={inputRef}
              type="text"
              name="stock"
              id="stock"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Place ur stock code"
            />
          </FormGroup>
          <Button
            type="button"
            size="sm"
            color="danger"
            className="stock-submit"
            onClick={() => setIsCreate(true)}
          >
            Submit
          </Button>
        </Form>
        <Nav navbar className="sideNav-content">
          <h6>Your stock lists</h6>
          {stocks.map(stock => {
            return (
              <div className="main" key={stock._id}>
                <Form
                  method="POST"
                  action={`api/v1/stocks/${stock._id}/?_method=DELETE`}
                >
                  <Input type="hidden" name="_method" value="DELETE" />
                  <Button
                    className="fas fa-minus-circle"
                    color="danger"
                    type="submit"
                    onClick={() => setIsDelete(true)}
                  />
                </Form>
                <NavItem className="main">
                  <NavLink
                    href={`/stocks/${stock.name}`}
                    className="create-item"
                  >
                    <div
                      className="stock-item"
                      style={{ paddingLeft: '0.5rem;' }}
                    >
                      <span>{stock.name}</span>
                    </div>
                  </NavLink>
                </NavItem>
              </div>
            );
          })}
          <Logout />
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default NavHeader;
