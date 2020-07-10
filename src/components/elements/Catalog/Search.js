import React, { useEffect, useState } from "react";
import axios from "axios";

const Search = (props) => {
  const path = "http://localhost:7070/api/items";
  const [inputValue, setInputValue] = useState("");
  const [findItems, setFindItems] = useState([]);

  useEffect(() => {
    axios
      .get(
        props.id === 0
          ? `${path}?q=${inputValue}`
          : `${path}?categoryId=${props.id}?q=${inputValue}`
      )
      .then((response) => {
        setFindItems(response.data);
      });
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
