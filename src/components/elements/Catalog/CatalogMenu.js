import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";
import { withRouter } from "react-router-dom";
import { routePaths } from "../../../routePaths";

import Catalog from "./Catalog";

const CatalogMenu = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [choosenId, setChoosenId] = useState(0);

  const [items, setItems] = useState([]);

  const [searchQuery, setSearchQuery] = useState(false); //запускать ли поиск
  const [inputValue, setInputValue] = useState(""); //текст в поисковой строке

  // если есть в url поисковый запрос - отображать его в поиске каталога
  useEffect(() => {
    if (props.page === "catalog" && props.location.search !== "") {
      setInputValue(props.location.search.substr(1));
      setSearchQuery(true);
    }
  }, [props.location.search, props.page]);

  // загрузка списка категорий
  useEffect(() => {
    setIsLoading(true);
    api.getCatalogCategories(setCategories, setIsLoading);
  }, []);

  // загрузка по поисковой строке
  useEffect(() => {
    if (searchQuery) {
      api.getSearchResult(choosenId, inputValue, setItems);
    }
  }, [searchQuery, choosenId, inputValue]);

  // изменение категории
  const clickHandler = (event) => {
    event.preventDefault();
    const container = document.getElementById("container");
    const links = container.getElementsByClassName("nav-link");
    for (let i = 0; i < links.length; i++) {
      links[i].id === event.target.id
        ? links[i].classList.add("active")
        : links[i].classList.remove("active");
    }
    setChoosenId(event.target.id);
  };

  // при изменении строки поиска
  const changeHandler = (event) => {
    setInputValue(event.target.value);
  };

  // отправка поискового запроса
  const submitHandler = (event) => {
    event.preventDefault();
    if (inputValue !== "") {
      props.history.push({
        pathname: routePaths.CatalogPage,
        search: inputValue,
      });
      setSearchQuery(true);
    }
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {props.page === "catalog" && (
        <form
          className="catalog-search-form form-inline"
          onSubmit={submitHandler}
        >
          <input
            className="form-control"
            placeholder="Поиск"
            value={inputValue}
            onChange={changeHandler}
          />
        </form>
      )}
      <ul
        className="catalog-categories nav justify-content-center"
        id="container"
      >
        {!isLoading && (
          <>
            <li className="nav-item">
              <Link
                to="#"
                className="nav-link active"
                id="0"
                onClick={clickHandler}
              >
                Все
              </Link>
            </li>
            {categories.map((item) => (
              <li className="nav-item" key={item.id}>
                <Link
                  to="#"
                  className="nav-link"
                  id={item.id}
                  onClick={clickHandler}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </>
        )}
      </ul>

      <Catalog id={choosenId} data={items} searchText={inputValue} />
    </section>
  );
};

export default withRouter(CatalogMenu);
