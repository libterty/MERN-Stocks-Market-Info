import React from 'react';
import NavHeader from './NavHeader';
import StockItemHistory from './StockItemHistory';

function StockItem() {
  return (
    <div className="StockItem">
      <NavHeader />
      <StockItemHistory />
    </div>
  );
}

export default StockItem;
