import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { countItems } from "./localStorage";

const ChartIcon = (props) => {
  const [chartCounter, setChartCounter] = useState(0);
  useEffect(() => {
    setChartCounter(countItems());
  }, [props.location]);

  return (
    <Link to="/chart">
      <div className="header-controls-pic header-controls-cart">
        {chartCounter > 0 && (
          <div className="header-controls-cart-full">{chartCounter}</div>
        )}
        <div className="header-controls-cart-menu"></div>
      </div>
    </Link>
  );
};

export default withRouter(ChartIcon);
