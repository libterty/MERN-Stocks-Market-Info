import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

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

  console.log('stocks', stocks);

  return (
    <div className="App">
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto" />
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            {stocks.map(stock => {
              return (
                <NavItem className="main" key={stock._id}>
                  <NavLink href="#!">{stock.name}</NavLink>
                </NavItem>
              );
            })}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default App;
