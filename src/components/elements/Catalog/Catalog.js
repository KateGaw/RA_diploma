/*eslint-disable eqeqeq*/
/*eslint-disable array-callback-return*/

import React, { useEffect, useState } from "react";
import api from "../../../utils/api";

import Preloader from "../Preloader";

const Catalog = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [catalog, setCatalog] = useState([]);

  const [buttonClick, setButtonClick] = useState(false);
  const [itemsCounter, setItemsCounter] = useState(6);
  const [newItems, setNewItems] = useState([]);
  const [buttonVisibile, setButtonVisile] = useState(true);

  const [currentCategoryId, setCurrentCategoryId] = useState(props.id);
  if (currentCategoryId !== props.id) {
    setItemsCounter(6);
    setCurrentCategoryId(props.id);
    setButtonVisile(true);
  }

  const add = (newItem) => setCatalog((catalog) => catalog.concat(newItem));

  // DATA LOADER
  useEffect(() => {
    setIsLoading(true);
    if (props.data.length > 0 || props.searchText !== "") {
      if (props.id != 0) {
        setCatalog([]);
        props.data.map((item) => {
          item.category == props.id && add(item);
        });
      } else {
        setCatalog(props.data);
      }
      setIsLoading(false);
    } else {
      api.getCatalogItems(props.id, setCatalog, setIsLoading);
    }
  }, [props]);

  // LOAD DATA WHEN ADD_BUTTON CLICKED
  useEffect(() => {
    if (buttonClick) {
      api.getMoreItems(
        props.id,
        itemsCounter,
        setButtonVisile,
        setButtonClick,
        setNewItems,
        setItemsCounter
      );
    }
  }, [props.id, buttonClick, itemsCounter]);

  // BUTTON VISIBILITY CONDITIONS
  useEffect(() => {
    if (newItems.length > 0) {
      newItems.map((item) => add(item));
      setNewItems([]);
      if (newItems.length < 6) {
        setButtonVisile(false);
      }
    }
    (catalog.length < 6 || catalog.length % 6 !== 0) &&
      catalog.length !== 0 &&
      setButtonVisile(false);
  }, [catalog, newItems, itemsCounter]);

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <div className="row">
        {catalog.map((item) => (
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
      <div className="text-center">
        {buttonClick && <Preloader />}
        {catalog.length > 0 ? (
          <button
            id="moreButton"
            className={
              buttonVisibile
                ? "btn btn-outline-primary"
                : "btn btn-outline-primary hidden"
            }
            onClick={() => setButtonClick(true)}
            disabled={buttonClick}
          >
            Загрузить ещё
          </button>
        ) : (
          <div>Записей не найдено</div>
        )}
      </div>
    </>
  );
};

export default Catalog;
