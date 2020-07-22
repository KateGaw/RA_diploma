import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { routePaths } from "../../../routePaths";

const SearchBar = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [searchVisibility, setSearchVisibility] = useState(false);

  const clickHandler = () => {
    if (!searchVisibility) {
      setSearchVisibility(true);
    } else {
      if (inputValue === "") {
        setSearchVisibility(false);
      } else {
        props.history.push({
          pathname: routePaths.CatalogPage,
          search: inputValue,
        });
      }
    }
  };

  return (
    <>
      <div
        id="search_button"
        data-id="search-expander"
        className="header-controls-pic header-controls-search"
        onClick={clickHandler}
      />

      <form
        id="search_field"
        data-id="search-form"
        className={
          searchVisibility
            ? "header-controls-search-form form-inline"
            : "header-controls-search-form form-inline invisible"
        }
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
