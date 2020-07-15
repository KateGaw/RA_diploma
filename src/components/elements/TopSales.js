import React, { useEffect, useState } from "react";
import Preloader from "./Preloader";
import api from '../../utils/api';

const TopSales = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    api.getTopSales(setSales, setIsLoading);
  }, []);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="row">
          {sales.map((item) => (
            <div className="col-4" key={item.id}>
              <div className="card">
                <img
                  src={item.images[0]}
                  className="card-img-top img-fluid"
                  alt={item.title}
                />
                <div className="card-body">
                  <p className="card-text">{item.title}</p>
                  <p className="card-text">{item.price}</p>
                  <a href="/products/1.html" className="btn btn-outline-primary">
                    Заказать
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TopSales;
