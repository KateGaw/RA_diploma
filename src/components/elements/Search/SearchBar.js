import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { routePaths } from "../../../routePaths";

const SearchBar = (props) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const searchButton = document.getElementById("search_button");
    const searchField = document.getElementById("search_field");

    searchButton.addEventListener("click", () => {
      if (searchField.classList.contains("invisible")) {
        searchField.classList.remove("invisible");
      } else {
        if (inputValue === "") {
          searchField.classList.add("invisible");
        } else {
          props.history.push({
            pathname: routePaths.CatalogPage,
            search: inputValue,
          });
        }
      }
    });
  }, [inputValue, props.history]);

  return (
    <>
      <div
        id="search_button"
        data-id="search-expander"
        className="header-controls-pic header-controls-search"
      />

      <form
        id="search_field"
        data-id="search-form"
        className="header-controls-search-form form-inline invisible"
      >
        <input
          className="form-control"
          placeholder="Поиск"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      </form>
    </>
  );
};

export default withRouter(SearchBar);
