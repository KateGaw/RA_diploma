import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from '../../../utils/api';

import Catalog from "./Catalog";
import Search from "../Search/Search";

const CatalogMenu = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [choosenId, setChoosenId] = useState(0);

  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    setIsLoading(true);
    api.getCatalogCategories(setCategories, setIsLoading);
  }, []);

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

  const searchSubmitHandler = (item) => {
    if (item !== []) {
      setItems(item);
    }
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {props.page === "catalog" && (
        <Search
          id={choosenId}
          onSubmit={searchSubmitHandler}
          setText={setText}
        />
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

      <Catalog id={choosenId} data={items} searchText={text} />
    </section>
  );
};

export default CatalogMenu;
