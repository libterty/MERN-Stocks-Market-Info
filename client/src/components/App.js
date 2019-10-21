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
import HomeStock from './HomeStock';

function App() {
  const [stocks, setStocks] = useState([]);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    fetch(`${document.location.origin}/api/v1/stocks`)
      .then(res => res.json())
      .then(json => setStocks(json));
  }, []);

  // https://www.quandl.com/api/v3/datasets/EOD/AAPL.json?api_key=Sw-yxtckexajTsMazTE3

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div className="App">
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto" />
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Form>
            <FormGroup>
              <Label for="stock">
                <i className="far fa-paper-plane">Stock Code</i>
              </Label>
              <Input
                type="text"
                name="stock"
                id="stock"
                placeholder="Place ur stock code"
              />
            </FormGroup>
            <Button
              type="button"
              size="sm"
              color="danger"
              className="stock-submit"
            >
              Submit
            </Button>
          </Form>
          <Nav navbar className="sideNav-content">
            <h6>Your stock lists</h6>
            {stocks.map(stock => {
              return (
                <NavItem className="main" key={stock._id}>
                  <i className="fas fa-minus-circle" id={stock._id} />
                  <NavLink href="#!" className="stock-item">
                    {stock.name}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
        </Collapse>
      </Navbar>
      <HomeStock />
    </div>
  );
}

export default App;
