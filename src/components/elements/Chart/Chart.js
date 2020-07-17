/*eslint-disable array-callback-return*/

import React, { useEffect, useState } from "react";
import { getItemsArray, deleteItem, findKeyById } from "./localStorage";
import { Link } from "react-router-dom";
import { routePaths } from "../../../routePaths";

const Chart = () => {
  const [items, setItems] = useState(getItemsArray());
  const [totalPrice, setTotalPrice] = useState(0);

  const getTotalPrice = () => {
    setTotalPrice(0);
    items.map((item) => {
      setTotalPrice((p) => p + item[3] * item[4]);
    });
  };

  useEffect(() => {
    getTotalPrice();
  });

  const handleDelete = (event) => {
    const id = findKeyById(event.target.id);
    deleteItem(id);
    setItems(getItemsArray());
  };

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                <Link
                  to={{
                    pathname: routePaths.ItemPage.replace(
                      ":id",
                      item[0].toString()
                    ),
                    state: {
                      id: item[0],
                    },
                  }}
                >
                  {item[1]}
                </Link>
              </td>
              <td>{item[2]}</td>
              <td>{item[4]}</td>
              <td>{item[3]}</td>
              <td>{item[3] * item[4]}</td>
              <td>
                <button
                  id={item[0]}
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleDelete}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}

          <tr>
            <td colSpan="5" className="text-right">
              Общая стоимость
            </td>
            <td>{totalPrice} руб.</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Chart;
