/*eslint-disable array-callback-return*/

import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import Preloader from "../elements/Preloader";
import { routePaths } from '../../routePaths';

const ItemPage = (props) => {
  const itemId = props.location.state.id;
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState([]);
  const [sizeSelected, setSizeSelected] = useState(false); //выбран ли размер
  const [counter, setCounter] = useState(1); // выбранное количество единиц товара
  const [chartButtonDisable, setChartButtonDisable] = useState(true);
  const [availableSizes, setAvailableSizes] = useState(false);

  // DATA LOADER
  useEffect(() => {
    setIsLoading(true);
    api.getItemAllInfo(itemId, setItem, setIsLoading);
  }, [itemId]);

  const handleSizeClick = (event) => {
    const sizes = document.getElementsByClassName("catalog-item-size");
    for (let i = 0; i < sizes.length; i++) {
      sizes[i].classList.remove("selected");
    }
    event.target.classList.add("selected");
    setSizeSelected(true);
  };

  // проверяем есть ли доступные размеры, если нет оставляем триггер на нетображении блока с корзиной
  useEffect(() => {
    if (item.sizes !== undefined) {
      item.sizes.map((item) => {
        item.avalible && setAvailableSizes(true);
      });
    }
  }, [item]);

  // проверяем выбран ли размер для able кнопки в корзину
  useEffect(() => {
    if (sizeSelected) {
      setChartButtonDisable(false);
    }
  }, [sizeSelected]);

  const handleSubstractionClick = () => {
    if (counter > 1) {
      setCounter((c) => c - 1);
    }
  };

  const handleAdditionClick = () => {
    if (counter < 10) {
      setCounter((c) => c + 1);
    }
  };

  const chartClickHandler = () => {
    props.history.push({
      pathname: routePaths.ChartPage,
    });
  }

  return isLoading ? (
    <Preloader />
  ) : (
    <section className="catalog-item">
      <h2 className="text-center">{item.title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={item.images[0]} className="img-fluid" alt="" />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{item.sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{item.manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{item.color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{item.material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{item.season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{item.reason}</td>
              </tr>
            </tbody>
          </table>
          {availableSizes && (
            <>
              <div className="text-center">
                <p>
                  Размеры в наличии:
                  {item.sizes.map(
                    (i, index) =>
                      i.avalible && (
                        <span
                          key={index}
                          className="catalog-item-size"
                          onClick={handleSizeClick}
                        >
                          {i.size}
                        </span>
                      )
                  )}
                </p>

                <p>
                  Количество:
                  <span className="btn-group btn-group-sm pl-2">
                    <button
                      className="btn btn-secondary"
                      onClick={handleSubstractionClick}
                    >
                      -
                    </button>
                    <span className="btn btn-outline-primary">{counter}</span>
                    <button
                      className="btn btn-secondary"
                      onClick={handleAdditionClick}
                    >
                      +
                    </button>
                  </span>
                </p>
              </div>
              <button
                className="btn btn-danger btn-block btn-lg"
                disabled={chartButtonDisable}
                onClick={chartClickHandler}
              >
                В корзину
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemPage;
