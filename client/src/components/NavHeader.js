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
import history from 'history';
import Headline from './Headline';

function NavHeader() {
  const inputRef = useRef();
  const [stocks, setStocks] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [name, setName] = useState('');
  const [update, setUpdate] = useState({});
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    console.log('check get req');
    fetch(`${document.location.origin}/api/v1/stocks`, {
      headers: {
        'x-access-token': JSON.parse(localStorage.getItem('data'))
      }
    })
      .then(res => res.json())
      .then(json => setStocks(json));
  }, [update]);

  const createStock = () => {
    fetch(`${document.location.origin}/api/v1/stocks/newStock`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(json => {
        setUpdate(json);
        setIsShow(true);
        setName('');
      });
  };

  const deleteStock = () => {
    fetch(`${document.location.origin}/api/v1/stocks/:id/delete`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
  };

  const toggleNavbar = () => setCollapsed(!collapsed);

  console.log('check global');

  if (isShow) {
    alert(update.message);
    setIsShow(false);
  }

  return (
    <Navbar color="faded" light>
      <NavbarBrand href="/" className="mr-auto">
        <i className="fas fa-chart-line">Stock Markets</i>
      </NavbarBrand>
      <Headline />
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
            onClick={createStock}
          >
            Submit
          </Button>
        </Form>
        <Nav navbar className="sideNav-content">
          <h6>Your stock lists</h6>
          {stocks.map(stock => {
            return (
              <NavItem className="main" key={stock._id}>
                <NavLink href={`/stocks/${stock.name}`} className="create-item">
                  <Form
                    action={`api/v1/stocks/${stock._id}/delete/?_method=DELETE`}
                    method="POST"
                  >
                    <Button
                      className="fas fa-minus-circle"
                      color="danger"
                      id={stock._id}
                      type="submit"
                      onClick={deleteStock}
                    />
                  </Form>
                  <div className="stock-item">
                    <span>{stock.name}</span>
                  </div>
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default NavHeader;
