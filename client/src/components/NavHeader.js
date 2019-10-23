import React, { useState, useEffect } from 'react';
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
import Headline from './Headline';

function NavHeader() {
  const [stocks, setStocks] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch(`${document.location.origin}/api/v1/stocks`)
      .then(res => res.json())
      .then(json => setStocks(json));
  }, [createStock]);

  const toggleNavbar = () => setCollapsed(!collapsed);

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
      .then(json => console.log(json));
  };

  console.log('stocks should rerender', stocks)

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
                  <i className="fas fa-minus-circle" id={stock._id} />
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
