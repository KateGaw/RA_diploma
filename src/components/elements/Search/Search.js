import React, { useEffect, useState } from "react";
import api from '../../../utils/api';

const Search = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [findItems, setFindItems] = useState([]);

  useEffect(() => {
    api.getSearchResult(props.id, inputValue, setFindItems);
  }, [props.id, inputValue]);

  const changeHandler = (event) => {
    setInputValue(event.target.value);
    props.setText(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(findItems);
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={submitHandler}>
      <input
        className="form-control"
        placeholder="Поиск"
        value={inputValue}
        onChange={changeHandler}
      />
    </form>
  );
};

export default Search;
